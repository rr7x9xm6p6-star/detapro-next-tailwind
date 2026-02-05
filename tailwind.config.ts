
import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}','./src/components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { bg:'#ffffff', fg:'#111111', border:'#eaeaea' }, boxShadow:{ lift:'0 10px 30px rgba(0,0,0,.08)' }, borderRadius:{ xl:'14px' } } },
  plugins: [],
}
export default config
