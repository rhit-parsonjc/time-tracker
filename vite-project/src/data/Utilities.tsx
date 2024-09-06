export function numberToString(num: number, digits: number) {
  let numString: string = num + "";
  while (numString.length < digits) numString = "0" + numString;
  return numString;
}
