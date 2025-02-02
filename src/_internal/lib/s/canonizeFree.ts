import { Coord } from "../common/Coord";
import { canonize } from "../common/canonize";
import { coordsComparator } from "../common/coordsComparator";
import { rotate } from "./rotate";
import { transpose } from "./transpose";

export function canonizeFree(normalized: Coord[]): Coord[] {
  const s0 = canonize(normalized);
  const s1 = canonize(rotate(normalized));
  const s2 = canonize(rotate(s1));
  const s3 = canonize(rotate(s2));
  const t0 = canonize(transpose(normalized));
  const t1 = canonize(rotate(t0));
  const t2 = canonize(rotate(t1));
  const t3 = canonize(rotate(t2));
  return [s0, s1, s2, s3, t0, t1, t2, t3].sort(coordsComparator)[0];
}
