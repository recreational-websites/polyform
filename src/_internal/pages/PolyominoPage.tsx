"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { memo, ReactNode, useCallback, useEffect, useState } from "react";
import { Comment } from "../components/Comment";
import { Editor } from "../components/Editor";
import { Polyomino } from "../components/Polyomino";
import { Coord } from "../lib/common/Coord";
import { on } from "../lib/on";
import { encode } from "../lib/p4m-s/e/encode";
import { moreInfo } from "../lib/p4m-s/e/moreInfo";
import { Polyomino as PolyominoType } from "../lib/p4m-s/e/Polyomino";
import { relatedPolyominoes } from "../lib/p4m-s/e/relatedPolyominoes";
import { SymmetryGroup } from "../lib/p4m-s/e/SymmetryGroup";

export interface PolyominoPageProps {
  moreInfo: ReturnType<typeof moreInfo>;
}

const gridClassName =
  "grid grid-cols-4 tablet:grid-cols-6 desktop:grid-cols-5 tablet:group-[.side-pane]:grid-cols-2 desktop:group-[.closed]:grid-cols-8 desktop:group-[.closed_.side-pane]:grid-cols-2 gap-4";

const moreInfoIndexToName = [
  "90°",
  "180°",
  "270°",
  "transpose",
  "flip X",
  "flip diagonally",
  "flip Y",
];

interface PolyominoCardProps {
  polyomino: PolyominoType;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
}

function PolyominoCard({ polyomino, label, onClick }: PolyominoCardProps) {
  return (
    <div className="flex flex-col items-center">
      <Polyomino
        onClick={onClick}
        polyomino={polyomino}
        width={100}
        height={100}
      />
      <Badge variant="secondary" className="mt-2">
        {label}
      </Badge>
    </div>
  );
}

interface RelatedProps extends PolyominoPageProps {
  onPolyominoClick?: (polyomino: PolyominoType) => void;
}

function RelatedInternal({ moreInfo, onPolyominoClick }: RelatedProps) {
  const { symmetry, subtractive, additive } = relatedPolyominoes(moreInfo);

  const handlePolyominoClick = useCallback(
    (e: React.MouseEvent, polyomino: PolyominoType) => {
      e.preventDefault();
      e.stopPropagation();
      onPolyominoClick?.(polyomino);
    },
    [onPolyominoClick]
  );

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Related Polyominoes</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="symmetry">Symmetry</TabsTrigger>
            <TabsTrigger value="subtractive">Subtractive</TabsTrigger>
            <TabsTrigger value="additive">Additive</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className={gridClassName}>
              {symmetry.map((polyomino) => (
                <PolyominoCard
                  key={polyomino[1]}
                  polyomino={polyomino}
                  label={moreInfoIndexToName[moreInfo.indexOf(polyomino) - 2]}
                  onClick={(e) => handlePolyominoClick(e, polyomino)}
                />
              ))}
              {subtractive.map((polyomino) => (
                <PolyominoCard
                  key={polyomino[1]}
                  polyomino={polyomino}
                  label="Subtractive"
                  onClick={(e) => handlePolyominoClick(e, polyomino)}
                />
              ))}
              {additive.map((polyomino) => (
                <PolyominoCard
                  key={polyomino[1]}
                  polyomino={polyomino}
                  label="Additive"
                  onClick={(e) => handlePolyominoClick(e, polyomino)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="symmetry">
            {!symmetry.length ? (
              <div className="text-muted-foreground">
                No symmetry polyominoes.
              </div>
            ) : (
              <div className={gridClassName}>
                {symmetry.map((polyomino) => (
                  <PolyominoCard
                    key={polyomino[1]}
                    polyomino={polyomino}
                    label={moreInfoIndexToName[moreInfo.indexOf(polyomino) - 2]}
                    onClick={(e) => handlePolyominoClick(e, polyomino)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="subtractive">
            {!subtractive.length ? (
              <div className="text-muted-foreground">
                No subtractive polyominoes.
              </div>
            ) : (
              <div className={gridClassName}>
                {subtractive.map((polyomino) => (
                  <PolyominoCard
                    key={polyomino[1]}
                    polyomino={polyomino}
                    label="Subtractive"
                    onClick={(e) => handlePolyominoClick(e, polyomino)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="additive">
            <div className={gridClassName}>
              {additive.map((polyomino) => (
                <PolyominoCard
                  key={polyomino[1]}
                  polyomino={polyomino}
                  label="Additive"
                  onClick={(e) => handlePolyominoClick(e, polyomino)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

const Related = dynamic(() => Promise.resolve(memo(RelatedInternal)), {
  ssr: false,
});

interface SidePaneProps {
  polyomino: PolyominoType;
  onClose: () => void;
  onPolyominoClick: (polyomino: PolyominoType) => void;
  isOpen: boolean;
}

function SidePane({
  polyomino,
  onClose,
  onPolyominoClick,
  isOpen,
}: SidePaneProps) {
  useEffect(() => {
    return on(document, "keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    });
  }, [isOpen, onClose]);

  return (
    <div
      className={`group side-pane fixed desktop:relative inset-y-0 right-0 w-full tablet:w-96 desktop:w-1/3 bg-background shadow-lg p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
        isOpen
          ? "translate-x-0"
          : "translate-x-full desktop:translate-x-0 desktop:hidden"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Polyomino {polyomino[1]}</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close side pane"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Polyomino polyomino={polyomino} width="100%" height="200px" />
      <Link href={`/${encode(polyomino[0])}`}>
        <Button className="mt-4 w-full">Open in Full Page</Button>
      </Link>
      <Related
        moreInfo={moreInfo(polyomino)}
        onPolyominoClick={onPolyominoClick}
      />
    </div>
  );
}

interface BadgesProps {
  polyomino: Coord[];
  symmetryGroup: SymmetryGroup;
}

function Badges({ polyomino, symmetryGroup }: BadgesProps) {
  return (
    <div className="flex flex-wrap gap-x-4">
      <Badge className="mt-4">Symmetry Group: {symmetryGroup}</Badge>
      <Badge className="mt-4">Tile count: {polyomino.length}</Badge>
      {[
        "All",
        "Rotation2FoldMirror90",
        "Rotation2FoldMirror45",
        "Rotation2Fold",
      ].includes(symmetryGroup) && (
        <Badge className="mt-4">Rotation 2 Fold</Badge>
      )}
      {["All", "Rotation4Fold"].includes(symmetryGroup) && (
        <Badge className="mt-4">Rotation 4 Fold</Badge>
      )}
      {["All", "Rotation2FoldMirror90", "Mirror90"].includes(symmetryGroup) && (
        <Badge className="mt-4">Mirror 90°</Badge>
      )}
      {["All", "Rotation2FoldMirror45", "Mirror45"].includes(symmetryGroup) && (
        <Badge className="mt-4">Mirror 45°</Badge>
      )}
    </div>
  );
}

export function PolyominoPage({ moreInfo }: PolyominoPageProps): ReactNode {
  const [symmetryGroup, polyomino] = moreInfo;
  const [sidePaneOpened, setSidePaneOpened] = useState(false);
  const [sidePanePolyomino, setSidePanePolyomino] = useState<PolyominoType>(
    moreInfo[1]
  );

  const handlePolyominoClick = useCallback(
    (clickedPolyomino: PolyominoType) => {
      setSidePanePolyomino(clickedPolyomino);
      setSidePaneOpened(true);
    },
    []
  );

  const handleCloseSidePane = useCallback(() => {
    setSidePaneOpened(false);
  }, []);

  return (
    <div
      className={`${
        sidePaneOpened ? "opened" : "closed"
      } group container mx-auto p-4 desktop:flex desktop:gap-6`}
    >
      <div className="desktop:flex-1">
        <Card>
          <CardHeader>
            <h1 className="text-3xl font-bold">Polyomino {polyomino[1]}</h1>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <Polyomino polyomino={polyomino} width="40vw" height="40vw" />
              <Badges polyomino={polyomino[0]} symmetryGroup={symmetryGroup} />
            </div>
          </CardContent>
        </Card>
        <Related moreInfo={moreInfo} onPolyominoClick={handlePolyominoClick} />
        <Editor initialPolyomino={polyomino[0]} />
        <Comment name={polyomino[1]} />
      </div>
      {sidePaneOpened && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 desktop:hidden"
          onClick={handleCloseSidePane}
          aria-hidden="true"
        />
      )}
      <SidePane
        polyomino={sidePanePolyomino}
        onClose={handleCloseSidePane}
        onPolyominoClick={handlePolyominoClick}
        isOpen={sidePaneOpened}
      />
    </div>
  );
}
