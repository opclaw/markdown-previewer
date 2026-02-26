import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://markdown-previewer.vercel.app'),
  alternates: {
    canonical: 'https://markdown-previewer.vercel.app',
  },
  title: 'Markdown Previewer — Edit & Preview Markdown | Free Tool',
  description: 'Write and preview Markdown in real-time. Free online Markdown editor and previewer.',
  keywords: ['markdown previewer', 'markdown editor', 'markdown viewer', 'md preview'],
  authors: [{ name: 'SmartOK Tools' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://markdown-previewer.vercel.app',
    siteName: 'Markdown Previewer',
    title: 'Markdown Previewer — Edit & Preview Markdown',
    description: 'Write and preview Markdown in real-time.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown Previewer',
    description: 'Write and preview Markdown in real-time.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Markdown Previewer',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              featureList: 'Real-time preview, Syntax highlighting, Export HTML',
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  )
}
