import { allCommandsToPolyominoOptions } from "./allCommandsToPolyominoOptions";
import { allPolyominoToCommandsOptions } from "./allPolyominoToCommandsOptions";
import { commandsToBits } from "./commandsToBits";
import { Coord } from "./Coord";
import { polyominoToCommands } from "./polyominoToCommands";

export function polyominoToBits(polyomino: Coord[]): string {
  if (polyomino.length === 0) return "";
  let result: string | undefined;
  for (let i = 0; i < allCommandsToPolyominoOptions.length; i++) {
    for (const polyominoToCommandsOptions of allPolyominoToCommandsOptions) {
      const commandsToPolyominoOptions = allCommandsToPolyominoOptions[i];
      const current =
        i.toString(2).padStart(4, "0") +
        commandsToBits(
          polyominoToCommands(
            polyomino,
            commandsToPolyominoOptions,
            polyominoToCommandsOptions
          )
        );
      if (
        !result ||
        result.length > current.length ||
        (result.length === current.length && result > current)
      )
        result = current;
    }
  }
  return result!;
}
