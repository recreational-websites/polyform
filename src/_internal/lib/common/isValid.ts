import { Coord } from "./Coord";

export function isValid(
  coords: Coord[],
  directions: (coord: Coord) => Coord[]
) {
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
    for (const [dirX, dirY] of directions([x, y])) {
      visit(JSON.stringify([x + dirX, y + dirY]));
    }
  }
  visit(JSON.stringify(coords[0]));
  return coords.every((tile) => visited[JSON.stringify(tile)]);
}
