import './globals.css'
import type { Metadata } from 'next'
import { Inter, Patrick_Hand, Meera_Inimai } from 'next/font/google'
import { type ReactNode } from 'react'

import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const patrick_hand = Patrick_Hand({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-patrick-hand',
});

const meera_inimai = Meera_Inimai({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-meera-inimai',
});

export const metadata: Metadata = {
  title: 'Mambo NFL Pickem',
  description: 'Pick games against the spread for AVAX',
}

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${patrick_hand.variable} ${meera_inimai.variable}`}>
      <body>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  )
}
