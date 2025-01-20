import { Coord } from "../common/Coord";

export function canonize(normalizedPolyomino: Coord[]): Coord[] {
  return normalizedPolyomino.sort(([ax, ay], [bx, by]) => ax - bx || ay - by);
}
