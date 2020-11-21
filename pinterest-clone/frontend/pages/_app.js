import '../styles/globals.css'
import { AuthProvider } from '~/providers/Auth'
import axios from 'axios'

axios.defaults.baseURL = process.env.BACKEND_URL;
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
