import * as React from "react";

type Props = React.CSSProperties;

export const Grid: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div
      className="grid"
      style={{
        ...props,
        display: "grid",
      }}
    >
      {children}
    </div>
  );
};
