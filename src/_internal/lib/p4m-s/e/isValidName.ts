import { Coord } from "../../common/Coord";
import { decode } from "./decode";

export function isValidName(input: string): Coord[] | undefined {
  try {
    const result = decode(input);

    return result;
  } catch {
    return undefined;
  }
}
