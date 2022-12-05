import { createSlice } from "@reduxjs/toolkit";

const toolkitSliceTimer = createSlice({
  name: "Timer",
  initialState: {
    dragItem: null,
    doneTasks: 0,
    allPomadorasTimeMinutes: 0,
    allDonePomadors: 0,
    allPomadorasCount: 0,
    initialPomadorTime: 25,
    tasks: [],
  },
  reducers: {
    setDrageItem(state, action) {
      state.dragItem = action.payload.currentTask;
    },

    dropItem(state, action) {
      if (state.dragItem) {
        if (state.dragItem.inputValue) {
          const currentElIndex = state.tasks.findIndex(
            (el) => el.inputValue === action.payload.currentTask.inputValue
          );
          const dragItemIndex = state.tasks.findIndex(
            (el) => el.inputValue === state.dragItem.inputValue
          );
          const isIndexes =
            typeof (currentElIndex && dragItemIndex) !==
            ("null" || "undefined");
          if (!isIndexes) return;
          [state.tasks[currentElIndex], state.tasks[dragItemIndex]] = [
            state.tasks[dragItemIndex],
            state.tasks[currentElIndex],
          ];
          state.dragItem = null;
        }
      }
    },

    decreaseInitialPomadorTime(state) {
      if (state.initialPomadorTime < 2) return;
      state.initialPomadorTime = state.initialPomadorTime - 1;
    },

    increaseInitialPomadorTime(state) {
      state.initialPomadorTime = state.initialPomadorTime + 1;
    },

    setInitialPomadorTime(state, action) {
      state.initialPomadorTime = action.payload.newValue;
    },

    addPomadoro(state, action) {
      action.payload.currentTimeout = 0;
      action.payload.currentPomador = 1;
      action.payload.timeLeftSeconds = state.initialPomadorTime * 60;
      action.payload.taskTimeouts = action.payload.pomadorInitial;
      state.tasks.push(action.payload);

      action.payload.taskNumber =
        state.tasks.findIndex(
          (pomador) => pomador.inputValue === action.payload.inputValue
        ) +
        state.doneTasks +
        1;

      state.allPomadorasTimeMinutes =
        state.allPomadorasCount * state.initialPomadorTime;
    },

    decrement(state, action) {
      state.allPomadorasCount = state.allPomadorasCount - 1;
      if (action.payload) {
        const el = state.tasks.find(
          (pomador) => pomador.inputValue === action.payload.taskName
        );
        el.pomadorInitial = el.pomadorInitial - 1;
        el.taskTimeouts = el.taskTimeouts - 1;
      }
      state.allPomadorasTimeMinutes =
        state.allPomadorasCount * state.initialPomadorTime;
    },

    increment(state, action) {
      state.allPomadorasCount = state.allPomadorasCount + 1;
      if (action.payload) {
        const el = state.tasks.find(
          (pomador) => pomador.inputValue === action.payload.taskName
        );
        el.pomadorInitial = el.pomadorInitial + 1;
        el.taskTimeouts = el.taskTimeouts + 1;
      }
      state.allPomadorasTimeMinutes =
        state.allPomadorasCount * state.initialPomadorTime;
    },

    removePomadoro(state, action) {
      state.tasks = state.tasks.filter(
        (pomador) => pomador.inputValue !== action.payload.taskName
      );
      state.allPomadorasCount = state.tasks.reduce(
        (acc, curr) => acc + curr.pomadorInitial,
        0
      );
      action.payload.taskNumber = state.tasks.forEach((pomador, index) => {
        pomador.taskNumber = index + state.doneTasks + 1;
      });
      state.allPomadorasTimeMinutes =
        state.allPomadorasCount * state.initialPomadorTime;
    },

    editNamePomadoro(state, action) {
      const el = state.tasks.find(
        (pomador) => pomador.inputValue === action.payload.taskName
      );
      el.inputValue = action.payload.editState;
    },

    doneTask(state, action) {
      const el = state.tasks.find(
        (pomador) => pomador.inputValue === action.payload.taskName
      );
      if (el) {
        state.doneTasks = state.doneTasks + 1;
        state.tasks = state.tasks.filter(
          (pomador) => pomador.inputValue !== action.payload.taskName
        );
        state.allPomadorasCount = state.tasks.reduce(
          (acc, curr) => acc + curr.pomadorInitial,
          0
        );
        state.allPomadorasTimeMinutes =
          state.allPomadorasCount * state.initialPomadorTime;
      }
    },

    increaseCurrentPomador(state, action) {
      const el = state.tasks.find(
        (pomador) => pomador.inputValue === action.payload.taskName
      );
      if (el) el.currentPomador = el.currentPomador + 1;
    },

    increaseCurrentTimeout(state, action) {
      const el = state.tasks.find(
        (pomador) => pomador.inputValue === action.payload.taskName
      );
      if (el) el.currentTimeout = el.currentTimeout + 1;
    },

    increaseAllDonePomadors(state) {
      state.allDonePomadors = state.allDonePomadors + 1;
    },

    removeTask(state, action) {
      state.tasks = state.tasks.filter(
        (pomador) => pomador.inputValue !== action.payload.taskName
      );
      state.allPomadorasCount = state.tasks.reduce(
        (acc, curr) => acc + curr.pomadorInitial,
        0
      );
      state.allPomadorasTimeMinutes =
        state.allPomadorasCount * state.initialPomadorTime;
    },

    changeState(state, action) {
      const el = state.tasks.find(
        (pomador) => pomador.inputValue === action.payload.taskName
      );
      if (el) {
        el.counting = action.payload.counting;
        el.initialTouched = action.payload.initialTouched;
        el.timeoutCounting = action.payload.timeoutCounting;
        el.timeoutPause = action.payload.timeoutPause;
        el.pauseCounting = action.payload.pauseCounting;
        el.pauseCount = action.payload.pauseCount;
        el.pauseLeftSeconds = action.payload.pauseLeftSeconds;
        el.timeLeftSeconds = action.payload.timeLeftSeconds;
        el.timeoutLeftSeconds = action.payload.timeoutLeftSeconds;
      }
    },

    addTime(state, action) {
      const el = state.tasks.find(
        (pomador) => pomador.inputValue === action.payload.taskName
      );
      if (el) {
        el.timeLeftSeconds = action.payload.newValueLeft;
        el.timeoutLeftSeconds = action.payload.newValueTimeoutleft;
      }
    },
  },
});

export default toolkitSliceTimer.reducer;
export const {
  increment,
  decrement,
  addPomadoro,
  removePomadoro,
  removeTask,
  editNamePomadoro,
  increaseCurrentPomador,
  increaseCurrentTimeout,
  increaseAllDonePomadors,
  doneTask,
  addTime,
  dropItem,
  setDrageItem,
  changeState,
  setTasks,
  setInitialPomadorTime,
  increaseInitialPomadorTime,
  decreaseInitialPomadorTime,
} = toolkitSliceTimer.actions;
