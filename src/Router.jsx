import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import NotFound from "./pages/NotFound";
import Layout from "./component/Layout";
import Favorites from "./component/Favorites";
import Main from "./pages/Main";
import { getLoggedInUser } from "./utils/useAccount";

export const ROUTES = {
  home: "/",
  search: "search/:movieTitle",
  favorite: "favorites",
  login: "/login",
  createAccount: "/account/create",
};

const LOGGED_IN_ROUTER = [
  <Route key={1} path={ROUTES.login} element={<Login />} />,
  <Route key={2} path={ROUTES.createAccount} element={<CreateAccount />} />,
];

export default function Router() {
  const isLoggedIn = getLoggedInUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<Layout />}>
          <Route index element={<Main />} />
          <Route path={ROUTES.search} element={<p>search components</p>} />
          <Route path={ROUTES.favorite} element={<Favorites />} />
        </Route>
        {!isLoggedIn && LOGGED_IN_ROUTER}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
