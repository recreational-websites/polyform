import { og } from "@/_internal/pages/api/og";
import { NextRequest } from "next/server";

export async function GET(_request: NextRequest) {
  return og([[[0, 0]], ""]);
}
