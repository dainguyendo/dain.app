import Image from "next/image";
import styled from "styled-components";
import { StandardLayout } from "../libs/ui/layout/StandardLayout";
import { Row } from "../libs/ui/Row";
import { VerticalStack } from "../libs/ui/VerticalStack";

const ProfileImage = styled(Image)`
  clip-path: circle(35%);
`;

const IndexPage = () => {
  return (
    <StandardLayout title="Home | Next.js + TypeScript Example">
      <Row alignItems="center" justifyContent="center">
        <ProfileImage
          src="/me.png"
          alt="Dai Nguyendo"
          width={300}
          height={200}
        />
        <VerticalStack space={3}>
          <h1>Hi, I'm Dai N.</h1>
          <p>Currently residing in Queens, New York City.</p>
        </VerticalStack>
      </Row>
    </StandardLayout>
  );
};

export default IndexPage;
