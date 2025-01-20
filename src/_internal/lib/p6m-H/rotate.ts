import { Coord } from "../common/Coord";
import { normalize } from "./normalize";

export function rotate(input: Coord[]): Coord[] {
  return normalize(input.map(rotateCoord));
}

function rotateCoord([x, y]: Coord): Coord {
  const previousZNewY = y;
  const previousXNewZ = x - y;
  return [previousXNewZ, previousZNewY + previousXNewZ];
}
