import { formatToSimplifiedTrack, getTrack } from "@/spotify";
import Modal from "@/ui/Modal";
import { RecordSpinning } from "@/ui/RecordSpinning";
import TracksModal from "./TracksModal";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params: { id: trackId } }: Props) {
  // const photos = swagPhotos;
  // const photo = photoId && photos.find((p) => p.id === photoId);

  const data = await getTrack(trackId);
  const track = formatToSimplifiedTrack(data);

  console.log({ track });

  return (
    <Modal>
      <TracksModal track={track} />
    </Modal>
  );
}
