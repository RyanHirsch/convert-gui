function getTime(str) {
  const matches = (/\s+time=(\d{2}:\d{2}:\d{2}.\d{2})\s+/).exec(str);
  if(!matches) {
    return '';
  }
  const [ , time ] = matches;
  return time;
}

function getMilliseconds(timestamp) {
  const matches = (/(\d{2}):(\d{2}):(\d{2}).(\d{2})/).exec(timestamp);
  if(!matches) {
    return 0;
  }
  const [ , hours, minutes, seconds, partialSeconds ] = matches;
  return (
    (parseInt(hours, 10) * 60 * 60) +
    (parseInt(minutes, 10) * 60) +
    (parseInt(seconds, 10)) +
    (parseFloat(`0.${partialSeconds}`))
  ) * 1000;
}

export {
  getTime,
  getMilliseconds,
};
