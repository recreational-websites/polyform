import { Metadata } from "next";

import { encode } from "@/_internal/lib/p4m-s/e/encode";
import { isValidName } from "@/_internal/lib/p4m-s/e/isValidName";
import { moreInfo } from "@/_internal/lib/p4m-s/e/moreInfo";
import { notFound, redirect } from "next/navigation";
import { env } from "../../../_internal/lib/env";
import { Page as InternalPage } from "../../../_internal/pages/p4m-s-e/Page";

interface Params {
  params: Record<"input", string>;
}

export default async function Page({ params }: Params) {
  const input = params.input;
  const coords = isValidName(input);
  if (!coords) throw notFound();
  const name = encode(coords);
  if (name !== input) throw redirect(`/p4m-s-e/${name}`);
  const info = moreInfo([coords, name]);

  return <InternalPage moreInfo={info} />;
}

export function generateMetadata({ params }: Params): Metadata {
  const input = params.input;
  const coords = isValidName(input);
  if (!coords) throw notFound();
  const name = encode(coords);
  if (name !== input) throw redirect(`/p4m-s-e/${name}`);
  const [symmetryGroup] = moreInfo([coords, name]);

  const title = `p4m s edge ${input}`;
  const description = `p4m s edge ${input} with symmetry group ${symmetryGroup}`;

  return {
    metadataBase: new URL(env("METADATA_BASE")),
    title,
    description,
    openGraph: {
      title,
      images: `${env("METADATA_BASE")}/polyform/p4m-s-e/api/og/${input}`,
      description,
    },
  };
}
