import { Coord } from "../common/Coord";
import { normalize } from "./normalize";

export function flipX(input: Coord[]): Coord[] {
  return normalize(input.map(flipXCoord));
}

function flipXCoord([x, y]: Coord): Coord {
  const x0Mul2 = y - 1;
  return [-x + x0Mul2, y];
}
