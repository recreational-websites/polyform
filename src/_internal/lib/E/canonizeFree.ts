import { Coord } from "../common/Coord";
import { canonize } from "../common/canonize";
import { coordsComparator } from "../common/coordsComparator";
import { flipX } from "./flipX";
import { rotate } from "./rotate";

export function canonizeFree(normalized: Coord[]): Coord[] {
  const canonized = canonize(normalized);
  const c60 = canonize(rotate(normalized));
  const c120 = canonize(rotate(c60));
  const c180 = canonize(rotate(c120));
  const c240 = canonize(rotate(c180));
  const c300 = canonize(rotate(c240));
  const flipped = canonize(flipX(normalized));
  const f60 = canonize(rotate(flipped));
  const f120 = canonize(rotate(f60));
  const f180 = canonize(rotate(f120));
  const f240 = canonize(rotate(f180));
  const f300 = canonize(rotate(f240));
  return [
    canonized,
    c60,
    c120,
    c180,
    c240,
    c300,
    flipped,
    f60,
    f120,
    f180,
    f240,
    f300,
  ].sort(coordsComparator)[0];
}
