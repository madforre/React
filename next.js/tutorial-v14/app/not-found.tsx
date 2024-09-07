import { Metadata } from "next";

export const metadata: Metadata = { // 변수명은 꼭 metadata로 설정해야 작동함.
    title: "Not found" // so declartive..
}

export default function NotFound() {
    return (
        <div>
            <h1>Not found!</h1>
        </div>
    );
}