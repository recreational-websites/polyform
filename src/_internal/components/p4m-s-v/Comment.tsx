"use client";

import { useContext } from "react";

import { ModeContext } from "@-ft/mode-next";
import Giscus from "@giscus/react";

export interface CommentProps {
  name: string;
}

export function Comment({ name }: CommentProps) {
  const { theme } = useContext(ModeContext);
  const term = `p4m-s-v-${name}`;
  return (
    <Giscus
      id="comments"
      repo="recreational-websites/polyform"
      repoId="R_kgDOMv7HeA"
      category="Announcements"
      categoryId="DIC_kwDOMv7HeM4CiYG7"
      mapping="specific"
      term={term}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme}
      lang="en"
      loading="lazy"
    />
  );
}
