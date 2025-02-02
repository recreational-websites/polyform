"use client";

import { badges } from "@/_internal/lib/H/badges";
import { canonizeFree } from "@/_internal/lib/H/canonizeFree";
import { directions } from "@/_internal/lib/H/directions";
import { normalize } from "@/_internal/lib/H/normalize";
import { renderToSvg } from "@/_internal/lib/H/renderToSvg";
import { encode } from "../../lib/H/encode";
import { moreInfo } from "../../lib/H/moreInfo";
import { Page as CommonPage } from "../common/Page";

export interface PageProps {
  moreInfo: ReturnType<typeof moreInfo>;
}

const moreInfoIndexToName = [
  "60°",
  "120°",
  "180°",
  "240°",
  "300°",
  "flip",
  "flip 60°",
  "flip 120°",
  "flip 180°",
  "flip 240°",
  "flip 300°",
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
      type="H"
      badges={badges}
      description="H"
    />
  );
}
