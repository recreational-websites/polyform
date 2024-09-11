import { bitsToB64 } from "./bitsToB64";
import { canonize } from "./canonize";
import { Coord } from "./Coord";
import { isValidName } from "./isValidName";
import { isValidPolyomino } from "./isValidPolyomino";
import { moreInfo } from "./moreInfo";
import { normalize } from "./normalize";
import { Polyomino } from "./Polyomino";
import { polyominoToBits } from "./polyominoToBits";

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
  const [_, [polyomino]] = info;

  const others = info.slice(2) as Polyomino[];
  const symmetry: Polyomino[] = [];
  const symmetrySet = new Set<string>([JSON.stringify(polyomino)]);
  for (const other of others) {
    const key = JSON.stringify(other);
    if (symmetrySet.has(key)) {
      continue;
    } else {
      symmetrySet.add(key);
      symmetry.push(other);
    }
  }

  const subtractive: Polyomino[] = [];
  const subtractiveSet = new Set<string>();
  for (const coord of polyomino) {
    const subtracted = canonize(
      normalize(polyomino.filter((arr) => arr !== coord))
    );
    if (isValidPolyomino(subtracted)) {
      const name = bitsToB64(polyominoToBits(subtracted));
      if (!subtractiveSet.has(name)) {
        subtractiveSet.add(name);
        subtractive.push([subtracted, name]);
      }
    }
  }

  const additive: Polyomino[] = [];
  const additiveSet = new Set<string>();
  for (const [x, y] of polyomino) {
    for (const [dirX, dirY] of directions) {
      const added = canonize(normalize([...polyomino, [x + dirX, y + dirY]]));
      const name = bitsToB64(polyominoToBits(added));
      if (
        new Set(added.map((coord) => JSON.stringify(coord))).size ===
          added.length &&
        isValidName(name) &&
        !additiveSet.has(name)
      ) {
        additiveSet.add(name);
        additive.push([added, name]);
      }
    }
  }

  return { symmetry, subtractive, additive };
}
