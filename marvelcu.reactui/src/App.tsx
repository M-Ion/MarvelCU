/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import ActorsPage from "./pages/actors.page";
import Header from "./components/header/header.component";
import HeroesPage from "./pages/heroes.page";
import LoginPage from "./pages/login.page";
import MoviesPage from "./pages/movies.page";
import NewsPage from "./pages/news.page";
import SignUpPage from "./pages/signUp.page";
import theme from "./themes/main.theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="*" element={<Navigate to="/login" replace />}></Route>
            {/* <Route path="/actors" element={<ActorsPage />} /> */}
            {/* <Route path="/heroes" element={<HeroesPage />} /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            {/* <Route path="/news" element={<NewsPage />} /> */}
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
