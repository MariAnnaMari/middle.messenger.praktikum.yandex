export function getTimeDateFormat(val?: string) {
  if (val) {
    const date: Date = new Date(val);
    const min = setMinutes(date.getUTCMinutes());
    const time = date && `${date.getUTCHours()}:${min}`;
    return time;
  }
}
function setMinutes(n) {
  return n < 10 ? '0' + n : n;
}
