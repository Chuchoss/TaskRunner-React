import React from "react";
import SettingsButtonRemove from "../../components/Settings/SettingsButton/SettingsButtonRemove/SettingsButtonRemove";
import SettingsCountForm from "../../components/Settings/SettingsCountForm/SettingsCountForm";
import SettingsToggle from "../../components/Settings/SettingsToggle/SettingsToggle";
import styles from "./SettingsPage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setNotifications } from "../../toolkitRedux/toolkitSliceNotification";
import {
  increaseInitialPomadorTime,
  decreaseInitialPomadorTime,
} from "../../toolkitRedux/toolkitSliceTimer";
import {
  decreaseInitialBigTimeoutTime,
  increaseInitialBigTimeoutTime,
  decreaseInitialTimeoutTime,
  increaseInitialTimeoutTime,
  decreaseInitialBigTimeoutAfter,
  increaseInitialBigTimeoutAfter,
} from "../../toolkitRedux/toolkitSliceTimeOuts";

export default function SettingsPage() {
  const dispatch = useDispatch();

  const { notifications } = useSelector((state) => state.notifications);
  const { initialPomadorTime } = useSelector((state) => state.timer);
  const { initialTimeoutTime, initialBigTimeoutTime, initialBigTimeoutAfter } =
    useSelector((state) => state.timeouts);

  const settings = [
    {
      title: "Продолжительность помидора",
      component: (
        <SettingsCountForm
          handlerIncrease={() => dispatch(increaseInitialPomadorTime())}
          handlerDecrease={() => dispatch(decreaseInitialPomadorTime())}
          placeholder={initialPomadorTime}
        />
      ),
    },
    {
      title: "Продолжительность короткого перерыва",
      component: (
        <SettingsCountForm
          handlerIncrease={() => dispatch(increaseInitialTimeoutTime())}
          handlerDecrease={() => dispatch(decreaseInitialTimeoutTime())}
          placeholder={initialTimeoutTime}
        />
      ),
    },
    {
      title: "Продолжительность длинного перерыва",
      component: (
        <SettingsCountForm
          handlerIncrease={() => dispatch(increaseInitialBigTimeoutTime())}
          handlerDecrease={() => dispatch(decreaseInitialBigTimeoutTime())}
          placeholder={initialBigTimeoutTime}
        />
      ),
    },
    {
      title: "Частота длинных перерывов (перерыв после)",
      component: (
        <SettingsCountForm
          handlerIncrease={() => dispatch(increaseInitialBigTimeoutAfter())}
          handlerDecrease={() => dispatch(decreaseInitialBigTimeoutAfter())}
          placeholder={initialBigTimeoutAfter}
          value='помидор'
        />
      ),
    },
    {
      title: "Уведомления",
      component: (
        <SettingsToggle
          handler={() => dispatch(setNotifications())}
          checked={notifications}
        />
      ),
    },
    {
      title: "Обнулить данные",
      component: <SettingsButtonRemove />,
    },
  ];
  return (
    <>
      <h2 className='visually-hidden'>Settings Page</h2>
      <ul className={styles.settingsWrapper}>
        {settings.map((item) => (
          <li key={item.title}>
            <p>{item.title}</p>
            {item.component}
          </li>
        ))}
      </ul>
    </>
  );
}
