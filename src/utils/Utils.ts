function getDuration(startTime: string, stopTime: string): number {
  if (!stopTime)
    return 0;

  const timeStart = getHoursAndMinutes(startTime);
  const timeStop = getHoursAndMinutes(stopTime);

  if (timeStop.hours === 0 && timeStop.minutes === 0)
    return 0;

  if (timeStop.hours < timeStart.hours || (timeStop.hours === timeStart.hours && timeStop.minutes < timeStart.minutes))
    return -1;

  return (timeStop.hours - timeStart.hours) * 60 + timeStop.minutes - timeStart.minutes;
}

function getHoursAndMinutes(time: string) {
  time = time.replace(":","");
  time = time.padEnd(4,"0");

  const hours = parseInt(time.substring(0,2));
  const minutes = parseInt(time.substring(2, 4));

  return { hours, minutes };
}

function getTagsInArray(text: string): string[] {
  text = text.trim();
  text = text.replaceAll(","," ");

  return text ? text.split(" ") : [];
}

export { getDuration, getHoursAndMinutes, getTagsInArray }