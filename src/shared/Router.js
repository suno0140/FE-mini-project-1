import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Posting from "../pages/Posting";
import Signup from "../pages/Signup";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Layout from "./Layout";
import NotFound from "../pages/NotFound";
import Modify from "../pages/Modify";
import KakaoLogin from "../pages/KakaoLogin";


function Router() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posting" element={<Posting />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/modify/:id" element={<Modify />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/kakao" element={<KakaoLogin />} />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default Router;
