import { PolyominoToCommandsOptions } from "./polyominoToCommands";

export const allPolyominoToCommandsOptions: PolyominoToCommandsOptions[] = [
  ...(
    [
      ["up", "right", "down", "left"],
      ["up", "right", "left", "down"],
      ["up", "down", "right", "left"],
      ["up", "down", "left", "right"],
      ["up", "left", "right", "down"],
      ["up", "left", "down", "right"],
      ["right", "down", "left", "up"],
      ["right", "down", "up", "left"],
      ["right", "left", "down", "up"],
      ["right", "left", "up", "down"],
      ["right", "up", "down", "left"],
      ["right", "up", "left", "down"],
      ["down", "left", "up", "right"],
      ["down", "left", "right", "up"],
      ["down", "up", "left", "right"],
      ["down", "up", "right", "left"],
      ["down", "right", "left", "up"],
      ["down", "right", "up", "left"],
      ["left", "up", "right", "down"],
      ["left", "up", "down", "right"],
      ["left", "right", "up", "down"],
      ["left", "right", "down", "up"],
      ["left", "down", "up", "right"],
      ["left", "down", "right", "up"],
    ] as const
  ).map(
    (directions) =>
      ({
        preferredDirection: {
          type: "absolute",
          directions,
        },
      } as const)
  ),
  ...(
    [
      ["forward", "turnLeft", "turnRight"],
      ["forward", "turnRight", "turnLeft"],
      ["turnLeft", "forward", "turnRight"],
      ["turnLeft", "turnRight", "forward"],
      ["turnRight", "forward", "turnLeft"],
      ["turnRight", "turnLeft", "forward"],
    ] as const
  ).map(
    (commands) =>
      ({ preferredDirection: { type: "relative", commands } } as const)
  ),
];
