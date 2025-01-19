import { bitsToB64 } from "./bitsToB64";
import { Coord } from "./Coord";

export function encode(anyPolyomino: Coord[]): string {
  const visited = new Set<string>();
  const polyomino = new Set<string>();
  anyPolyomino.forEach((coord) => polyomino.add(JSON.stringify(coord)));
  const start = anyPolyomino.sort(
    ([ax, ay], [bx, by]) => ax - bx || ay - by
  )[0];
  let result = "";
  function visit(coord: Coord) {
    if (coord[0] < start[0] || (coord[0] === start[0] && coord[1] < start[1])) {
      return;
    }
    if (visited.has(JSON.stringify(coord))) {
      return;
    }
    visited.add(JSON.stringify(coord));
    if (polyomino.has(JSON.stringify(coord))) {
      result += "1";
      visit([coord[0], coord[1] + 1]);
      visit([coord[0] + 1, coord[1]]);
      visit([coord[0], coord[1] - 1]);
      visit([coord[0] - 1, coord[1]]);
    } else {
      result += "0";
    }
  }
  visit(start);
  while (result.endsWith("0")) {
    result = result.slice(0, result.length - 1);
  }
  return bitsToB64(result.slice(1));
}
