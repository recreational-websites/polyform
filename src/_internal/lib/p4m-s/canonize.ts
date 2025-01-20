import { Coord } from "../common/Coord";

export function canonize(normalized: Coord[]): Coord[] {
  return normalized.sort(([ax, ay], [bx, by]) => ax - bx || ay - by);
}
