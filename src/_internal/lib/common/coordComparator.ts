import { Coord } from "./Coord";

export function coordComparator(a: Coord, b: Coord): number {
  return a[0] === b[0] ? Math.sign(a[1] - b[1]) : Math.sign(a[0] - b[0]);
}
