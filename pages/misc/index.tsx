import Link from "next/link";
import styled from "styled-components";
import { StandardLayout } from "../../layout/StandardLayout";
import { Text } from "../../ui/Text";
import { VerticalStack } from "../../ui/VerticalStack";

const Card = styled.div`
  border-radius: 4px;
  padding: ${(props) => props.theme.spacing[2]};
`;

function MiscPage() {
  return (
    <StandardLayout title="Misc">
      <Card>
        <VerticalStack space={0}>
          <Link href="/misc/track-waveform">
            <a>
              <Text
                fontWeight="bold"
                fontFamily="heading"
                lineHeight="heading"
                fontSize={2}
              >
                track-waveform
              </Text>
            </a>
          </Link>
          <Text>Create waveforms from Spotify tracks and visualize in 3D.</Text>
        </VerticalStack>
      </Card>
      <Card>
        <VerticalStack space={0}>
          <Link href="/misc/affixed">
            <a>
              <Text
                fontWeight="bold"
                fontFamily="heading"
                lineHeight="heading"
                fontSize={2}
              >
                affixed
              </Text>
            </a>
          </Link>
          <Text>Two wheels, feet fastened, and ready to ride.</Text>
        </VerticalStack>
      </Card>
    </StandardLayout>
  );
}

export default MiscPage;
