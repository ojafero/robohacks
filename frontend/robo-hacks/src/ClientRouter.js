import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
const ClientRouter = () => {
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/landing" element={<Landing />} />
  </Routes>;
};

export default ClientRouter;
