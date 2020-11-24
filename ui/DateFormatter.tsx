import { parseISO, format } from "date-fns";

interface Props {
  dateString: string;
}

export const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
};
