import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Layout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
