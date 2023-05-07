import { getTrack } from "@/spotify";
import Modal from "@/ui/Modal";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params: { id: trackId } }: Props) {
  // const photos = swagPhotos;
  // const photo = photoId && photos.find((p) => p.id === photoId);

  const track = await getTrack(trackId);

  console.log({ track });

  return (
    <Modal>
      <h1>Tracks modal</h1>
      {trackId}
    </Modal>
  );
}
