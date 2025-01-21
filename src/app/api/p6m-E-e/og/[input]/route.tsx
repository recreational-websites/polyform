import { encode } from "@/_internal/lib/p6m-E/e/encode";
import { isValidName } from "@/_internal/lib/p6m-E/e/isValidName";
import { og } from "@/_internal/pages/p6m-E-e/og";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { input: string } }
) {
  const { input } = params;
  const coords = isValidName(input);
  if (!coords || encode(coords) !== input) {
    return new Response("Not Found", { status: 404 });
  }
  return og([coords, input]);
}
