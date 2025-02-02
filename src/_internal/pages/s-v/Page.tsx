"use client";

import { Editor } from "@/_internal/components/s-v/Editor";
import { badges } from "@/_internal/lib/s/badges";
import { canonizeFree } from "@/_internal/lib/s/canonizeFree";
import { normalize } from "@/_internal/lib/s/normalize";
import { renderToSvg } from "@/_internal/lib/s/renderToSvg";
import { directions } from "@/_internal/lib/s/v/directions";
import { encode } from "../../lib/s/v/encode";
import { moreInfo } from "../../lib/s/v/moreInfo";
import { Page as CommonPage } from "../common/Page";

export interface PageProps {
  moreInfo: ReturnType<typeof moreInfo>;
}

const moreInfoIndexToName = [
  "90°",
  "180°",
  "270°",
  "transpose",
  "flip X",
  "flip diagonally",
  "flip Y",
];

export function Page(props: PageProps) {
  return (
    <CommonPage
      moreInfo={props.moreInfo}
      getMoreInfo={moreInfo}
      canonizeFree={canonizeFree}
      directions={directions}
      encode={encode}
      moreInfoIndexToName={moreInfoIndexToName}
      normalize={normalize}
      renderToSvg={renderToSvg}
      type="s-v"
      badges={badges}
      description="s Vertex"
      Editor={Editor}
    />
  );
}
