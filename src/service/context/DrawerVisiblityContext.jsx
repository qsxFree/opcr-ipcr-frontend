import React from "react";

const DrawerVisiblityContext = React.createContext({
  add: { visible: false, set: null },
  edit: { visible: false, set: null },
  view: { visible: false, set: null },
});

export const DrawerVisiblityProvider = DrawerVisiblityContext.Provider;

export default DrawerVisiblityContext;
