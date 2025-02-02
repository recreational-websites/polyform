import { Coord } from "../../common/Coord";

export function directions([_, y]: Coord): Coord[] {
  return y % 2
    ? [
        [0, 1],
        [-1, -1],
        [0, -1],
      ]
    : [
        [0, 1],
        [1, 1],
        [0, -1],
      ];
}
