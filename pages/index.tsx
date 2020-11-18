import Image from "next/image";
import styled from "styled-components";
import { StandardLayout } from "../layout/StandardLayout";
import { Grid } from "../ui/Grid";
import { Text } from "../ui/Text";
import { VerticalStack } from "../ui/VerticalStack";

const ProfileImage = styled(Image)`
  clip-path: circle(35%);
`;

export default function Home() {
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
}
