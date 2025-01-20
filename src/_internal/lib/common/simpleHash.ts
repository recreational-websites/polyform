import { Coord } from "./Coord";

export function simpleHash(coords: Coord[]): [hue: number, other: number] {
  let hash = 42;

  for (const [x, y] of coords) {
    hash = (hash << 3) - hash + x * 0x42042042 + y * 0x424242;
    hash = hash & hash;
  }

  const hue = (hash & 0xffff) / 0x10000;
  const other = (hash & 0xff0000) / 0x1000000;

  return [hue, other];
}
