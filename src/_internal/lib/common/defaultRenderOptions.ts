import { hsvToRgbHexCode } from "../common/hsvToRgbHexCode";
import { Info } from "../common/Info";
import { simpleHash } from "../common/simpleHash";
import { Coord } from "./Coord";

export interface DefaultRenderOptions {
  fillColorHexCode?: string;
  strokeColorHexCode?: string;
  backgroundColor?: string;
}

export function defaultRenderOptions(
  info: Info,
  canonizeFree: (coords: Coord[]) => Coord[]
): Required<DefaultRenderOptions> {
  const [hue, other] = simpleHash(canonizeFree(info[0]));
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
