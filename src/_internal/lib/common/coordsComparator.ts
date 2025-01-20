import { Coord } from "./Coord";

export function coordsComparator(a: Coord[], b: Coord[]) {
  if (a.length !== b.length) {
    return a.length - b.length;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i][0] !== b[i][0]) {
      return a[i][0] - b[i][0];
    } else if (a[i][1] !== b[i][1]) {
      return a[i][1] - b[i][1];
    }
  }

  return 0;
}
