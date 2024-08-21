export default function Read(
  props: Readonly<{ children: React.ReactNode, params: {id: string} }> 
) {
    console.log(props);
    return (
      <>
      	<h2>Read</h2>
        {/* // 폴더 명에 해당되는 위치의 id 값을 가져올 수 있다. */}
      	parameters : {props.params.id}
      </>
    )
}