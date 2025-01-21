import { canonize } from "./canonize";
import { Coord } from "./Coord";
import { Info } from "./Info";
import { isValid } from "./isValid";

function symmetry([_, name]: Info, others: Info[]) {
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

  return symmetry;
}

function subtractive(
  directions: (coord: Coord) => Coord[],
  normalize: (coords: Coord[]) => Coord[],
  encode: (coords: Coord[]) => string,
  [coords]: Info
) {
  const subtractive: Info[] = [];
  if (coords.length !== 1) {
    const subtractiveSet = new Set<string>();
    for (const coord of coords) {
      const subtracted = canonize(
        normalize(coords.filter((arr) => arr !== coord))
      );
      if (isValid(subtracted, directions)) {
        const name = encode(subtracted);
        if (!subtractiveSet.has(name)) {
          subtractiveSet.add(name);
          subtractive.push([subtracted, name]);
        }
      }
    }
  }

  return subtractive;
}

function additive(
  directions: (coord: Coord) => Coord[],
  normalize: (coords: Coord[]) => Coord[],
  encode: (coords: Coord[]) => string,
  [coords]: Info
) {
  const additive: Info[] = [];
  const additiveSet = new Set<string>();
  for (const [x, y] of coords) {
    for (const [dirX, dirY] of directions([x, y])) {
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

  return additive;
}

export function related(
  directions: (coord: Coord) => Coord[],
  normalize: (coords: Coord[]) => Coord[],
  encode: (coords: Coord[]) => string,
  info: Info,
  others: Info[]
): {
  symmetry: Info[];
  subtractive: Info[];
  additive: Info[];
} {
  return {
    symmetry: symmetry(info, others),
    subtractive: subtractive(directions, normalize, encode, info),
    additive: additive(directions, normalize, encode, info),
  };
}
