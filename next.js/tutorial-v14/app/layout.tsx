import { Metadata } from "next"
import Navigation from "../components/navigation"

export const metadata: Metadata = {
  title: {
    template: "%s | Next Movies", // 템플릿으로 활용 가능
    default: "Next Movies" // 기본값도 설정 가능 (not-found 에 적용되겠죠?)
  },
  description: 'The best movies on the best framework!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation/>
        {children}
      </body>
    </html>
  )
}