import { useRouter } from "next/router";
import { getAllPosts, getPostBySlug } from "../../blog/api";
import markdownToHtml from "../../blog/markdownToHtml";
import { StandardLayout } from "../../layout/StandardLayout";
import PostType from "../../types/post";
import { DateFormatter } from "../../ui/DateFormatter";
import { LoadingSphere } from "../../ui/LoadingSphere";
import { Text } from "../../ui/Text";
import { VerticalStack } from "../../ui/VerticalStack";
import postStyles from "../../ui/post.module.css";
import { motion } from "framer-motion";

type Params = {
  params: {
    slug: string;
  };
};

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, ["title", "date", "slug", "content"]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      };
    }),
    fallback: false,
  };
}

const Post = ({ post }: Props) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    router.push("/404");
  }

  return (
    <StandardLayout title={post.title}>
      {Boolean(router.isFallback) ? (
        <LoadingSphere />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <VerticalStack space={3}>
            <VerticalStack space={1}>
              <Text fontSize={4} lineHeight="heading" fontWeight="bold">
                {post.title}
              </Text>
              <Text color="grey700">
                <DateFormatter dateString={post.date} />
              </Text>
            </VerticalStack>

            <div
              className={postStyles["post"]}
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </VerticalStack>
        </motion.div>
      )}
    </StandardLayout>
  );
};
export default Post;
