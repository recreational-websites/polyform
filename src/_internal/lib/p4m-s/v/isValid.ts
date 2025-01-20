import { Coord } from "../../common/Coord";

export function isValid(coords: Coord[]) {
  if (!coords.length) return false;
  const visited: Record<string, boolean | undefined> = Object.fromEntries(
    coords.map((tile) => [JSON.stringify(tile), false])
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
    visit(JSON.stringify([x + 1, y + 1]));
    visit(JSON.stringify([x - 1, y + 1]));
    visit(JSON.stringify([x + 1, y - 1]));
    visit(JSON.stringify([x - 1, y - 1]));
  }
  visit(JSON.stringify(coords[0]));
  return coords.every((tile) => visited[JSON.stringify(tile)]);
}
