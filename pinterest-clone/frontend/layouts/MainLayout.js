import Header from '../components/Header'
import FloatingAddWidget from '../components/FloatingAddWidget'
export default function MainLayout({children}) {
  return (
    <>
      <Header />
      <FloatingAddWidget />
      <div>
        {children}
      </div>
    </>
  )
}
