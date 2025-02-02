import { b64ToBits } from "../../common/b64ToBits";
import { canonize } from "../../common/canonize";
import { Coord } from "../../common/Coord";
import { normalize } from "../normalize";

export function decode(encoded: string): Coord[] {
  const bits = b64ToBits(encoded).split("");
  const start: Coord = bits.shift() === "1" ? [0, 1] : [0, 0];
  bits.unshift("1");
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
      visit(
        coord[1] % 2 === 0
          ? [coord[0] + 1, coord[1] + 1]
          : [coord[0] - 1, coord[1] - 1]
      );
      visit([coord[0], coord[1] - 1]);
    }
  }
  visit(start);
  return canonize(normalize([...result].map((json) => JSON.parse(json))));
}
