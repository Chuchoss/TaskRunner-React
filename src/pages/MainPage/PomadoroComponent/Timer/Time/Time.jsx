import Number from "../../../../../components/Numbers/Number";

export default function Time({ payload }) {
  const { secondsOne, secondsTwo, minutesOne, minutesTwo } = payload;
  return (
    <>
      <Number styleProp={minutesOne} />
      <Number styleProp={minutesTwo} />
      <Number styleProp={"dots"} />
      <Number styleProp={secondsOne} />
      <Number styleProp={secondsTwo} />
    </>
  );
}
