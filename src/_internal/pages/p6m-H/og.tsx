import { Info } from "@/_internal/lib/common/Info";
import { defaultRenderOptions } from "@/_internal/lib/p6m-H/defaultRenderOptions";
import { moreInfo } from "@/_internal/lib/p6m-H/moreInfo";
import { renderToSvg } from "@/_internal/lib/p6m-H/renderToSvg";
import { contrastColor } from "@/_internal/lib/util/contrastColor";
import { ImageResponse } from "next/og";

export function og([coords, name]: Info) {
  const [symmetryGroup] = moreInfo([coords, name]);

  const { backgroundColor, fillColorHexCode, strokeColorHexCode } =
    defaultRenderOptions([coords, name]);

  const svg = renderToSvg(coords, {
    fillColorHexCode,
    strokeColorHexCode,
    contain: [630, 630],
    backgroundColor: "transparent",
  });

  const badgeStyle = {
    padding: 8,
    borderRadius: 12,
    background: `#${fillColorHexCode}`,
    color: `#${contrastColor(fillColorHexCode)}`,
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          alignItems: "center",
          backgroundColor,
        }}
      >
        <img
          src={`data:image/svg+xml;base64,${btoa(svg)}`}
          width={630}
          height={630}
        />
        <div
          style={{
            height: "100%",
            flex: 1,
            background: `linear-gradient(to right, #FFF0, white 50%, white)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 48,
            wordBreak: "break-all",
          }}
        >
          p6m H<div style={{ padding: 24 }}>{name}</div>
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: 16,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span style={badgeStyle}>Symmetry Group: {symmetryGroup}</span>
            <span style={badgeStyle}>Tile count: {coords.length}</span>
            {[
              "All",
              "Rotation6Fold",
              "Rotation2Fold",
              "Rotation2FoldMirrorAll",
            ].includes(symmetryGroup) && (
              <span style={badgeStyle}>Rotation 2 Fold</span>
            )}
            {[
              "All",
              "Rotation6Fold",
              "Rotation3Fold",
              "Rotation3FoldMirror0",
              "Rotation3FoldMirror30",
            ].includes(symmetryGroup) && (
              <span style={badgeStyle}>Rotation 3 Fold</span>
            )}
            {["All", "Rotation6Fold"].includes(symmetryGroup) && (
              <span style={badgeStyle}>Rotation 6 Fold</span>
            )}
            {[
              "All",
              "Mirror0",
              "Rotation2FoldMirrorAll",
              "Rotation3FoldMirror0",
            ].includes(symmetryGroup) && (
              <span style={badgeStyle}>Mirror 0°</span>
            )}
            {[
              "All",
              "Mirror30",
              "Rotation2FoldMirrorAll",
              "Rotation3FoldMirror30",
            ].includes(symmetryGroup) && (
              <span style={badgeStyle}>Mirror 30°</span>
            )}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
