"use client";

import { useRouter } from "next/navigation"; // next/router는 페이지 라우터 방식으로 사용되는 next 12 버젼 라우터임. 이상 버젼에서는 네비게이션에서 가져와야함
import { FormEvent, useState } from "react";

// 현재 디렉토리에 layout 파일이 없으면 부모 디렉토리에 가서 layout 파일을 찾음.

// create 폴더 내에 layout.js 또는 layout.jsx가 있으면 ?
export default function Create() {

  const [count, setCount] = useState("0");

  fetch(`http://localhost:9999/topics`)
    .then(res => res.json())
    .then(result => {
      setCount(result.length);
  });

  const router = useRouter();

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
            console.log(result);
            const last_id = result.id;
            router.push(`/read/${last_id}`);
          })

    }}>
      현재 글 갯수 : {count};
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