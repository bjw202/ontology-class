import nextra from 'nextra'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const isStaticExport = process.env.NEXT_STATIC_EXPORT === '1'

const withNextra = nextra({
  // Nextra 4.x options
})

export default withNextra({
  reactStrictMode: true,
  ...(isStaticExport && {
    output: 'export',
    images: { unoptimized: true },
  }),
  webpack(config, options) {
    // @theguild/remark-mermaid가 삽입하는 Mermaid 컴포넌트를 race condition이 수정된 버전으로 교체
    config.resolve.alias['@theguild/remark-mermaid/mermaid'] = resolve(
      __dirname,
      'components/mermaid-remark.tsx'
    )
    return config
  },
})
