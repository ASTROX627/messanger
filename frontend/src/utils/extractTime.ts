export const extractTime = (dataString: string) => {
  const date = new Date(dataString);
  const hours = padZero(date.getHours());
  const minutes =  padZero(date.getMinutes());
  return `${hours}:${minutes}`
}

const padZero = (number: number) => {
  return number.toString().padStart(2, "0");
}