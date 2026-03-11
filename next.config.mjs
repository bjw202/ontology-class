import nextra from 'nextra'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const withNextra = nextra({
  // Nextra 4.x options
})

export default withNextra({
  reactStrictMode: true,
  webpack(config, options) {
    // @theguild/remark-mermaid가 삽입하는 Mermaid 컴포넌트를 race condition이 수정된 버전으로 교체
    config.resolve.alias['@theguild/remark-mermaid/mermaid'] = resolve(
      __dirname,
      'components/mermaid-remark.tsx'
    )
    return config
  },
})
