import React, { useEffect } from "react";
import "./App.css";
import authService from "./services/auth.service";
import { useDispatch } from "react-redux";
import { setAuthToken, setUser } from "./services/store/slices/user.slice";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import MoviesPage from "./pages/movies";
import ActorsPage from "./pages/actors";
import HeroesPage from "./pages/heroes";
import CheckoutPage from "./pages/checkout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import NotFoundPage from "./pages/notFound";
import ProfilePage from "./pages/profile";
import MoviePage from "./pages/movie";
import HeroPage from "./pages/hero";
import ActorPage from "./pages/actor";
import AdminPage from "./pages/admin";
import NewsPage from "./pages/news";
import FeedbackBar from "./components/feedbackBar";

// Components

const theme = createTheme({
  palette: {
    primary: {
      main: "#757575",
    },
    secondary: {
      main: "#d32f2f",
    },
    info: {
      main: "#0288d1",
    },
  },
  spacing: 4,
});

function App() {
  const dispatch = useDispatch();
  const [fetchUserSession, { data }] =
    authService.useFetchUserSessionMutation();
  const [fetchCookies] = authService.useFetchAuthCookiesMutation();

  const checkUserSession = async () => {
    const cookies = await fetchCookies().unwrap();

    if (cookies.token && cookies.refreshToken) {
      dispatch(setAuthToken(cookies.token));
      await fetchUserSession();
    }
  };

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) dispatch(setUser(data.user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <FeedbackBar />
          <Routes>
            <Route path="/" element={<Navigate to={"/movies"} replace />} />
            <Route path="/actors" element={<ActorsPage />} />
            <Route path="/actors/:id" element={<ActorPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/heroes" element={<HeroesPage />} />
            <Route path="/heroes/:id" element={<HeroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/notfound" element={<NotFoundPage />} />
            <Route path="/pay" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="*"
              element={<Navigate to={"/notfound"} replace />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
