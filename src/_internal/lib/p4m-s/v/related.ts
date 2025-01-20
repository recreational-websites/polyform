import { Coord } from "../../common/Coord";
import { Info } from "../../common/Info";
import { canonize } from "../canonize";
import { normalize } from "../normalize";
import { encode } from "./encode";
import { isValid } from "./isValid";
import { moreInfo } from "./moreInfo";

const directions: Coord[] = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

export function related(info: ReturnType<typeof moreInfo>): {
  symmetry: Info[];
  subtractive: Info[];
  additive: Info[];
} {
  const [_, [coords, name], ...others] = info;

  const symmetry: Info[] = [];
  const symmetrySet = new Set<string>([name]);
  for (const other of others) {
    if (symmetrySet.has(other[1])) {
      continue;
    } else {
      symmetrySet.add(other[1]);
      symmetry.push(other);
    }
  }

  const subtractive: Info[] = [];
  if (coords.length !== 1) {
    const subtractiveSet = new Set<string>();
    for (const coord of coords) {
      const subtracted = canonize(
        normalize(coords.filter((arr) => arr !== coord))
      );
      if (isValid(subtracted)) {
        const name = encode(subtracted);
        if (!subtractiveSet.has(name)) {
          subtractiveSet.add(name);
          subtractive.push([subtracted, name]);
        }
      }
    }
  }

  const additive: Info[] = [];
  const additiveSet = new Set<string>();
  for (const [x, y] of coords) {
    for (const [dirX, dirY] of directions) {
      const added = canonize(normalize([...coords, [x + dirX, y + dirY]]));
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
