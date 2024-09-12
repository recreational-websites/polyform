import { canonizeFree } from "./canonizeFree";
import { Coord } from "./Coord";
import { hsvToRgb } from "./hsvToRgb";
import { Polyomino } from "./Polyomino";
import { RenderToSvgOptions } from "./renderToSvg";

function simpleHash(polyomino: Coord[]): [hue: number, other: number] {
  let hash = 42;

  for (const [x, y] of polyomino) {
    hash = (hash << 3) - hash + x * 0x42042042 + y * 0x424242;
    hash = hash & hash;
  }

  const hue = (hash & 0xffff) / 0x10000;
  const other = (hash & 0xff0000) / 0x1000000;

  return [hue, other];
}

function toHex(value: number): string {
  const hex = value.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function hsvToRgbHexCode(h: number, s: number, v: number): string {
  const [r, g, b] = hsvToRgb(h, s, v);
  return `${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function defaultRenderOptions(
  polyomino: Polyomino
): Required<
  Pick<
    RenderToSvgOptions,
    "fillColorHexCode" | "strokeColorHexCode" | "backgroundColor"
  >
> {
  const [hue, other] = simpleHash(canonizeFree(polyomino[0]));
  const fillColorHexCode = hsvToRgbHexCode(
    hue,
    other / 2 + 0.5,
    other / 4 + 0.75
  );
  const strokeColorHexCode = hsvToRgbHexCode(
    (hue + 0.5) % 1,
    other / 2,
    other / 4
  );
  const backgroundColor = `#${hsvToRgbHexCode(
    hue,
    other / 8,
    other / 4 + 0.75
  )}`;
  return {
    fillColorHexCode,
    strokeColorHexCode,
    backgroundColor,
  };
}
