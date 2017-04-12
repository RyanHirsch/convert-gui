function getTime(str) {
  const [ , time ] = (/\s+time=(\d{2}:\d{2}:\d{2}.\d{2})\s+/).exec(str);
  return time;
}

function getSeconds() {
  return 0;
}

export {
  getTime,
  getSeconds,
};
