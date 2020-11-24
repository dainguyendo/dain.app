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
      <section>
        <VerticalStack space={4}>
          {allPosts.length > 0 &&
            allPosts.map((post, idx) => {
              return (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: idx * 0.05,
                  }}
                >
                  <PostPreview
                    title={post.title}
                    slug={post.slug}
                    description={post.description}
                  />
                </motion.div>
              );
            })}
        </VerticalStack>
      </section>
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
