import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//api
import { signIn, signUp } from "../api/user";
//store
import { setUser } from "../store/slices/userSlice";
import { setShowSuccessAlert } from "../store/slices/alertSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAlreadyAccount, setIsAlreadyAccount] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const body = {
        name,
        password,
      };
      const {
        data: { data, success },
      } = isAlreadyAccount ? await signIn(body) : await signUp(body);
      if (success) {
        dispatch(setUser(data));
        dispatch(
          setShowSuccessAlert({
            isShowAlert: true,
            successMessage: isAlreadyAccount
              ? "SignIn Success!"
              : "SignUp Success!",
            alertType: "success",
          })
        );
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {isAlreadyAccount ? "Sign In" : "Sign Up"}
        </h2>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  User Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="off"
                    className="appearance-none block w-full px-3 py-2 border border-main-black-opacity bg-main-black-opacity rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-main-pink focus:border-main-pink sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="off"
                    className="appearance-none block w-full px-3 py-2 border border-main-black-opacity bg-main-black-opacity rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-main-pink focus:border-main-pink sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-main-pink border-main-black-opacity bg-main-black-opacity rounded focus:ring-0 focus:outline-none"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-white"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => setIsAlreadyAccount((prev) => !prev)}
                    className="font-medium text-main-pink hover:text-main-pink-hover"
                  >
                    {isAlreadyAccount ? "Sign Up" : "Sign In"}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-main-pink hover:bg-main-pink-hover focus:outline-none focus:ring-0"
                >
                  {isAlreadyAccount ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
