import React from "react";

interface ContextType {
  preview: boolean;
  toggle: () => void;
}

const PlayPreviewContext = React.createContext<ContextType>({
  preview: false,
  toggle: () => {},
});

export const PlayPreviewProvider: React.FC = ({ children }) => {
  const [previewEnabled, setEnabled] = React.useState(false);

  const toggle = () => setEnabled(!previewEnabled);

  return (
    <PlayPreviewContext.Provider
      value={{
        preview: previewEnabled,
        toggle,
      }}
    >
      {children}
    </PlayPreviewContext.Provider>
  );
};

export const usePlayPreview = () => React.useContext(PlayPreviewContext);
