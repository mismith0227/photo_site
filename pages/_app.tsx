import { AppProps } from 'next/app'
import '../styles/globals.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
