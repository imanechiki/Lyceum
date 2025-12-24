import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import React from 'react'
import { Footer } from '@/Footer/Component.server'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { Montserrat, Lato, Plus_Jakarta_Sans } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})



export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme={'light'}
      className={cn(montserrat.variable, lato.variable, plusJakartaSans.variable)}
    >
      <head>
        <InitTheme />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link rel="dns-prefetch" href="https://snap.licdn.com" />
      </head>
      <body className="relative overflow-x-hidden">
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WLSNP8D" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
          }}
        />
        {/* Meta Pixel (noscript) - Pixel 1 */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1136590707000643&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* Meta Pixel (noscript) - Pixel 2 */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=793384543022471&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Providers>
          <Header />
          <main>
          {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
