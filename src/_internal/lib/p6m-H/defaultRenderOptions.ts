import { hsvToRgbHexCode } from "../common/hsvToRgbHexCode";
import { Info } from "../common/Info";
import { simpleHash } from "../common/simpleHash";
import { canonizeFree } from "./canonizeFree";
import { RenderToSvgOptions } from "./renderToSvg";

export function defaultRenderOptions(
  info: Info
): Required<
  Pick<
    RenderToSvgOptions,
    "fillColorHexCode" | "strokeColorHexCode" | "backgroundColor"
  >
> {
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
