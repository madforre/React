export default async function Read( // 데이터를 읽어서 출력한 뿐이다? => 서버 컴포넌트로 사용도록 하자.
  props: Readonly<{ children: React.ReactNode, params: {id: string} }> 
) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `topics/${props.params.id}`, 
    { next: { revalidate: 0 } }
  );

  const topics = await response.json();
    // console.log(props);
    return (
      <>
      	<h2>{topics.title}</h2>
        {/* // 폴더 명에 해당되는 위치의 id 값을 가져올 수 있다. */}
      	parameters : {props.params.id}
        <br/>
        {topics.body}
      </>
    )
}