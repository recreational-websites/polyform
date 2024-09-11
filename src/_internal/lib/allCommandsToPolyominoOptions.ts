import { CommandsToPolyominoOptions } from "./commandsToPolyomino";

export const allCommandsToPolyominoOptions: CommandsToPolyominoOptions[] = (
  ["up", "right", "down", "left"] as const
).flatMap((startDirection) => [
  {
    startDirection,
    startCcw: false,
    useQueueInsteadOfStack: false,
  },
  {
    startDirection,
    startCcw: false,
    useQueueInsteadOfStack: true,
  },
  {
    startDirection,
    startCcw: true,
    useQueueInsteadOfStack: false,
  },
  {
    startDirection,
    startCcw: true,
    useQueueInsteadOfStack: true,
  },
]);
