import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Reset from "./Pages/Reset";
import Login from "./Pages/Login";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ResetLink from "./Pages/ResetLink";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import KIIT from "./Components/Forms/KIIT";
import KIMS from "./Components/Forms/KIMS";
import Hospitality from "./Components/Forms/Hospitality";

import Forms from "./Components/Forms";

import Verify from "./Pages/Verify";

function App() {
  return (
    <div className="">
      <Header />
      <div className="">
        <Routes>
          {/* Public Routes Here */}
          <Route path="/">
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/reset/:id" element={<ResetLink />} />

            <Route path="/forms" element={<Forms />}>
              <Route path="kiit" element={<KIIT />} />
              <Route path="kims" element={<KIMS />} />
              <Route path="hospitality" element={<Hospitality />} />
            </Route>

          </Route>
          {/* Private Routes Here */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/verify" element={<Verify />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
