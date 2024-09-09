import Link from "next/link";

export const metadata = {
    title: 'Home',
};

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies"; // 나중에 또 쓸거라 export

async function getMovies() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // console.log("I'm fetching!")
    const response = await fetch(API_URL);
    const json = await response.json();
    return json;
    // return fetch(URL).then(response => response.json());
}

export default async function HomePage() {
    const movies = await getMovies();
    return <div>{movies.map(movie => <li key={movie.id}><Link href={`/movies/${movie.id}`}>{movie.title}</Link></li>)}</div>;
}