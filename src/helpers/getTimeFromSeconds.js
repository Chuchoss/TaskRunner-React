export default function getTimeFromSeconds(allSeconds) {
	let minutes = Math.trunc(allSeconds / 60)
	let seconds = allSeconds - (minutes * 60)
	return  { minutes, seconds }
};