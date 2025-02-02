export function badges(symmetryGroup: string): string[] {
  return [
    ...([
      "All",
      "Rotation2FoldMirror90",
      "Rotation2FoldMirror45",
      "Rotation2Fold",
    ].includes(symmetryGroup)
      ? ["Rotation 2 Fold"]
      : []),
    ...(["All", "Rotation4Fold"].includes(symmetryGroup)
      ? ["Rotation 4 Fold"]
      : []),
    ...(["All", "Rotation2FoldMirror90", "Mirror90"].includes(symmetryGroup)
      ? ["Mirror 90°"]
      : []),
    ...(["All", "Rotation2FoldMirror45", "Mirror45"].includes(symmetryGroup)
      ? ["Mirror 45°"]
      : []),
  ];
}
