import { canonize } from "./canonize";
import { Coord } from "./Coord";
import { rotate } from "./rotate";
import { transpose } from "./transpose";

function comparator(a: Coord[], b: Coord[]) {
  if (a.length !== b.length) {
    return a.length - b.length;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i][0] !== b[i][0]) {
      return a[i][0] - b[i][0];
    } else if (a[i][1] !== b[i][1]) {
      return a[i][1] - b[i][1];
    }
  }

  return 0;
}

export function canonizeFree(polyomino: Coord[]): Coord[] {
  const s0 = canonize(polyomino);
  const s1 = canonize(rotate(polyomino));
  const s2 = canonize(rotate(s1));
  const s3 = canonize(rotate(s2));
  const t0 = canonize(transpose(polyomino));
  const t1 = canonize(rotate(t0));
  const t2 = canonize(rotate(t1));
  const t3 = canonize(rotate(t2));
  return [s0, s1, s2, s3, t0, t1, t2, t3].sort(comparator)[0];
}
