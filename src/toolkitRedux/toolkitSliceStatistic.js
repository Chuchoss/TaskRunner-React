import { createSlice } from "@reduxjs/toolkit";

const toolkitSliceStatistic = createSlice({
  name: "Statistic",
  initialState: {
    activeDay: {},
    activDayStr: "",
    periods: ["Эта неделя", "Прошедшая неделя", "2 недели назад"],
    days: [
      {
        dayNumber: 1,
        weekDay: "ПН",
        fullNameDay: "Понедельник",
        donePomadors: null,
        pauseTime: null,
        pauseCount: null,
        workTime: null,
        focusPercent: null,
      },
      {
        dayNumber: 2,
        weekDay: "ВТ",
        fullNameDay: "Вторник",
        donePomadors: null,
        pauseTime: null,
        pauseCount: null,
        workTime: null,
        focusPercent: null,
      },
      {
        dayNumber: 3,
        weekDay: "СР",
        fullNameDay: "Среда",
        donePomadors: null,
        pauseTime: null,
        pauseCount: null,
        workTime: null,
        focusPercent: null,
      },
      {
        dayNumber: 4,
        weekDay: "ЧТ",
        fullNameDay: "Четверг",
        donePomadors: null,
        pauseTime: null,
        pauseCount: null,
        workTime: null,
        focusPercent: null,
      },
      {
        dayNumber: 5,
        weekDay: "ПТ",
        fullNameDay: "Пятница",
        donePomadors: null,
        pauseTime: null,
        pauseCount: null,
        workTime: null,
        focusPercent: null,
      },
      {
        dayNumber: 6,
        weekDay: "СБ",
        fullNameDay: "Суббота",
        donePomadors: null,
        pauseTime: null,
        pauseCount: null,
        workTime: null,
        focusPercent: null,
      },
      {
        dayNumber: 0,
        weekDay: "ВС",
        fullNameDay: "Воскресенье",
        donePomadors: null,
        pauseTime: null,
        pauseCount: null,
        workTime: null,
        focusPercent: null,
      },
    ],
    weeks: [
      {
        period: "Эта неделя",
        weekNumber: null,
        days: [],
      },
      {
        period: "Прошедшая неделя",
        weekNumber: null,
        days: [],
      },
      {
        period: "2 недели назад",
        weekNumber: null,
        days: [],
      },
    ],
  },

  reducers: {
    setActiveDay(state, action) {
      const actWeek = state.weeks.find(
        (week) => week.period === state.periods[0]
      );
      state.activDayStr = state.days.find(
        (el) => el.weekDay === action.payload.text
      ).fullNameDay;
      if (actWeek.days.length > 0) {
        state.activeDay = actWeek.days.find(
          (el) => el.weekDay === action.payload.text
        );
      } else {
        state.activeDay = {};
      }
    },
    selectPeriod(state, action) {
      if (state.periods[0] === action.payload.text) return;
      const { periods } = state;
      const indexElement = periods.findIndex(
        (el) => el === action.payload.text
      );
      [periods[0], periods[indexElement]] = [periods[indexElement], periods[0]];
      const newActivWeek = state.weeks.find(
        (week) => week.period === periods[0]
      );
      if (newActivWeek.days.length !== 0) {
        state.activeDay = newActivWeek.days.find(
          (el) => Object.keys(el).length !== 0
        );
      } else {
        state.activeDay = state.days[0];
      }
    },
    checkActualWeek(state, action) {
      const actWeek = state.weeks.find((week) => week.period === "Эта неделя");
      if (!actWeek) return;
      const createdDate = action.payload.pomadorCreatedDate;
      if (
        createdDate.dayNumber !== 0 &&
        actWeek.weekNumber !== createdDate.createdWeek
      ) {
        state.weeks = state.weeks.filter(
          (week) => week.period !== "2 недели назад"
        );
        state.weeks.find((week) => week.period === "Прошедшая неделя").period =
          "2 недели назад";
        actWeek.period = "Прошедшая неделя";
        state.weeks.unshift({
          weekNumber: action.payload.pomadorCreatedDate.createdWeek,
          period: "Эта неделя",
          days: [...state.days],
        });
      }
    },
    increasePauseCount(state, action) {
      if (typeof action.payload.pomadorCreatedDate.createdDay !== "undefined") {
        const actWeek = state.weeks.find(
          (week) => week.period === "Эта неделя"
        );
        actWeek.days.find(
          (el) => el.dayNumber === action.payload.pomadorCreatedDate.createdDay
        ).pauseCount += 1;
      }
    },
    increasePauseTime(state, action) {
      if (typeof action.payload.pomadorCreatedDate.createdDay !== "undefined") {
        const actWeek = state.weeks.find(
          (week) => week.period === "Эта неделя"
        );
        const actDay = actWeek.days.find(
          (el) => el.dayNumber === action.payload.pomadorCreatedDate.createdDay
        );
        actDay.pauseTime += action.payload.pauseLeftSeconds;
      }
    },
    pomadorDoneStatistic(state, action) {
      if (typeof action.payload.pomadorCreatedDate.createdDay !== "undefined") {
        const actWeek = state.weeks.find(
          (week) => week.period === "Эта неделя"
        );
        const actDay = actWeek.days.find(
          (el) => el.dayNumber === action.payload.pomadorCreatedDate.createdDay
        );
        if (actDay) {
          state.activeDay = actDay;
          actDay.donePomadors += 1;
          if (action.payload.timeLeftSeconds) {
            actDay.workTime +=
              action.payload.initialTime - action.payload.timeLeftSeconds;
            actDay.pauseTime += action.payload.pauseLeftSeconds;
            // Если закончили помидор раньше добавляем
          } else {
            actDay.workTime += action.payload.initialTime; //initialTime
          }
          const focus = Math.trunc(
            100 - (actDay.pauseTime / actDay.workTime) * 100
          );
          actDay.focusPercent = focus > 0 ? focus : 0;
        }
      }
    },
  },
});

export default toolkitSliceStatistic.reducer;
export const {
  selectPeriod,
  pomadorDoneStatistic,
  increasePauseCount,
  increasePauseTime,
  checkActualWeek,
  setActiveDay,
} = toolkitSliceStatistic.actions;
