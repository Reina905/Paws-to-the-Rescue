// layouts/MainLayout.jsx
import { Header } from './Header'
import { Footer } from './Footer'

export const MainLayout = ({
  backgroundType,
  backgroundSrc,
  overlayClassName,
  hero,
  children,
}) => {
  return (
    <>
      <Header
        backgroundType={backgroundType}
        backgroundSrc={backgroundSrc}
        overlayClassName={overlayClassName}
      >
        {hero}
      </Header>

      <main className="relative overflow-hidden isolate">{children}</main>

      <Footer />
    </>
  )
}