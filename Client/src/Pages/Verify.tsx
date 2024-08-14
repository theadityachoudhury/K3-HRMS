import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import { useState } from "react";
import PageMeta from "../Utils/pageMeta";
import config from "../Config";

const Verify = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="resetContainer">
      <PageMeta title={`${config.APP_NAME} | Verification`} description={`${config.APP_NAME} | Identity Verification Page`} />

      <div className="space-y-10 w-full">
        <div className="space-y-1">
          <div className="text-3xl font-semibold">
            Recover your <span className="font-bold">Learnly.</span> account
          </div>
          <p className="text-xl text-center">
            To continue your learning journey
          </p>
        </div>

        <div className="space-y-5 mx-5 sm:max-w-lg lg:max-w-lg sm:mx-auto">
          {/* <!-- Email Sign in --> */}
          <form className="space-y-5">
            {/* Email/Username */}
            <div className="">
              <div className="flex flex-col text-left space-y-2">
                <label htmlFor="email-username" className="text-lg">
                  Email/Username
                </label>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                className="w-full p-3 bg-white text-black text-xl"
                type="submit"
              >
                {loading ? <Loader size={28} /> : "Recover account"}
              </button>
            </div>

            {/* <!-- Register --> */}
            <div className="text-center text-lg">
              Remembered you password?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify;
