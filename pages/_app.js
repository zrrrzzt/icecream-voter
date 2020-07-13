import { Provider } from 'next-auth/client'
import '../css/tailwind.css'
import Menu from '../components/menu'

export default function MyApp ({ Component, pageProps }) {
  const { session } = pageProps
  return (
    <Provider options={{ site: process.env.SITE }} session={session}>
      <Menu />
      <Component {...pageProps} />
    </Provider>
  )
}
