import * as React from "react";

type Props = React.CSSProperties;

export const Row: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div
      className="row"
      style={{
        ...props,
        display: "flex",
        flexDirection: "row",
      }}
    >
      {children}
    </div>
  );
};
