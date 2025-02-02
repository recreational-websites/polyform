import { Info } from "@/_internal/lib/common/Info";

import { canonizeFree } from "@/_internal/lib/s/canonizeFree";
import { moreInfo } from "@/_internal/lib/s/e/moreInfo";
import { renderToSvg } from "@/_internal/lib/s/renderToSvg";
import { og as commonOg } from "../common/og";

export function og([coords, name]: Info) {
  const symmetryGroup = moreInfo([coords, name])[0];
  return commonOg([coords, name], canonizeFree, renderToSvg, symmetryGroup, [
    ...([
      "All",
      "Rotation2FoldMirror90",
      "Rotation2FoldMirror45",
      "Rotation2Fold",
    ].includes(symmetryGroup)
      ? ["Rotation 2 Fold"]
      : []),
    ...(["All", "Rotation4Fold"].includes(symmetryGroup)
      ? ["Rotation 4 Fold"]
      : []),
    ...(["All", "Rotation2FoldMirror90", "Mirror90"].includes(symmetryGroup)
      ? ["Mirror 90°"]
      : []),
    ...(["All", "Rotation2FoldMirror45", "Mirror45"].includes(symmetryGroup)
      ? ["Mirror 45°"]
      : []),
  ]);
}
