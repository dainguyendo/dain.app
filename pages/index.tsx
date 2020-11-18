import Image from "next/image";
import styled from "styled-components";
import { Grid } from "../libs/ui/Grid";
import { StandardLayout } from "../libs/ui/layout/StandardLayout";
import { Text } from "../libs/ui/Text";
import { VerticalStack } from "../libs/ui/VerticalStack";

const ProfileImage = styled(Image)`
  clip-path: circle(35%);
`;

const IndexPage = () => {
  return (
    <StandardLayout title="Dai - Home">
      <Grid gridTemplateColumns="1fr 2fr">
        <ProfileImage
          src="/me.png"
          alt="Dai Nguyendo"
          width={225}
          height={150}
        />
        <VerticalStack space={1} style={{ justifyContent: "center" }}>
          <Text fontSize={2} fontWeight="bold">
            ¯\_(ツ)_/¯
          </Text>
        </VerticalStack>
      </Grid>
    </StandardLayout>
  );
};

export default IndexPage;
