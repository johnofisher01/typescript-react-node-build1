import './globals.css'
import GlobalHeader from '../components/GlobalHeader'

export const metadata = { title: 'My ADHD Calendar' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalHeader />
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}