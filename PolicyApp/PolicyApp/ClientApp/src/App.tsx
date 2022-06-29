import React from "react";
import AppLayout from "./layouts/AppLayout/AppLayout";
import Policies from "./pages/Policies/Policies";
import "./App.scss";

const App: React.FC = () => {
  return <AppLayout>
    <Policies />
  </AppLayout>;
};

export default App;
