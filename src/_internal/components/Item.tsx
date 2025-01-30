import Link from "next/link";
import { memo, MouseEvent } from "react";
import { Coord } from "../lib/common/Coord";
import {
  defaultRenderOptions,
  DefaultRenderOptions,
} from "../lib/common/defaultRenderOptions";
import { Info } from "../lib/common/Info";

export interface ItemProps<T extends DefaultRenderOptions> {
  canonizeFree: (coords: Coord[]) => Coord[];
  renderToSvg: (coords: Coord[], options: T) => string;
  renderToSvgOptions: T;
  type: string;
  info: Info;
  width: string | number;
  height: string | number;
  onClick?: (e: MouseEvent) => void;
}

function ItemInternal<T extends DefaultRenderOptions>({
  canonizeFree,
  renderToSvg,
  renderToSvgOptions,
  type,
  info,
  width,
  height,
  onClick,
}: ItemProps<T>) {
  const svgString = renderToSvg(info[0], {
    ...defaultRenderOptions(info, canonizeFree),
    backgroundColor: "transparent",
    ...renderToSvgOptions,
    skipSize: true,
  });
  const href = `/${type}/${info[1]}`;

  return (
    <Link
      href={href}
      onClick={onClick}
      className="focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <img
        className="w-full h-full"
        style={{ width, height }}
        src={`data:image/svg+xml;base64,${btoa(svgString)}`}
        alt={`${type} ${info[1]}`}
      />
    </Link>
  );
}

export const Item = memo(ItemInternal);
