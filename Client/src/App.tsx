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

import Forms from "./Components/Forms";

import Verify from "./Pages/Verify";
import Kiit from "./Pages/Kiit";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div className="">
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            {/* Public Routes Here */}
            <Route path="/">
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/reset/:id" element={<ResetLink />} />

              <Route path="/forms" element={<Forms />}>
                <Route path="kiit" element={<Kiit />} />
              </Route>

            </Route>
            {/* Private Routes Here */}
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/verify" element={<Verify />} />
            </Route>

            {/* Not found route */}
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
