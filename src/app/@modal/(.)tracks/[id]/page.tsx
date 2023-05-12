import { formatToSimplifiedTrack, getTrack } from "@/spotify";
import Modal from "@/ui/Modal";
import TracksModal from "./TracksModal";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params: { id: trackId } }: Props) {
  const data = await getTrack(trackId);
  const track = formatToSimplifiedTrack(data);

  return (
    <Modal>
      <TracksModal track={track} />
    </Modal>
  );
}
