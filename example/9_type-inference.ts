var a = 'a';

function logA(a = 'a') {
  var b = 10;
  return b;
}

interface Dropdown<T> {
  value: T
  title: string;
}
var items: Dropdown<number> = {
  value: 10,
  title: 'a'
}

interface DetailedDropdown<T> extends Dropdown<T> {
  description: string;
  tag: T;
}
var detailItems: DetailedDropdown<number> = {
  value: 1,
  title: 'a',
  description: 'b',
  tag: 2
}

// Best Common Type
var arr = [1, 2, 3] // number[]
var arr2 = [1, 2, true] // (number | boolean)[]