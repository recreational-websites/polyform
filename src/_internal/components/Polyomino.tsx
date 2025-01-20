import Link from "next/link";
import { memo, MouseEvent } from "react";
import { defaultRenderOptions } from "../lib/p4m-s/e/defaultRenderOptions";
import { Polyomino as PolyominoType } from "../lib/p4m-s/e/Polyomino";
import { renderToSvg, RenderToSvgOptions } from "../lib/p4m-s/renderToSvg";

export interface PolyominoProps extends RenderToSvgOptions {
  polyomino: PolyominoType;
  width: string | number;
  height: string | number;
  onClick?: (e: MouseEvent) => void;
}

function PolyominoInternal(props: PolyominoProps) {
  const { polyomino, width, height, onClick } = props;
  const svgString = renderToSvg(polyomino[0], {
    ...defaultRenderOptions(polyomino),
    backgroundColor: "transparent",
    ...props,
    skipSize: true,
  });
  const href = `/${polyomino[1]}`;

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
        alt={`Polyomino ${polyomino[1]}`}
      />
    </Link>
  );
}

export const Polyomino = memo(PolyominoInternal);
