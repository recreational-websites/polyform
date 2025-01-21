import { Coord } from "./Coord";

export function isValidName(
  input: string,
  decode: (input: string) => Coord[]
): Coord[] | undefined {
  try {
    const result = decode(input);

    return result;
  } catch {
    return undefined;
  }
}
