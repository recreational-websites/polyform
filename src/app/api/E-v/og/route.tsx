import { og } from "@/_internal/pages/E-v/og";
import { NextRequest } from "next/server";

export async function GET(_request: NextRequest) {
  return og([[[0, 0]], ""]);
}
