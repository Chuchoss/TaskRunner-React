export function defineStateOfTimer(
  handleStart,
  handleStop,
  initialTouched,
  handlePause,
  counting,
  pauseCounting,
  timeoutPause,
  handleContinue,
  handleDone,
  timeoutCounting,
  handlePauseTimeout,
  handleContinueTimeout,
  handleSkipTimeout
) {
  let firstButtonStyles = {};
  let secondButtonStyles = {};

  firstButtonStyles.handler = handleStart;
  firstButtonStyles.text = "Старт";
  firstButtonStyles.classProp = `fielldButton`;
  secondButtonStyles.classProp = `emptyButton`;

  secondButtonStyles.handler = handleStop;
  secondButtonStyles.text = "Стоп";
  secondButtonStyles.disabled = !initialTouched;

  if (counting) {
    firstButtonStyles.handler = handlePause;
  } else if (pauseCounting && !timeoutPause) {
    firstButtonStyles.handler = handleContinue;

    secondButtonStyles.handler = handleDone;
    secondButtonStyles.text = "Сделано";
  } else if (timeoutCounting) {
    firstButtonStyles.handler = handlePauseTimeout;
  } else if (timeoutPause) {
    firstButtonStyles.handler = handleContinueTimeout;
  }

  if (pauseCounting || timeoutPause) {
    firstButtonStyles.text = "Продолжить";
  }

  if (timeoutCounting || timeoutPause) {
    secondButtonStyles.handler = handleSkipTimeout;
    secondButtonStyles.text = "Пропустить";
  }

  if (counting || timeoutCounting) {
    firstButtonStyles.text = "Пауза";
  }

  return { firstButtonStyles, secondButtonStyles };
}
