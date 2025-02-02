import { Coord } from "../common/Coord";
import { canonize } from "../common/canonize";

export function transpose(input: Coord[]): Coord[] {
  return canonize(input.map(([x, y]) => [y, x]));
}
