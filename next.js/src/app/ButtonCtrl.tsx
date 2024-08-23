"use client"
import Link from "next/link";
import { useParams } from "next/navigation";

export const ButtonCtrl = () => {
  const params = useParams(); // 클라이언트 컴포넌트에서만 사용 가능한 훅임.
  
  const { id } = params;

  console.log(id);
  return (
    <ul>
      <li><Link href="/create">Create</Link></li>
      {id ? // 글 선택시에만 업데이트와 딜리트 버튼 표시되도록 처리.
        <>
          <li><Link href={`/update/${id}`}>Update</Link></li>
          <li><input type="button" value="delete" /></li>
        </>
        : null
      }
    </ul>
  );
};