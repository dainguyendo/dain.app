import * as React from "react";

type Props = React.CSSProperties & {
  id?: string;
};

export const Grid: React.FC<Props> = ({ children, id, ...props }) => {
  return (
    <div
      id={id}
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
