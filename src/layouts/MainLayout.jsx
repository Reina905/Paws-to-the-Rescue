import { Navbar } from './Navbar/Navbar'
import { Footer } from './Footer'

/**
 * Standard page layout: Navbar on top, Footer at the bottom.
 * Use this for every page that does NOT have a full-screen hero header.
 * Pages with a hero (Home, AboutUs) should render <Header> themselves
 * before wrapping the rest of the content in <MainLayout>.
 */
export const MainLayout = ({ children, withNavbar = true }) => {
  return (
    <>
      {withNavbar && <Navbar />}
      {children}
      <Footer />
    </>
  )
}
