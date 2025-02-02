import { Metadata } from "next";

import { isValidName } from "@/_internal/lib/common/isValidName";
import { decode } from "@/_internal/lib/s/v/decode";
import { encode } from "@/_internal/lib/s/v/encode";
import { moreInfo } from "@/_internal/lib/s/v/moreInfo";
import { notFound, redirect } from "next/navigation";
import { env } from "../../../_internal/lib/env";
import { Page as InternalPage } from "../../../_internal/pages/s-v/Page";

interface Params {
  params: Record<"input", string>;
}

export default async function Page({ params }: Params) {
  const input = params.input;
  const coords = isValidName(input, decode);
  if (!coords) throw notFound();
  const name = encode(coords);
  if (name !== input) throw redirect(`/s-v/${name}`);
  const info = moreInfo([coords, name]);

  return <InternalPage moreInfo={info} />;
}

export function generateMetadata({ params }: Params): Metadata {
  const input = params.input;
  const coords = isValidName(input, decode);
  if (!coords) throw notFound();
  const name = encode(coords);
  if (name !== input) throw redirect(`/s-v/${name}`);
  const [symmetryGroup] = moreInfo([coords, name]);

  const title = `s vertex ${input}`;
  const description = `s vertex ${input} with symmetry group ${symmetryGroup}`;

  return {
    metadataBase: new URL(env("METADATA_BASE")),
    title,
    description,
    openGraph: {
      title,
      images: `${env("METADATA_BASE")}/polyform/api/s-v/og/${input}`,
      description,
    },
  };
}
