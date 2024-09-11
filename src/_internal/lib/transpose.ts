import { canonize } from "./canonize";
import { Coord } from "./Coord";

export function transpose(input: Coord[]): Coord[] {
  return canonize(input.map(([x, y]) => [y, x]));
}
