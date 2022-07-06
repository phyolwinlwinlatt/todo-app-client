import { Routes as RoutesConfig, Route } from "react-router-dom";
//pages
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";

export default function Routes() {
  return (
    <RoutesConfig>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
    </RoutesConfig>
  );
}
