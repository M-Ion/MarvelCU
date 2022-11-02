/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

// import NewsPage from "./pages/news.page";
import { selectCredentials } from "./store/reducers/user.slice";
import { setCredentials } from "./store/reducers/user.slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ActorsPage from "./pages/actors.page";
import authService from "./services/auth.service";
import Header from "./components/header/header.component";
import HeroesPage from "./pages/heroes.page";
import LoginPage from "./pages/login.page";
import MovieEntityPage from "./pages/movieEntity/movieEntity.page";
import MoviesPage from "./pages/movies.page";
import ProfilePage from "./pages/profile/profile.page";
import SignUpPage from "./pages/signUp.page";
import theme from "./themes/main.theme";
import HeroEntityPage from "./pages/heroEntity/heroEntity.page";
import ActorEntityPage from "./pages/actorEntity/actorEntity.component";

function App() {
  const dispatch = useDispatch();

  const [checkCookies] = authService.useCheckAuthCookiesMutation(undefined);
  const [checkUser] = authService.useCheckUserMutation();

  useEffect(() => {
    // Check http only cookies
    checkCookies(undefined)
      .unwrap()
      .then((cookies) => {
        dispatch(setCredentials({ token: cookies.token, user: null }));

        // Retrieve user data by jwt from http only cookie
        checkUser(undefined)
          .unwrap()
          .then((user) => {
            dispatch(setCredentials({ token: cookies.token, user }));
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/actors" element={<ActorsPage />} />
            <Route path="/heroes" element={<HeroesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieEntityPage />} />
            <Route path="/heroes/:heroId" element={<HeroEntityPage />} />
            <Route path="/actors/:actorId" element={<ActorEntityPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* <Route path="/news" element={<NewsPage />} /> */}
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<Navigate to="/login" replace />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
