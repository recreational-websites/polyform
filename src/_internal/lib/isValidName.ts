import { b64ToBits } from "./b64ToBits";
import { bitsToPolyomino } from "./bitsToPolyomino";
import { Coord } from "./Coord";

export function isValidName(anyForm: string): Coord[] | undefined {
  try {
    const polyomino = bitsToPolyomino(b64ToBits(anyForm));

    const visited: Record<string, boolean | undefined> = Object.fromEntries(
      polyomino.map((tile) => [JSON.stringify(tile), false])
    );
    function visit(str: string) {
      if (visited[str] !== false) {
        return;
      }
      visited[str] = true;
      const [x, y] = JSON.parse(str);
      visit(JSON.stringify([x + 1, y]));
      visit(JSON.stringify([x - 1, y]));
      visit(JSON.stringify([x, y + 1]));
      visit(JSON.stringify([x, y - 1]));
    }
    visit(JSON.stringify(polyomino[0]));
    if (polyomino.some((tile) => !visited[JSON.stringify(tile)])) {
      throw new Error("Invalid polyomino given");
    }

    return polyomino;
  } catch {
    return undefined;
  }
}
