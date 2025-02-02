import { Coord } from "@/_internal/lib/common/Coord";
import {
  DefaultRenderOptions,
  defaultRenderOptions,
} from "@/_internal/lib/common/defaultRenderOptions";
import { Info } from "@/_internal/lib/common/Info";
import { contrastColor } from "@/_internal/lib/util/contrastColor";
import { ImageResponse } from "next/og";

export function og(
  [coords, name]: Info,
  canonizeFree: (coords: Coord[]) => Coord[],
  renderToSvg: (
    coords: Coord[],
    options: DefaultRenderOptions & Partial<Record<"contain", [number, number]>>
  ) => string,
  symmetryGroup: string,
  badges: (symmetryGroup: string) => string[],
  description: string
) {
  const { backgroundColor, fillColorHexCode, strokeColorHexCode } =
    defaultRenderOptions([coords, name], canonizeFree);

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
          {description}
          <div style={{ padding: 24 }}>{name}</div>
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: 16,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span style={badgeStyle}>Symmetry group: {symmetryGroup}</span>
            <span style={badgeStyle}>Tile count: {coords.length}</span>
            {badges(symmetryGroup).map((badge) => (
              <span key={badge} style={badgeStyle}>
                {badge}
              </span>
            ))}
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
