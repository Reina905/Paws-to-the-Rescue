import { Navbar } from './Navbar/Navbar'

/**
 * Full-screen hero header shell.
 * Renders the Navbar + whatever children each page passes as its hero content.
 * The wrapper is `relative` so absolutely-positioned backgrounds (video, images)
 * are contained within it.
 */
export const Header = ({ children }) => {
  return (
    <header className="relative w-full h-screen flex flex-col text-white font-semibold overflow-hidden">
      <Navbar />
      {children}
    </header>
  )
}
