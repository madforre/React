export default function MovieDetail({
    params: { id },
}: {
    params: { id: string } // 훅 사용할 필요 없이 랜더링 가능!
}) {
    
    // console.log(props) // 클라이언트 컴포넌트가 아니기 떄문에 백앤드에서만 랜더링됨.

    return <h1>Movies {id}</h1>;
}


{/* <MovieDetail params={{id: 121221}} /> 이런식으로 파라미터를 가저온다고 인식하면 된다. */ }