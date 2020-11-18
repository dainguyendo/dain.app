import React from "react";

interface ContextType {
  selected: number | null;
  select: (v: number | null) => void;
}

const SelectedTrackContext = React.createContext<ContextType>({
  selected: null,
  select: () => {},
});

export const SelectedTrackProvider: React.FC = ({ children }) => {
  const [selectedTrack, selectTrack] = React.useState<number | null>(null);

  const select = (v: number | null) => selectTrack(v);

  return (
    <SelectedTrackContext.Provider
      value={{
        selected: selectedTrack,
        select,
      }}
    >
      {children}
    </SelectedTrackContext.Provider>
  );
};

export const useSelectedTrack = () => React.useContext(SelectedTrackContext);
