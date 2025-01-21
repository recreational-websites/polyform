import Link from "next/link";
import { memo, MouseEvent } from "react";
import { Info } from "../../lib/common/Info";
import { defaultRenderOptions } from "../../lib/p6m-E/defaultRenderOptions";
import { renderToSvg, RenderToSvgOptions } from "../../lib/p6m-E/renderToSvg";

export interface ItemProps extends RenderToSvgOptions {
  info: Info;
  width: string | number;
  height: string | number;
  onClick?: (e: MouseEvent) => void;
}

function ItemInternal(props: ItemProps) {
  const { info, width, height, onClick } = props;
  const svgString = renderToSvg(info[0], {
    ...defaultRenderOptions(info),
    backgroundColor: "transparent",
    ...props,
    skipSize: true,
  });
  const href = `/p6m-E-v/${info[1]}`;

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
        alt={`p6m E vertex ${info[1]}`}
      />
    </Link>
  );
}

export const Item = memo(ItemInternal);
