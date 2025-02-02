import { Info } from "@/_internal/lib/common/Info";

import { badges } from "@/_internal/lib/s/badges";
import { canonizeFree } from "@/_internal/lib/s/canonizeFree";
import { renderToSvg } from "@/_internal/lib/s/renderToSvg";
import { moreInfo } from "@/_internal/lib/s/v/moreInfo";
import { og as commonOg } from "../common/og";

export function og([coords, name]: Info) {
  const symmetryGroup = moreInfo([coords, name])[0];
  return commonOg(
    [coords, name],
    canonizeFree,
    renderToSvg,
    symmetryGroup,
    badges,
    "s vertex"
  );
}
