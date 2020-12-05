import { motion } from "framer-motion";
import { getAllPosts } from "../../blog/api";
import { StandardLayout } from "../../layout/StandardLayout";
import { PostPreview } from "../../ui/PostPreview";
import { VerticalStack } from "../../ui/VerticalStack";

interface Props {
  allPosts: ReturnType<typeof getAllPosts>;
}

export default function Index({ allPosts }: Props) {
  return (
    <StandardLayout title="words">
      <motion.section>
        <VerticalStack space={4}>
          {allPosts.length > 0 &&
            allPosts.map((post) => {
              return (
                <motion.div key={post.title}>
                  <PostPreview
                    title={post.title}
                    slug={post.slug}
                    description={post.description}
                  />
                </motion.div>
              );
            })}
        </VerticalStack>
      </motion.section>
    </StandardLayout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(["title", "date", "slug", "description"]);
  return {
    props: {
      allPosts,
    },
  };
}
