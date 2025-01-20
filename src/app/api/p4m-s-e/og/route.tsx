import { og } from "@/_internal/pages/p4m-s-e/og";
import { NextRequest } from "next/server";

export async function GET(_request: NextRequest) {
  return og([[[0, 0]], ""]);
}
