import { b64ToBits } from "../../common/b64ToBits";
import { Coord } from "../../common/Coord";
import { canonize } from "../canonize";
import { normalize } from "../normalize";

export function decode(encoded: string): Coord[] {
  const bits = ("1" + b64ToBits(encoded)).split("");
  const visited = new Set<string>();
  const result = new Set<string>();
  function visit(coord: Coord) {
    if (coord[0] < 0 || (coord[0] === 0 && coord[1] < 0)) {
      return;
    }
    if (visited.has(JSON.stringify(coord))) {
      return;
    }
    visited.add(JSON.stringify(coord));
    if (bits.shift() === "1") {
      result.add(JSON.stringify(coord));
      visit([coord[0], coord[1] + 1]);
      visit([coord[0] + 1, coord[1]]);
      visit([coord[0], coord[1] - 1]);
      visit([coord[0] - 1, coord[1]]);
    }
  }
  visit([0, 0]);
  return canonize(normalize([...result].map((json) => JSON.parse(json))));
}
