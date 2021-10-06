import { Text } from "./Text";

interface Props {
  size: 1 | 2 | 3 | 4 | 5 | 6;
}
export const Heading: React.FC<Props> = ({ size, children }) => {
  switch (size) {
    case 1:
      return (
        <h1>
          <Text lineHeight="heading" fontFamily="heading" fontSize={5}>
            {children}
          </Text>
        </h1>
      );
    case 2:
      return (
        <h2>
          <Text lineHeight="heading" fontFamily="heading" fontSize={4}>
            {children}
          </Text>
        </h2>
      );
    case 3:
      return (
        <h3>
          <Text lineHeight="heading" fontFamily="heading" fontSize={3}>
            {children}
          </Text>
        </h3>
      );
    case 4:
      return (
        <h4>
          <Text lineHeight="heading" fontFamily="heading" fontSize={2}>
            {children}
          </Text>
        </h4>
      );
    case 5:
      return (
        <h5>
          <Text lineHeight="heading" fontFamily="heading" fontSize={1}>
            {children}
          </Text>
        </h5>
      );
    case 6:
      return (
        <h6>
          <Text lineHeight="heading" fontFamily="heading" fontSize={1}>
            {children}
          </Text>
        </h6>
      );
  }
};
