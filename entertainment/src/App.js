import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.css";
import MainComponent from "./component/home/MainComponent";
import Login from "./component/login-signin/Login";
import SignUp from "./component/login-signin/SignUp";
import Error from "./component/errorpage/Error";
import Movies from "../src/component/movies/Movies"; // Example movie component
import TVSeries from "../src/component/tvserial/TvSerial"; // Example TV Series component
import Trending from "../src/component/trending/Trending"; // Example Trending component
import Home from "./component/home/Home";
import MovieDetailPage from "./component/moviedetailpage/MovieDetailPage";
import TvDetailPage from "./component/tvdetailpage/TvDetailPage";
import BookMarkHolder from "./component/bookmarkholder/BookMarkHolder";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#10141E",
        color: "white",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainComponent />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="trending" element={<Trending />} />
            <Route path="tv-serials" element={<TVSeries />} />
            <Route path="bookmarks" element={<BookMarkHolder />} />
            <Route path="movie-detail/:id" element={<MovieDetailPage />} />
            <Route path="tv-serial-detail/:id" element={<TvDetailPage />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
