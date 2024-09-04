import Image from "next/image";

export default function Home() {
  return (
    <>
    <h2>Welcome</h2>
    Hello, WEB!
    {/* /는 public 에 있는 경로를 의미함 */}
      <img src="/sample.jpg" alt=""/>
    </>
  );
}
