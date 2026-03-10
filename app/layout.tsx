import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '../styles/globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: {
    default: '온톨로지 기초 학습',
    template: '%s - 온톨로지 기초 학습'
  },
  description: '한국어 온톨로지 기초 학습 플랫폼'
}

const navbar = <Navbar logo={<b>온톨로지 기초 학습</b>} />
const footer = <Footer>MIT {new Date().getFullYear()} © 온톨로지 기초 학습 플랫폼</Footer>

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" dir="ltr" suppressHydrationWarning>
      <Head />
      <body suppressHydrationWarning>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
