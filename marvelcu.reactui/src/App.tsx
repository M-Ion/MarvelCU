import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import theme from "./themes/main.theme";
import ActorsPage from "./pages/actors/actors.page";
import Header from "./components/header/header.component";
import HeroesPage from "./pages/heroes/heroes.page";
import LoginPage from "./pages/login/login.page";
import MoviesPage from "./pages/movies/movies.page";
import SignUpPage from "./pages/signUp/signUp.page";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="*" element={<Navigate to="/login" replace />}></Route>
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/heroes" element={<HeroesPage />} />
            <Route path="/actors" element={<ActorsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
