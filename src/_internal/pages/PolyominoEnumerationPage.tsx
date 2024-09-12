import { PolyominoEnumeration } from "../components/PolyominoEnumeration";

export interface PolyominoEnumerationPageProps {
  n: number;
}

export function PolyominoEnumerationPage({ n }: PolyominoEnumerationPageProps) {
  return <PolyominoEnumeration n={n} />;
}
