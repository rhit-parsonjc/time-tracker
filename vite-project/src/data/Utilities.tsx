export function numberToString(num: number, digits: number): string {
  let numString: string = num + "";
  while (numString.length < digits) numString = "0" + numString;
  return numString;
}

export function wrapClickHandler(clickHandler: () => void) {
  return function (e: React.KeyboardEvent<HTMLElement>) {
    if (e.code === "Enter") {
      clickHandler();
    }
  };
}
