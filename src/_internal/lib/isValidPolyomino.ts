import { Coord } from "./Coord";

export function isValidPolyomino(polyomino: Coord[]) {
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
  return polyomino.every((tile) => visited[JSON.stringify(tile)]);
}
