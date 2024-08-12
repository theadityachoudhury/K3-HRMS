import { Navigate } from "react-router-dom";
import { useUserContext } from "../Hooks/useUserContext";
import Loader from "../Components/Loader";

const Home = () => {
  const { authenticated, isLoggedIn, ready, user } = useUserContext();
  console.log("Home", authenticated, isLoggedIn, ready, user);
  if (!authenticated && !isLoggedIn()) {
    return <Navigate
      to={`/login`}
    />;
  } else {
    if (!ready) {
      return <Loader size={48} fullScreen={true} />;
    }
    if (ready && user && !user.verified) {
      if (window.location.pathname != "/verify")
        return <Navigate to={`/verify?callback=/`} />;
    }
    if (ready && user && user.verified) {
      return <Navigate to={`/dashboard`} />
    }
  }
};

export default Home;
