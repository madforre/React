import { API_URL } from "../app/(home)/page";
import styles from "../styles/movie-videos.module.css";

async function getVideos(id: string) {
    console.log(`Fetching movies: ${Date.now()}`);
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // throw new Error('something broke...');
    const response = await fetch(`${API_URL}/${id}/videos`);
    return response.json();
}

// 비디오만 랜더링하는 컴포넌트임
export default async function MovieVideos({id}: {id:string}) {
    const videos = await getVideos(id);
    return <div className={styles.container}>
        {videos.map(
            video => 
            <iframe key={videos.id} 
                src={`https://youtube.com/embed/${video.key}`} 
                title={video.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            /> 
        )}
    </div>
}