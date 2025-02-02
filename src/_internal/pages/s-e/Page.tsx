"use client";

import { Editor } from "@/_internal/components/s-e/Editor";
import { badges } from "@/_internal/lib/s/badges";
import { canonizeFree } from "@/_internal/lib/s/canonizeFree";
import { directions } from "@/_internal/lib/s/e/directions";
import { normalize } from "@/_internal/lib/s/normalize";
import { renderToSvg } from "@/_internal/lib/s/renderToSvg";
import { encode } from "../../lib/s/e/encode";
import { moreInfo } from "../../lib/s/e/moreInfo";
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
      type="s-e"
      badges={badges}
      description="s Edge"
      Editor={Editor}
    />
  );
}
