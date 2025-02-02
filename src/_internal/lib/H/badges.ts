export function badges(symmetryGroup: string): string[] {
  return [
    ...([
      "All",
      "Rotation6Fold",
      "Rotation2Fold",
      "Rotation2FoldMirrorAll",
    ].includes(symmetryGroup)
      ? ["Rotation 2 Fold"]
      : []),
    ...([
      "All",
      "Rotation6Fold",
      "Rotation3Fold",
      "Rotation3FoldMirror0",
      "Rotation3FoldMirror30",
    ].includes(symmetryGroup)
      ? ["Rotation 3 Fold"]
      : []),
    ...(["All", "Rotation6Fold"].includes(symmetryGroup)
      ? ["Rotation 6 Fold"]
      : []),
    ...([
      "All",
      "Mirror0",
      "Rotation2FoldMirrorAll",
      "Rotation3FoldMirror0",
    ].includes(symmetryGroup)
      ? ["Mirror 0°"]
      : []),
    ...([
      "All",
      "Mirror30",
      "Rotation2FoldMirrorAll",
      "Rotation3FoldMirror30",
    ].includes(symmetryGroup)
      ? ["Mirror 30°"]
      : []),
  ];
}
