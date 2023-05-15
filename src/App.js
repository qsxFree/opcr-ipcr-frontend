import { useSessionStorageState } from "ahooks";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.less";
import { UserProvider } from "./service/context/UserContext";
import GlobalRoute from "./ui/route/GlobalRoute";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useSessionStorageState("user");
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider value={{ user, set: setUser }}>
        <GlobalRoute />
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
