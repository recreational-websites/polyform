import { Coord } from "./Coord";
import { coordComparator } from "./coordComparator";

export function canonize(normalized: Coord[]): Coord[] {
  return normalized.sort(coordComparator);
}
