import {
  GetBlockResponse,
  GetPageResponse,
  ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints";
import * as React from "react";
import { StandardLayout } from "../layout/StandardLayout";
import Notion from "../packages/notion/client";
import { renderBlock } from "../packages/notion/renderer";
import { Heading } from "../packages/ui/Heading";
import { Text } from "../packages/ui/Text";

interface StaticProps {
  page: GetPageResponse;
  block: GetBlockResponse;
  content: ListBlockChildrenResponse;
}

export const getStaticProps = async () => {
  const page_id: string = process.env.NOTION_RESUME_PAGE_ID || "";

  if (!page_id) {
    throw new Error("Missing NOTION_RESUME_PAGE_ID environment variable");
  }

  const block = await Notion.blocks.retrieve({
    block_id: page_id,
  });

  const content = await Notion.blocks.children.list({
    block_id: block.id,
    page_size: 50,
  });

  return {
    props: {
      block,
      content,
    },
    revalidate: process.env.NODE_ENV === "production" ? 300 : false,
  };
};

export default function Resume({ block, content }: StaticProps) {
  return (
    <StandardLayout title="Resume">
      <Heading>Professional Experiences</Heading>
      <Text>
        <i>
          Last updated:{" "}
          <time dateTime={block.last_edited_time}>
            {new Date(block.last_edited_time).toLocaleString()}
          </time>
        </i>
      </Text>
      {content.results.map(renderBlock)}
    </StandardLayout>
  );
}
