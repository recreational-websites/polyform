import { canonize } from "./canonize";
import { Coord } from "./Coord";
import { encode } from "./encode";
import { isValidPolyomino } from "./isValidPolyomino";
import { moreInfo } from "./moreInfo";
import { normalize } from "./normalize";
import { Polyomino } from "./Polyomino";

const directions: Coord[] = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

export function relatedPolyominoes(info: ReturnType<typeof moreInfo>): {
  symmetry: Polyomino[];
  subtractive: Polyomino[];
  additive: Polyomino[];
} {
  const [_, [polyomino, name], ...others] = info;

  const symmetry: Polyomino[] = [];
  const symmetrySet = new Set<string>([name]);
  for (const other of others) {
    if (symmetrySet.has(other[1])) {
      continue;
    } else {
      symmetrySet.add(other[1]);
      symmetry.push(other);
    }
  }

  const subtractive: Polyomino[] = [];
  if (polyomino.length !== 1) {
    const subtractiveSet = new Set<string>();
    for (const coord of polyomino) {
      const subtracted = canonize(
        normalize(polyomino.filter((arr) => arr !== coord))
      );
      if (isValidPolyomino(subtracted)) {
        const name = encode(subtracted);
        if (!subtractiveSet.has(name)) {
          subtractiveSet.add(name);
          subtractive.push([subtracted, name]);
        }
      }
    }
  }

  const additive: Polyomino[] = [];
  const additiveSet = new Set<string>();
  for (const [x, y] of polyomino) {
    for (const [dirX, dirY] of directions) {
      const added = canonize(normalize([...polyomino, [x + dirX, y + dirY]]));
      const name = encode(added);
      if (
        new Set(added.map((coord) => JSON.stringify(coord))).size ===
          added.length &&
        !additiveSet.has(name)
      ) {
        additiveSet.add(name);
        additive.push([added, name]);
      }
    }
  }

  return { symmetry, subtractive, additive };
}
