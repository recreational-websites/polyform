import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Comment } from "../components/Comment";
import { Item } from "../components/Item";
import { canonizeFree as canonizeFreeE } from "../lib/E/canonizeFree";
import { decode as decodeEE } from "../lib/E/e/decode";
import { renderToSvg as renderToSvgE } from "../lib/E/renderToSvg";
import { decode as decodeEV } from "../lib/E/v/decode";
import { decode as decodeH } from "../lib/H/decode";
import { renderToSvg as renderToSvgH } from "../lib/H/renderToSvg";
import { canonizeFree as canonizeFreeS } from "../lib/s/canonizeFree";
import { decode as decodeSE } from "../lib/s/e/decode";
import { renderToSvg as renderToSvgS } from "../lib/s/renderToSvg";
import { decode as decodeSV } from "../lib/s/v/decode";
import { EMPTY } from "../lib/util/EMPTY";

export function MainPage() {
  return (
    <div className="container mx-auto p-4 desktop:flex desktop:gap-6">
      <div className="desktop:flex-1">
        <Card>
          <CardHeader>
            <h1 className="text-3xl font-bold">Polyforms</h1>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <Item
                  canonizeFree={canonizeFreeS}
                  info={[decodeSE("NWB"), "NWB"]}
                  renderToSvg={renderToSvgS}
                  renderToSvgOptions={EMPTY}
                  type="s-e"
                  width="100%"
                  height="fit-content"
                />
                s-e (Polyomino)
              </div>
              <div className="flex flex-col items-center">
                <Item
                  canonizeFree={canonizeFreeS}
                  info={[decodeSV("hE0c"), "hE0c"]}
                  renderToSvg={renderToSvgS}
                  renderToSvgOptions={EMPTY}
                  type="s-v"
                  width="100%"
                  height="fit-content"
                />
                s-v (Polyking)
              </div>
              <div className="flex flex-col items-center">
                <Item
                  canonizeFree={canonizeFreeS}
                  info={[decodeH("9o"), "9o"]}
                  renderToSvg={renderToSvgH}
                  renderToSvgOptions={EMPTY}
                  type="H"
                  width="100%"
                  height="fit-content"
                />
                H (Polyhex)
              </div>
              <div className="flex flex-col items-center">
                <Item
                  canonizeFree={canonizeFreeE}
                  info={[decodeEE("bJq"), "bJq"]}
                  renderToSvg={renderToSvgE}
                  renderToSvgOptions={EMPTY}
                  type="E-e"
                  width="100%"
                  height="fit-content"
                />
                E-e (Polyiamond)
              </div>
              <div className="flex flex-col items-center">
                <Item
                  canonizeFree={canonizeFreeE}
                  info={[decodeEV("0wm"), "0wm"]}
                  renderToSvg={renderToSvgE}
                  renderToSvgOptions={EMPTY}
                  type="E-v"
                  width="100%"
                  height="fit-content"
                />
                E-v
              </div>
            </div>
          </CardContent>
        </Card>
        <Comment term="MainPage" />
      </div>
    </div>
  );
}
