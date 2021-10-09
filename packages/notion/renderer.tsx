import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import { Heading } from "../ui/Heading";
import { Paragraph } from "../ui/Paragraph";
import { Text } from "../ui/Text";

type BlockObject = ListBlockChildrenResponse["results"][0];

function renderText(textObject: any) {
  if (textObject.href) {
    return <a href={textObject.href}>{textObject.plain_text}</a>;
  }
  return textObject.plain_text;
}

export function renderBlock(block: BlockObject) {
  switch (block.type) {
    case "heading_1":
      return (
        <Heading key={block.id} as="h1">
          {block.heading_1.text.map(renderText)}
        </Heading>
      );
    case "heading_2":
      return (
        <Heading key={block.id} as="h2">
          {block.heading_2.text.map(renderText)}
        </Heading>
      );
    case "heading_3":
      return (
        <Heading key={block.id} as="h3">
          {block.heading_3.text.map(renderText)}
        </Heading>
      );
    case "paragraph":
      return (
        <Paragraph key={block.id}>
          {block.paragraph.text.map(renderText)}
        </Paragraph>
      );
    case "bulleted_list_item": {
      return (
        <li key={block.id}>
          <Text>{block.bulleted_list_item.text.map(renderText)}</Text>
        </li>
      );
    }
    default: {
      console.warn(`Could not render ${block.type}`);
      return null;
    }
  }
}
