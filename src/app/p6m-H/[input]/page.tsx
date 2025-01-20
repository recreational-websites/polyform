import { Metadata } from "next";

import { encode } from "@/_internal/lib/p6m-H/encode";
import { isValidName } from "@/_internal/lib/p6m-H/isValidName";
import { moreInfo } from "@/_internal/lib/p6m-H/moreInfo";
import { notFound, redirect } from "next/navigation";
import { env } from "../../../_internal/lib/env";
import { Page as InternalPage } from "../../../_internal/pages/p6m-H/Page";

interface Params {
  params: Record<"input", string>;
}

export default async function Page({ params }: Params) {
  const input = params.input;
  const coords = isValidName(input);
  if (!coords) throw notFound();
  const name = encode(coords);
  if (name !== input) throw redirect(`/p6m-H/${name}`);
  const info = moreInfo([coords, name]);

  return <InternalPage moreInfo={info} />;
}

export function generateMetadata({ params }: Params): Metadata {
  const input = params.input;
  const coords = isValidName(input);
  if (!coords) throw notFound();
  const name = encode(coords);
  if (name !== input) throw redirect(`/p6m-H/${name}`);
  const [symmetryGroup] = moreInfo([coords, name]);

  const title = `p6m H ${input}`;
  const description = `p6m H ${input} with symmetry group ${symmetryGroup}`;

  return {
    metadataBase: new URL(env("METADATA_BASE")),
    title,
    description,
    openGraph: {
      title,
      images: `${env("METADATA_BASE")}/polyform/api/p6m-H/og/${input}`,
      description,
    },
  };
}
