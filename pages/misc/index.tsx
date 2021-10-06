import Link from "next/link";
import { StandardLayout } from "../../layout/StandardLayout";
import { Stack } from "../../packages/ui/Stack";
import { Text } from "../../packages/ui/Text";
import { styled } from "../../stitches.config";

const Card = styled("div", {
  borderRadius: "$1",
  p: "$2",
});

function MiscPage() {
  return (
    <StandardLayout title="Misc">
      <Card>
        <Stack space={1}>
          <Link href="/misc/track-waveform">
            <a>
              <Text>track-waveform</Text>
            </a>
          </Link>
          <Text>Create waveforms from Spotify tracks and visualize in 3D.</Text>
        </Stack>
      </Card>
      <Card>
        <Stack space={1}>
          <Link href="/misc/affixed">
            <a>
              <Text>affixed</Text>
            </a>
          </Link>
          <Text>Two wheels, feet fastened, and ready to ride.</Text>
        </Stack>
      </Card>
    </StandardLayout>
  );
}

export default MiscPage;
