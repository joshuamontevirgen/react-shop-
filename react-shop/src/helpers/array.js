export function getIndex(arr, id) {
  return arr
    .map((item) => {
      return item.id;
    })
    .indexOf(id);
}
