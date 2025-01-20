import { encode } from "@/_internal/lib/p4m-s/e/encode";
import { isValidName } from "@/_internal/lib/p4m-s/e/isValidName";
import { og } from "@/_internal/pages/api/og";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { anyForm: string } }
) {
  const { anyForm } = params;
  const polyomino = isValidName(anyForm);
  if (!polyomino || encode(polyomino) !== anyForm) {
    return new Response("Not Found", { status: 404 });
  }
  return og([polyomino, anyForm]);
}
