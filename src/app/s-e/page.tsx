import { Metadata } from "next";

import MainPage, {
  generateMetadata as mainGenerateMetaData,
} from "./[input]/page";

const DEFAULT = "";

export default async function Page() {
  return MainPage({ params: { input: DEFAULT } });
}

export function generateMetadata(): Metadata {
  return mainGenerateMetaData({ params: { input: DEFAULT } });
}
