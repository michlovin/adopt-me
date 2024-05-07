import movie from "./assets/movie.mov";
import "./css/moviebanner.css";

export function MovieBanner() {
  return (
    <>
      <div className="movie-container">
        <video autoPlay loop muted>
          <source src={movie} type="video/mp4" />
        </video>
      </div>
    </>
  );
}
