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

// export const UserContext = createContext();
// const UserContextProvider = (props) => {
//   const [ user, setUser ] = useState({});
//   const storeUser = user => {
//       setUser({
//         userName: user.userName,
//       })
//   }
//   const logout = () => {
//     setUser({});
//   }
//   return (
//     <UserContext.Provider value={{ user,  storeUser }}>
//       {props.children}
//     </UserContext.Provider>
//   )
// }
// export default UserContextProvider;
