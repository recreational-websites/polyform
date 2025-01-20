import { hsvToRgb } from "../util/hsvToRgb";
import { toHex } from "./toHex";

export function hsvToRgbHexCode(h: number, s: number, v: number): string {
  const [r, g, b] = hsvToRgb(h, s, v);
  return `${toHex(r)}${toHex(g)}${toHex(b)}`;
}
