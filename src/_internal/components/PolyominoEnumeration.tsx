"use client";

import { useEffect, useState } from "react";
import { b64ToBits } from "../lib/b64ToBits";
import { bitsToPolyomino } from "../lib/bitsToPolyomino";
import { Coord } from "../lib/Coord";
import { Polyomino } from "./Polyomino";

export interface PolyominoEnumerationProps {
  n: number;
}

export function PolyominoEnumeration({ n }: PolyominoEnumerationProps) {
  const [state, setState] = useState<[Coord[], string][] | undefined>(
    undefined
  );
  useEffect(() => {
    (async () => {
      setState(
        (await (await fetch(`/polyomino/enum/${n}.txt`)).text())
          .split("\n")
          .filter((line) => line !== "")
          .map((line) => {
            const polyomino = bitsToPolyomino(b64ToBits(line));
            return [polyomino, line];
          })
      );
    })();
  }, []);

  return state ? (
    <div>
      {state.map((polyomino) => (
        <Polyomino polyomino={polyomino} width={200} height={200} />
      ))}
    </div>
  ) : (
    <div>Loading...</div>
  );
}
