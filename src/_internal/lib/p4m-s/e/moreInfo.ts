import { Info } from "../../common/Info";
import { rotate } from "../rotate";
import { SymmetryGroup } from "../SymmetryGroup";
import { transpose } from "../transpose";
import { encode } from "./encode";

export function moreInfo(
  s0: Info
): [
  symmetryGroup: SymmetryGroup,
  s0: Info,
  s1: Info,
  s2: Info,
  s3: Info,
  t0: Info,
  t1: Info,
  t2: Info,
  t3: Info
] {
  const [s0p, s0n] = s0;
  const s1p = rotate(s0p);
  const s2p = rotate(s1p);
  const s3p = rotate(s2p);
  const t0p = transpose(s0p);
  const t1p = rotate(t0p);
  const t2p = rotate(t1p);
  const t3p = rotate(t2p);
  const s1n = encode(s1p);
  const s2n = encode(s2p);
  const s3n = encode(s3p);
  const t0n = encode(t0p);
  const t1n = encode(t1p);
  const t2n = encode(t2p);
  const t3n = encode(t3p);
  const part = [
    s0,
    [s1p, s1n],
    [s2p, s2n],
    [s3p, s3n],
    [t0p, t0n],
    [t1p, t1n],
    [t2p, t2n],
    [t3p, t3n],
  ] as const;

  if (s0n == s1n) {
    if (s0n == t0n) {
      return ["All", ...part];
    }
    return ["Rotation4Fold", ...part];
  } else if (s0n == t0n || s0n == t2n) {
    if (s0n == s2n) {
      return ["Rotation2FoldMirror45", ...part];
    }
    return ["Mirror45", ...part];
  } else if (s0n == t1n || s0n == t3n) {
    if (s0n == s2n) {
      return ["Rotation2FoldMirror90", ...part];
    }
    return ["Mirror90", ...part];
  } else if (s0n == s2n) {
    return ["Rotation2Fold", ...part];
  }
  return ["None", ...part];
}
