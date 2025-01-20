import { Coord } from "../common/Coord";
import { canonize } from "./canonize";
import { normalize } from "./normalize";

export function rotate(input: Coord[]): Coord[] {
  return canonize(normalize(input.map(([x, y]) => [-y, x])));
}
