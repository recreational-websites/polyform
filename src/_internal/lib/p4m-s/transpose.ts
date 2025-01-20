import { Coord } from "../common/Coord";
import { canonize } from "./canonize";

export function transpose(input: Coord[]): Coord[] {
  return canonize(input.map(([x, y]) => [y, x]));
}
