"use client";

import { Comment } from "@/_internal/components/Comment";
import { Item } from "@/_internal/components/Item";
import { DefaultRenderOptions } from "@/_internal/lib/common/defaultRenderOptions";
import { related } from "@/_internal/lib/common/related";
import { EMPTY } from "@/_internal/lib/util/EMPTY";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ComponentType,
  createContext,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Coord } from "../../lib/common/Coord";
import { Info } from "../../lib/common/Info";
import { on } from "../../lib/on";

export interface PageProps {
  moreInfo: [symmetryGroup: string, canonized: Info, ...symmetries: Info[]];
  moreInfoIndexToName: string[];
  canonizeFree: (normalized: Coord[]) => Coord[];
  directions: (coord: Coord) => Coord[];
  normalize: (coords: Coord[]) => Coord[];
  renderToSvg: (
    coords: Coord[],
    options: DefaultRenderOptions & Partial<Record<"contain", [number, number]>>
  ) => string;
  encode: (coords: Coord[]) => string;
  getMoreInfo: (
    info: Info
  ) => [symmetryGroup: string, canonized: Info, ...symmetries: Info[]];
  type: string;
  badges: (symmetryGroup: string) => string[];
  description: string;
  Editor?: ComponentType<{ initialCoords: Coord[] }>;
}

const PageContext = createContext<PageProps>(undefined as unknown as PageProps);

const gridClassName =
  "grid grid-cols-4 tablet:grid-cols-6 desktop:grid-cols-5 tablet:group-[.side-pane]:grid-cols-2 desktop:group-[.closed]:grid-cols-8 desktop:group-[.closed_.side-pane]:grid-cols-2 gap-4";

interface ItemCardProps {
  info: Info;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
}

function ItemCard({ info, label, onClick }: ItemCardProps) {
  const { canonizeFree, renderToSvg, type } = useContext(PageContext);
  return (
    <div className="flex flex-col items-center">
      <Item
        canonizeFree={canonizeFree}
        renderToSvg={renderToSvg}
        renderToSvgOptions={EMPTY}
        type={type}
        onClick={onClick}
        info={info}
        width={100}
        height={100}
      />
      <Badge variant="secondary" className="mt-2">
        {label}
      </Badge>
    </div>
  );
}

interface RelatedProps {
  moreInfo: [symmetryGroup: string, canonized: Info, ...symmetries: Info[]];
  onItemClick?: (info: Info) => void;
}

function RelatedInternal({ moreInfo, onItemClick }: RelatedProps) {
  const { moreInfoIndexToName, directions, normalize, encode, description } =
    useContext(PageContext);

  const [_, info, ...others] = moreInfo;
  const { symmetry, subtractive, additive } = related(
    directions,
    normalize,
    encode,
    info,
    others
  );

  const handleItemClick = useCallback(
    (e: React.MouseEvent, info: Info) => {
      e.preventDefault();
      e.stopPropagation();
      onItemClick?.(info);
    },
    [onItemClick]
  );

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Related {description} items</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="symmetry">Symmetry</TabsTrigger>
            <TabsTrigger value="subtractive">Remove</TabsTrigger>
            <TabsTrigger value="additive">Add</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className={gridClassName}>
              {symmetry.map((item) => (
                <ItemCard
                  key={item[1]}
                  info={item}
                  label={moreInfoIndexToName[moreInfo.indexOf(item) - 2]}
                  onClick={(e) => handleItemClick(e, item)}
                />
              ))}
              {subtractive.map((item) => (
                <ItemCard
                  key={item[1]}
                  info={item}
                  label="Remove"
                  onClick={(e) => handleItemClick(e, item)}
                />
              ))}
              {additive.map((item) => (
                <ItemCard
                  key={item[1]}
                  info={item}
                  label="Add"
                  onClick={(e) => handleItemClick(e, item)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="symmetry">
            {!symmetry.length ? (
              <div className="text-muted-foreground">No symmetry items.</div>
            ) : (
              <div className={gridClassName}>
                {symmetry.map((item) => (
                  <ItemCard
                    key={item[1]}
                    info={item}
                    label={moreInfoIndexToName[moreInfo.indexOf(item) - 2]}
                    onClick={(e) => handleItemClick(e, item)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="subtractive">
            {!subtractive.length ? (
              <div className="text-muted-foreground">No remove items.</div>
            ) : (
              <div className={gridClassName}>
                {subtractive.map((item) => (
                  <ItemCard
                    key={item[1]}
                    info={item}
                    label="Remove"
                    onClick={(e) => handleItemClick(e, item)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="additive">
            <div className={gridClassName}>
              {additive.map((item) => (
                <ItemCard
                  key={item[1]}
                  info={item}
                  label="Add"
                  onClick={(e) => handleItemClick(e, item)}
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
  info: Info;
  onClose: () => void;
  onItemClick: (item: Info) => void;
  isOpen: boolean;
}

function SidePane({ info, onClose, onItemClick, isOpen }: SidePaneProps) {
  const {
    moreInfoIndexToName,
    canonizeFree,
    directions,
    normalize,
    renderToSvg,
    encode,
    getMoreInfo,
    type,
    description,
  } = useContext(PageContext);

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
        <h2 className="text-2xl font-bold">
          {description} {info[1]}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close side pane"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Item
        canonizeFree={canonizeFree}
        renderToSvg={renderToSvg}
        renderToSvgOptions={EMPTY}
        type={type}
        info={info}
        width="100%"
        height="200px"
      />
      <Link href={`/${type}/${encode(info[0])}`}>
        <Button className="mt-4 w-full">Open in Full Page</Button>
      </Link>
      <Related moreInfo={getMoreInfo(info)} onItemClick={onItemClick} />
    </div>
  );
}

interface BadgesProps {
  coords: Coord[];
  symmetryGroup: string;
}

function Badges({ coords, symmetryGroup }: BadgesProps) {
  const { badges } = useContext(PageContext);

  return (
    <div className="flex flex-wrap gap-x-4">
      <Badge className="mt-4">Symmetry Group: {symmetryGroup}</Badge>
      <Badge className="mt-4">Tile count: {coords.length}</Badge>
      {badges(symmetryGroup).map((badge) => (
        <Badge key={badge} className="mt-4">
          {badge}
        </Badge>
      ))}
    </div>
  );
}

export function PageInternal(): ReactNode {
  const {
    moreInfo,
    moreInfoIndexToName,
    canonizeFree,
    directions,
    encode,
    getMoreInfo,
    normalize,
    renderToSvg,
    type,
    badges,
    Editor,
    description,
  } = useContext(PageContext);
  const [symmetryGroup, coords] = moreInfo;
  const [sidePaneOpened, setSidePaneOpened] = useState(false);
  const [sidePaneItem, setSidePaneItem] = useState<Info>(moreInfo[1]);

  const handleItemClick = useCallback((clickedItem: Info) => {
    setSidePaneItem(clickedItem);
    setSidePaneOpened(true);
  }, []);

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
            <h1 className="text-3xl font-bold">
              {description} {coords[1]}
            </h1>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <Item
                canonizeFree={canonizeFree}
                renderToSvg={renderToSvg}
                renderToSvgOptions={EMPTY}
                type={type}
                info={coords}
                width="40vw"
                height="40vw"
              />
              <Badges coords={coords[0]} symmetryGroup={symmetryGroup} />
            </div>
          </CardContent>
        </Card>
        <Related moreInfo={moreInfo} onItemClick={handleItemClick} />
        {Editor && <Editor initialCoords={coords[0]} />}
        <Comment term={`${type}/${coords[1]}`} />
      </div>
      {sidePaneOpened && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 desktop:hidden"
          onClick={handleCloseSidePane}
          aria-hidden="true"
        />
      )}
      <SidePane
        info={sidePaneItem}
        onClose={handleCloseSidePane}
        onItemClick={handleItemClick}
        isOpen={sidePaneOpened}
      />
    </div>
  );
}

export function Page({
  moreInfo,
  moreInfoIndexToName,
  canonizeFree,
  directions,
  encode,
  getMoreInfo,
  normalize,
  renderToSvg,
  type,
  badges,
  Editor,
  description,
}: PageProps) {
  const value = useMemo(
    () => ({
      moreInfo,
      moreInfoIndexToName,
      canonizeFree,
      directions,
      encode,
      getMoreInfo,
      normalize,
      renderToSvg,
      type,
      badges,
      Editor,
      description,
    }),
    [
      moreInfo,
      moreInfoIndexToName,
      canonizeFree,
      directions,
      encode,
      getMoreInfo,
      normalize,
      renderToSvg,
      type,
      badges,
      Editor,
      description,
    ]
  );

  return (
    <PageContext.Provider value={value}>
      <PageInternal />
    </PageContext.Provider>
  );
}
