"use client";

import { useRouter } from "next/navigation"; // next/router는 페이지 라우터 방식으로 사용되는 next 12 버젼 라우터임. 이상 버젼에서는 네비게이션에서 가져와야함

import { FormEvent, useState } from "react";

// 현재 디렉토리에 layout 파일이 없으면 부모 디렉토리에 가서 layout 파일을 찾음.

// create 폴더 내에 layout.js 또는 layout.jsx가 있으면 ?
export default function Create() {

  const router = useRouter();
  const [count, setCount] = useState("0");

  fetch(`http://localhost:9999/topics`)
    .then(res => res.json())
    .then(result => {
      setCount(result.length);
  });


  return (
    // onSubmit은 사용자와 상호작용할 때 실행된다! 이것은 서버컴포넌트에서 다루지 않고 클라이언트 컴포넌트에서 다룸!!
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // onSubmit 실행시 기본적인 동작을 방지시킨다. (예를 들면 해당 네임 관련된 파라미터가 적힌 페이지 이동)
        const target = e.target;
        let { title, body }: any = target;
        title = title.value;
        body = body.value;

        const new_cnt = (parseInt(count)+1).toString();

        const options = {
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({title, body, id: new_cnt})
        }

        fetch(`http://localhost:9999/topics`, options)
          .then(res => res.json())
          .then(result => {
            const last_id = result.id;
            router.push(`/read/${last_id}`);
            router.refresh(); // 리프래쉬가 밑에 있어야 동작함!! 갱신됨!! 왜? 클라이언트 컴포넌트인데 setState 변경 안되므로 화면변화 없으니깐. 정적 페이지라서..?
            // 푸쉬보다 아래 써야 동작함.. 왜그런지는 모르겠음. 아마 클라이언트 컴포넌트에서 변동이 없으니깐 서버사이드 새로고침해도 클라이언트는 변화가 없는것인지..?
            // 사전 랜더링된 목록에서 클라이언트로 상호작용 하는 것임. 서버컴포넌트 리프래쉬해도 클라이언트 컴포넌트는 리프래쉬 안되나봄. (일단 추론임)
            // 라우터 옮기면 클라이언트 컴포넌트도 갱신되나봄.

            // 공식홈페이지에서는 페치 요청이 캐시되면 동일한 결과를 다시 생성할 수 있다고 한다. 아무튼 푸쉬를 먼저 실행해야 함. 왜그런지는 모르겠다.
          })

    }}>
      현재 글 갯수 : {count}
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body"></textarea>
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  )
};