import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import { Text } from "../../ui/Text";
import { Heading } from "../../ui/Heading";

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
        <Heading size={4} key={block.id}>
          {block.heading_1.text.map(renderText)}
        </Heading>
      );
    case "heading_2":
      return (
        <Heading size={5} key={block.id}>
          {block.heading_2.text.map(renderText)}
        </Heading>
      );
    case "heading_3":
      return (
        <Heading size={6} key={block.id}>
          {block.heading_3.text.map(renderText)}
        </Heading>
      );
    case "paragraph":
      return (
        <p key={block.id}>
          <Text>{block.paragraph.text.map(renderText)}</Text>
        </p>
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
