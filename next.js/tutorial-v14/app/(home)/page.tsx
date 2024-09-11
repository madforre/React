import Link from "next/link";
import Movie from "../../components/movie";

import styles from "../../styles/home.module.css";

import { API_URL } from "../constants";

export const metadata = {
    title: 'Home',
};

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
    return <div className={styles.container}>{
        movies.map(movie => 
            <Movie key={movie.id} id={movie.id} 
                title={movie.title} poster_path={movie.poster_path} />
        )
    }</div>;
}