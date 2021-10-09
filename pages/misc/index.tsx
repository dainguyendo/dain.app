import NextLink from "next/link";
import { StandardLayout } from "../../layout/StandardLayout";
import { Card } from "../../packages/ui/Card";
import { Grid } from "../../packages/ui/Grid";
import { Heading } from "../../packages/ui/Heading";
import { Link } from "../../packages/ui/Link";
import { Paragraph } from "../../packages/ui/Paragraph";
import { Stack } from "../../packages/ui/Stack";

function MiscPage() {
  return (
    <StandardLayout title="Misc">
      <Grid gap="4">
        <NextLink href="/misc/track-waveform" passHref>
          <Link variant="empty" aria-labelledby="waveform-heading">
            <Card variant="ghost" css={{ p: "$4" }}>
              <Stack space={2}>
                <Heading id="waveform-heading">track-waveform</Heading>
                <Paragraph>
                  Visualization of a record audio buffer. Tracks are sourced
                  from Spotify and visualization is built with react-three-fiber
                  and threejs.
                </Paragraph>
              </Stack>
            </Card>
          </Link>
        </NextLink>
        <NextLink href="/misc/affixed" passHref>
          <Link variant="empty" aria-labelledby="affixed">
            <Card variant="ghost" css={{ p: "$4" }}>
              <Stack space={2}>
                <Heading id="affixed-heading">affixed</Heading>
                <Paragraph>
                  Map sharing some of my fixed track bike routes across
                  different cities. Built with mapbox-gl.
                </Paragraph>
              </Stack>
            </Card>
          </Link>
        </NextLink>
      </Grid>
    </StandardLayout>
  );
}

export default MiscPage;
