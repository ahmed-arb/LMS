import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route exact path="/" element={<Layout />} />
      </Route>
    </Routes>
  );
}

export default App;
