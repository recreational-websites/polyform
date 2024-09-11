import { allCommandsToPolyominoOptions } from "./allCommandsToPolyominoOptions";
import { allPolyominoToCommandsOptions } from "./allPolyominoToCommandsOptions";
import { canonize } from "./canonize";
import { Coord } from "./Coord";
import { polyominoToCommands } from "./polyominoToCommands";
import { rotate } from "./rotate";
import { transpose } from "./transpose";

export function canonizeFree(polyomino: Coord[]): Coord[] {
  const s0 = canonize(polyomino);
  const s1 = canonize(rotate(polyomino));
  const s2 = canonize(rotate(s1));
  const s3 = canonize(rotate(s2));
  const t0 = canonize(transpose(polyomino));
  const t1 = canonize(rotate(t0));
  const t2 = canonize(rotate(t1));
  const t3 = canonize(rotate(t2));
  const s0b = polyominoToCommands(
    s0,
    allCommandsToPolyominoOptions[0],
    allPolyominoToCommandsOptions[0]
  ).join();
  const s1b = polyominoToCommands(
    s1,
    allCommandsToPolyominoOptions[0],
    allPolyominoToCommandsOptions[0]
  ).join();
  const s2b = polyominoToCommands(
    s2,
    allCommandsToPolyominoOptions[0],
    allPolyominoToCommandsOptions[0]
  ).join();
  const s3b = polyominoToCommands(
    s3,
    allCommandsToPolyominoOptions[0],
    allPolyominoToCommandsOptions[0]
  ).join();
  const t0b = polyominoToCommands(
    t0,
    allCommandsToPolyominoOptions[0],
    allPolyominoToCommandsOptions[0]
  ).join();
  const t1b = polyominoToCommands(
    t1,
    allCommandsToPolyominoOptions[0],
    allPolyominoToCommandsOptions[0]
  ).join();
  const t2b = polyominoToCommands(
    t2,
    allCommandsToPolyominoOptions[0],
    allPolyominoToCommandsOptions[0]
  ).join();
  const t3b = polyominoToCommands(
    t3,
    allCommandsToPolyominoOptions[0],
    allPolyominoToCommandsOptions[0]
  ).join();
  return [
    [s0b, s0] as const,
    [s1b, s1] as const,
    [s2b, s2] as const,
    [s3b, s3] as const,
    [t0b, t0] as const,
    [t1b, t1] as const,
    [t2b, t2] as const,
    [t3b, t3] as const,
  ].sort(([a], [b]) => (a > b ? 1 : a < b ? -1 : 0))[0][1];
}
