import { Provider } from 'next-auth/client'
import '../css/tailwind.css'

export default function MyApp ({ Component, pageProps }) {
  const { session } = pageProps
  return (
    <Provider options={{ site: process.env.SITE }} session={session}>
      <Component {...pageProps} />
    </Provider>
  )
}
