import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './MainLayout.scss'

const MainLayout = ({ children }) => {
  return (
    <div className='main-layout'>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default MainLayout
