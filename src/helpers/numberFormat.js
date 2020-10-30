/* eslint-disable */
function isNumber(num) {
  return typeof num === 'number' && !isNaN(num);
}

export default function numberFormat(value) {
  if (isNumber(value)) {
    return new Intl.NumberFormat().format(value);
  } else {
    return 0;
  }
}