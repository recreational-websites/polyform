import { isValidName } from "@/_internal/lib/common/isValidName";
import { decode } from "@/_internal/lib/E/v/decode";
import { encode } from "@/_internal/lib/E/v/encode";
import { og } from "@/_internal/pages/E-v/og";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { input: string } }
) {
  const { input } = params;
  const coords = isValidName(input, decode);
  if (!coords || encode(coords) !== input) {
    return new Response("Not Found", { status: 404 });
  }
  return og([coords, input]);
}
