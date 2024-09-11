import { allCommandsToPolyominoOptions } from "./allCommandsToPolyominoOptions";
import { bitsToCommands } from "./bitsToCommands";
import { commandsToPolyomino } from "./commandsToPolyomino";
import { Coord } from "./Coord";

export function bitsToPolyomino(bits: string): Coord[] {
  if (bits.length < 4) {
    return [];
  }
  const optionsBits = bits.slice(0, 4);
  const commandsBits = bits.slice(4);
  return commandsToPolyomino(
    bitsToCommands(commandsBits),
    allCommandsToPolyominoOptions[parseInt(optionsBits, 2)]
  );
}
