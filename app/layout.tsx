import './globals.css'

export const metadata = {
  title: 'Social Network',
  description: 'A modern social network built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
