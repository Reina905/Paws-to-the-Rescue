// layouts/Header.jsx
import { Navbar } from './Navbar/Navbar'

export const Header = ({
  backgroundType,      // 'video' | 'image' 
  backgroundSrc,        
  overlayClassName = 'bg-black/35',
  children,              // contenido del hero
}) => {
  return (
    <header className="relative w-full h-screen flex flex-col text-white font-semibold overflow-hidden">
      <Navbar />

      {backgroundType === 'video' ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source src={backgroundSrc} type="video/mp4" />
        </video>
      ) : (
        <img
          src={backgroundSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      )}

      <div className={`absolute inset-0 -z-10 ${overlayClassName}`} />

      {children}
    </header>
  )
}