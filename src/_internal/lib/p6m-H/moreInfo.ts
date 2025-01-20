import { canonize } from "../common/canonize";
import { Info } from "../common/Info";
import { encode } from "./encode";
import { flipX } from "./flipX";
import { rotate } from "./rotate";
import { SymmetryGroup } from "./SymmetryGroup";

export function moreInfo([canonized, canonizedN]: Info): [
  symmetryGroup: SymmetryGroup,
  canonized: Info,
  c60: Info,
  c120: Info,
  c180: Info,
  c240: Info,
  c300: Info,
  flipped: Info,
  f60: Info,
  f120: Info,
  f180: Info,
  f240: Info,
  f300: Info
] {
  const c60 = canonize(rotate(canonized));
  const c120 = canonize(rotate(c60));
  const c180 = canonize(rotate(c120));
  const c240 = canonize(rotate(c180));
  const c300 = canonize(rotate(c240));
  const flipped = canonize(flipX(canonized));
  const f60 = canonize(rotate(flipped));
  const f120 = canonize(rotate(f60));
  const f180 = canonize(rotate(f120));
  const f240 = canonize(rotate(f180));
  const f300 = canonize(rotate(f240));
  const c60n = encode(c60);
  const c120n = encode(c120);
  const c180n = encode(c180);
  const c240n = encode(c240);
  const c300n = encode(c300);
  const flippedN = encode(flipped);
  const f60n = encode(f60);
  const f120n = encode(f120);
  const f180n = encode(f180);
  const f240n = encode(f240);
  const f300n = encode(f300);
  const part = [
    [canonized, canonizedN],
    [c60, c60n],
    [c120, c120n],
    [c180, c180n],
    [c240, c240n],
    [c300, c300n],
    [flipped, flippedN],
    [f60, f60n],
    [f120, f120n],
    [f180, f180n],
    [f240, f240n],
    [f300, f300n],
  ] as const;

  if (canonizedN == c60n) {
    if (canonizedN == flippedN || canonizedN == f120n || canonizedN == f240n) {
      return ["All", ...part];
    }
    return ["Rotation6Fold", ...part];
  } else if (canonizedN == c180n) {
    if (canonizedN == flippedN || canonizedN == f120n || canonizedN == f240n) {
      return ["Rotation2FoldMirrorAll", ...part];
    }
    return ["Rotation2Fold", ...part];
  } else if (
    canonizedN == flippedN ||
    canonizedN == f120n ||
    canonizedN == f240n
  ) {
    if (canonizedN == c120n) {
      return ["Rotation3FoldMirror30", ...part];
    }
    return ["Mirror30", ...part];
  } else if (canonizedN == c120n) {
    if (canonizedN == c180n) {
      return ["Rotation3FoldMirror0", ...part];
    }
    return ["Rotation3Fold", ...part];
  } else if (canonizedN == f180n || canonizedN == f300n || canonizedN == f60n) {
    return ["Mirror0", ...part];
  }
  return ["None", ...part];
}
