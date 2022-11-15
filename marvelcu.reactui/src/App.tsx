import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { setCredentials } from "./store/reducers/user.slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ActorEntityPage from "./pages/actorEntity.component";
import ActorsPage from "./pages/actors.page";
import authService from "./services/auth.service";
import CheckoutPage from "./pages/checkout/checkout.page";
import Header from "./components/header/header.component";
import HeroEntityPage from "./pages/heroEntity.page";
import HeroesPage from "./pages/heroes.page";
import LoginPage from "./pages/login.page";
import MovieEntityPage from "./pages/movieEntity.page";
import MoviesPage from "./pages/movies.page";
import NewsPage from "./pages/news.page";
import ProfilePage from "./pages/profile.page";
import SignUpPage from "./pages/signUp.page";
import theme from "./themes/main.theme";
import AlertBar from "./components/alertBar/alertBar.component";
import AdminPage from "./pages/admin.page";

function App() {
  const dispatch = useDispatch();
  const [checkCurrentUser, { data }] =
    authService.useCheckUserSessionMutation();
  const [checkCookies] = authService.useCheckCookiesTokensMutation();

  const checkUserSession = async () => {
    const cookies = await checkCookies().unwrap();
    if (cookies.token) {
      dispatch(setCredentials({ user: null, token: cookies.token }));
    }
    await checkCurrentUser();
  };

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <AlertBar />
          <Header />
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/actors" element={<ActorsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/heroes" element={<HeroesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieEntityPage />} />
            <Route path="/heroes/:heroId" element={<HeroEntityPage />} />
            <Route path="/actors/:actorId" element={<ActorEntityPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="*"
              element={<Navigate to={"/movies"} replace />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
