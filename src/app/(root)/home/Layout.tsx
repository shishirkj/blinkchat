import { Syne } from 'next/font/google'
import { Bricolage_Grotesque } from 'next/font/google'
import './styles.css'

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
})
const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage_grotesque',
})

export default function Layout({ children }:{children:React.ReactNode}) {
  return (
    <html lang="en">
      <body className={syne.variable + bricolage_grotesque.variable}>
        {children}
      </body>
    </html>
  )
}
