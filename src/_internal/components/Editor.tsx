import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import { memo, useCallback, useMemo, useState } from "react";
import { Coord } from "../lib/common/Coord";
import { encode } from "../lib/p4m-s/e/encode";
import { isValidPolyomino } from "../lib/p4m-s/e/isValidPolyomino";
import { range } from "../lib/range";

interface EditorGridProps {
  polyomino: Coord[];
  setPolyomino: (polyomino: Coord[]) => void;
}

function handler(
  polyomino: Coord[],
  setPolyomino: (polyomino: Coord[]) => void,
  x: number,
  y: number
) {
  if (!polyomino.find((coord) => coord[0] === x && coord[1] === y)) {
    if (
      !polyomino.find(
        (coord) =>
          (coord[0] === x + 1 && coord[1] === y) ||
          (coord[0] === x - 1 && coord[1] === y) ||
          (coord[0] === x && coord[1] === y + 1) ||
          (coord[0] === x && coord[1] === y - 1)
      )
    ) {
      return undefined;
    } else {
      return () => setPolyomino([...polyomino, [x, y]]);
    }
  } else {
    const filtered = polyomino.filter(
      (coord) => coord[0] !== x || coord[1] !== y
    );
    if (!isValidPolyomino(filtered)) {
      return undefined;
    } else {
      return () => setPolyomino(filtered);
    }
  }
}

function EditorGridInternal({ polyomino, setPolyomino }: EditorGridProps) {
  const [minX, minY, maxX, maxY, scale] = useMemo(() => {
    const minX = Math.min(...polyomino.map(([x]) => x));
    const minY = Math.min(...polyomino.map(([_, y]) => y));
    const maxX = Math.max(...polyomino.map(([x]) => x));
    const maxY = Math.max(...polyomino.map(([_, y]) => y));
    const scale = `${100 / Math.max(maxX - minX + 3, maxY - minY + 3)}%`;
    return [minX, minY, maxX, maxY, scale];
  }, [polyomino]);

  const rowStyle = useMemo(
    () => ({
      width: "100%",
      height: scale,
      display: "flex",
      justifyContent: "center",
    }),
    [scale]
  );
  const cellStyle = useMemo(
    () => ({
      display: "block",
      width: scale,
      height: "100%",
    }),
    [scale]
  );

  return (
    <div className="flex justify-center">
      <div className="w-[calc(100vw_-_80px)] h-[calc(100vw_-_80px)] tablet:w-[750px] tablet:h-[750px] desktop:w-[720px] desktop:h-[720px] relative flex flex-col justify-center items-center">
        {[...range(minY - 1, maxY + 2)].map((y) => (
          <div key={y} style={rowStyle}>
            {[...range(minX - 1, maxX + 2)].map((x) => {
              const state = handler(polyomino, setPolyomino, x, y);
              const bgClass = polyomino.find(
                (coord) => coord[0] === x && coord[1] === y
              )
                ? "bg-foreground"
                : "bg-transparent";
              return state ? (
                <button
                  key={x}
                  onClick={state}
                  style={cellStyle}
                  className={cn("hover:bg-[pink]", bgClass)}
                />
              ) : (
                <button
                  key={x}
                  disabled
                  style={cellStyle}
                  className={bgClass}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

const EditorGrid = memo(EditorGridInternal);

export interface EditorProps {
  initialPolyomino: Coord[];
}

function EditorInternal({ initialPolyomino }: EditorProps) {
  const [polyomino, setPolyomino] = useState(initialPolyomino);
  const handleReset = useCallback(
    () => setPolyomino(initialPolyomino),
    [initialPolyomino]
  );
  const href = useMemo(() => `/${encode(polyomino)}`, [polyomino]);

  return (
    <div>
      <EditorGrid polyomino={polyomino} setPolyomino={(a) => setPolyomino(a)} />
      <div className="w-full flex justify-center gap-4">
        <Button onClick={handleReset}>Reset</Button>
        <Link href={href}>
          <Button>Go</Button>
        </Link>
      </div>
    </div>
  );
}

export const Editor = dynamic(() => Promise.resolve(EditorInternal), {
  ssr: false,
});
