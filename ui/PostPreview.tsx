import Link from "next/link";
import { Anchor } from "./Anchor";
import { Text } from "./Text";
import { VerticalStack } from "./VerticalStack";

interface Props {
  title: string;
  slug: string;
  description?: string;
}

export const PostPreview: React.FC<Props> = ({ title, slug, description }) => {
  return (
    <VerticalStack space={1}>
      <Link passHref={true} as={`/words/${slug}`} href="/words/[slug]">
        <Anchor>
          <Text
            fontFamily="heading"
            fontSize={2}
            lineHeight="heading"
            fontWeight="bold"
          >
            {title}
          </Text>
        </Anchor>
      </Link>
      {description && <Text color="grey700">{description}</Text>}
    </VerticalStack>
  );
};
