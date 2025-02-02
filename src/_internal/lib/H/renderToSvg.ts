import { Coord } from "../common/Coord";
import { complementaryColor } from "../util/complementaryColor";

export interface RenderToSvgOptions {
  edgeLength?: number;
  backgroundColor?: string;
  fillColorHexCode?: string;
  strokeColorHexCode?: string;
  strokeWidth?: number;
  offset?: number;
  skipSize?: boolean;
  contain?: [width: number, height: number];
}

const C = 0.866;

export function renderToSvg(
  coords: Coord[],
  {
    edgeLength = 100,
    backgroundColor,
    fillColorHexCode,
    strokeColorHexCode,
    strokeWidth = 20,
    offset = 50,
    skipSize,
    contain,
  }: RenderToSvgOptions = {}
): string {
  const minX = Math.min(...coords.map(([x, y]) => 2 * C * x - C * y));
  const minY = Math.min(...coords.map((c) => c[1] * 1.5 - 0.5));
  const maxX = Math.max(...coords.map(([x, y]) => 2 * C * x - C * y + 2 * C));
  const maxY = Math.max(...coords.map((c) => c[1] * 1.5 + 1.5));

  if (fillColorHexCode && !strokeColorHexCode) {
    strokeColorHexCode = complementaryColor(fillColorHexCode);
  } else if (strokeColorHexCode && !fillColorHexCode) {
    fillColorHexCode = complementaryColor(strokeColorHexCode);
  } else if (!fillColorHexCode && !strokeColorHexCode) {
    fillColorHexCode = "ADD8E6";
    strokeColorHexCode = "000000";
  }

  const width = (maxX - minX) * edgeLength;
  const height = (maxY - minY) * edgeLength;

  const svgParts: string[] = [];

  if (contain) {
    const [width, height] = contain;
    svgParts.push(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">`
    );
  } else if (skipSize) {
    svgParts.push(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${
        width + offset * 2
      } ${height + offset * 2}">`
    );
  } else {
    svgParts.push(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${
        width + offset * 2
      } ${height + offset * 2}" width="${width + offset * 2}" height="${
        height + offset * 2
      }">`
    );
  }

  if (backgroundColor && backgroundColor !== "transparent") {
    if (contain) {
      const [width, height] = contain;
      svgParts.push(
        `<rect x="0" y="0" width="${width}" height="${height}" fill="${backgroundColor}" />`
      );
    } else {
      svgParts.push(
        `<rect x="0" y="0" width="${width + offset * 2}" height="${
          height + offset * 2
        }" fill="${backgroundColor}" />`
      );
    }
  }

  if (contain) {
    const [containerWidth, containerHeight] = contain;
    const imageWidth = width + offset * 2;
    const imageHeight = height + offset * 2;
    const containerAspectRatio = containerWidth / containerHeight;
    const imageAspectRatio = imageWidth / imageHeight;

    let scale,
      translateX = 0,
      translateY = 0;
    if (imageAspectRatio > containerAspectRatio) {
      scale = containerWidth / imageWidth;
    } else {
      scale = containerHeight / imageHeight;
    }
    const scaledImageWidth = imageWidth * scale;
    const scaledImageHeight = imageHeight * scale;
    translateX = (containerWidth - scaledImageWidth) / 2;
    translateY = (containerHeight - scaledImageHeight) / 2;

    svgParts.push(
      `<g transform="translate(${translateX}, ${translateY}) scale(${scale})">`
    );
  }

  coords.forEach(([x, y]) => {
    const startX = offset + (2 * C * x - C * y - minX) * edgeLength;
    const startY = offset + (y * 1.5 - minY) * edgeLength;
    const points = [
      [startX + C * edgeLength, startY + 1.5 * edgeLength], // top
      [startX + 2 * C * edgeLength, startY + edgeLength], // top-right
      [startX + 2 * C * edgeLength, startY], // bottom-right
      [startX + C * edgeLength, startY - 0.5 * edgeLength], // bottom
      [startX, startY], // bottom-left
      [startX, startY + edgeLength], // top-left
    ];

    const pointsStr = points.map(([px, py]) => `${px},${py}`).join(" ");
    svgParts.push(
      `<polygon points="${pointsStr}" fill="#${fillColorHexCode}" stroke="#${strokeColorHexCode}" stroke-width="${strokeWidth}"/>`
    );
  });

  if (contain) {
    svgParts.push("</g>");
  }

  svgParts.push("</svg>");

  return svgParts.join("");
}
