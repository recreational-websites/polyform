import { isValid } from "@/_internal/lib/common/isValid";
import { directions } from "@/_internal/lib/s/v/directions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import { memo, useCallback, useMemo, useState } from "react";
import { Coord } from "../../lib/common/Coord";
import { range } from "../../lib/range";
import { encode } from "../../lib/s/v/encode";

interface EditorGridProps {
  coords: Coord[];
  setCoords: (coords: Coord[]) => void;
}

function handler(
  coords: Coord[],
  setCoords: (coords: Coord[]) => void,
  x: number,
  y: number
) {
  if (!coords.find((coord) => coord[0] === x && coord[1] === y)) {
    if (
      !coords.find(
        (coord) =>
          (coord[0] === x + 1 && coord[1] === y) ||
          (coord[0] === x - 1 && coord[1] === y) ||
          (coord[0] === x && coord[1] === y + 1) ||
          (coord[0] === x && coord[1] === y - 1) ||
          (coord[0] === x + 1 && coord[1] === y + 1) ||
          (coord[0] === x - 1 && coord[1] === y + 1) ||
          (coord[0] === x + 1 && coord[1] === y - 1) ||
          (coord[0] === x - 1 && coord[1] === y - 1)
      )
    ) {
      return undefined;
    } else {
      return () => setCoords([...coords, [x, y]]);
    }
  } else {
    const filtered = coords.filter((coord) => coord[0] !== x || coord[1] !== y);
    if (!isValid(filtered, directions)) {
      return undefined;
    } else {
      return () => setCoords(filtered);
    }
  }
}

function EditorGridInternal({ coords, setCoords }: EditorGridProps) {
  const [minX, minY, maxX, maxY, scale] = useMemo(() => {
    const minX = Math.min(...coords.map(([x]) => x));
    const minY = Math.min(...coords.map(([_, y]) => y));
    const maxX = Math.max(...coords.map(([x]) => x));
    const maxY = Math.max(...coords.map(([_, y]) => y));
    const scale = `${100 / Math.max(maxX - minX + 3, maxY - minY + 3)}%`;
    return [minX, minY, maxX, maxY, scale];
  }, [coords]);

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
              const state = handler(coords, setCoords, x, y);
              const bgClass = coords.find(
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
  initialCoords: Coord[];
}

function EditorInternal({ initialCoords }: EditorProps) {
  const [coords, setCoords] = useState(initialCoords);
  const handleReset = useCallback(
    () => setCoords(initialCoords),
    [initialCoords]
  );
  const href = useMemo(() => `/s-v/${encode(coords)}`, [coords]);

  return (
    <div>
      <EditorGrid coords={coords} setCoords={(a) => setCoords(a)} />
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
