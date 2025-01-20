import { Coord } from "../../common/Coord";
import { decode } from "./decode";

export function isValidName(anyForm: string): Coord[] | undefined {
  try {
    const polyomino = decode(anyForm);

    return polyomino;
  } catch {
    return undefined;
  }
}
