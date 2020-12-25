import styled from "styled-components";

const Pill = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.grey900};
  border-radius: 8px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  min-width: 50px;
  padding: ${(props) => `${props.theme.spacing[0]} ${props.theme.spacing[2]}`};
`;
export default Pill;
