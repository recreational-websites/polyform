import { encode } from "@/_internal/lib/E/v/encode";
import { isValidName } from "@/_internal/lib/E/v/isValidName";
import { og } from "@/_internal/pages/E-v/og";
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
