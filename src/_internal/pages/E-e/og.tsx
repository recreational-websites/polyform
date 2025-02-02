import { Info } from "@/_internal/lib/common/Info";

import { badges } from "@/_internal/lib/E/badges";
import { canonizeFree } from "@/_internal/lib/E/canonizeFree";
import { moreInfo } from "@/_internal/lib/E/e/moreInfo";
import { renderToSvg } from "@/_internal/lib/E/renderToSvg";
import { og as commonOg } from "../common/og";

export function og([coords, name]: Info) {
  const symmetryGroup = moreInfo([coords, name])[0];
  return commonOg(
    [coords, name],
    canonizeFree,
    renderToSvg,
    symmetryGroup,
    badges,
    "H"
  );
}
