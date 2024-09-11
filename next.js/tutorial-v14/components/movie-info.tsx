import { API_URL } from "../app/(home)/page";
import test from "../styles/movie-info.module.css";

export async function getMovie(id: string) {
    console.log(`Fetching movies: ${Date.now()}`);
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export default async function MovieInfo({ id }: { id: string }) {
    const movie = await getMovie(id);
    return (
        <div className={test.container}>
            <img className={test.poster} src={movie.poster_path} alt={movie.title} />
            <div className={test.info}>
                <h1 className={test.title}>{movie.title}</h1>
                <h3> ⭐️ {movie.vote_average.toFixed(1)}</h3>
                <p>{movie.overview}</p>
                <a href={movie.homepage} target={"_blank"}>Homepage &rarr;</a>
            </div>
        </div>
    );
}