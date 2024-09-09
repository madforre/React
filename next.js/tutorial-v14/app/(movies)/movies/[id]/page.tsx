import { Suspense } from "react";
import { API_URL } from "../../../(home)/page";
import MovieInfo from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-video";

export default async function MovieDetail({
    params: { id },
}: {
    params: { id: string } // 훅 사용할 필요 없이 랜더링 가능!
}) {
    
    // console.log(props) // 클라이언트 컴포넌트가 아니기 떄문에 백앤드에서만 랜더링됨.

    return (
        <div>
            <Suspense fallback={<h1>Loading movie info</h1>}>
                <MovieInfo id={id}/>
            </Suspense>
            <Suspense fallback={<h1>Loading movie videos</h1>}>
                <MovieVideos id={id}/>
            </Suspense>
        </div>
    );
}


{/* <MovieDetail params={{id: 121221}} /> 이런식으로 파라미터를 가져온다고 인식하면 된다. */ }