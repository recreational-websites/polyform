import { Metadata } from "next";

import { encode } from "@/_internal/lib/p4m-s/e/encode";
import { isValidName } from "@/_internal/lib/p4m-s/e/isValidName";
import { moreInfo } from "@/_internal/lib/p4m-s/e/moreInfo";
import { notFound, redirect } from "next/navigation";
import { env } from "../../_internal/lib/env";
import { PolyominoPage } from "../../_internal/pages/PolyominoPage";

interface Params {
  params: Record<"anyForm", string>;
}

export default async function Page({ params }: Params) {
  const anyForm = params.anyForm;
  const polyomino = isValidName(anyForm);
  if (!polyomino) throw notFound();
  const name = encode(polyomino);
  if (name !== anyForm) throw redirect(`/${name}`);
  const info = moreInfo([polyomino, name]);

  return <PolyominoPage moreInfo={info} />;
}

export function generateMetadata({ params }: Params): Metadata {
  const anyForm = params.anyForm;
  const polyomino = isValidName(anyForm);
  if (!polyomino) throw notFound();
  const name = encode(polyomino);
  if (name !== anyForm) throw redirect(`/${name}`);
  const [symmetryGroup] = moreInfo([polyomino, name]);

  const title = `Polyomino ${anyForm}`;
  const description = `Polyomino ${anyForm} with symmetry group ${symmetryGroup}`;

  return {
    metadataBase: new URL(env("METADATA_BASE")),
    title,
    description,
    openGraph: {
      title,
      images: `${env("METADATA_BASE")}/polyomino/api/og/${anyForm}`,
      description,
    },
  };
}
