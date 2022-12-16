import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Posting from "../pages/Posting";
import Signup from "../pages/Signup";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Layout from "./Layout";


function Router() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posting" element={<Posting />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default Router;
