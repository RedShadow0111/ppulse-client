import { Layout } from '@/components/layout/Layout'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'


import './globals.css'


const notoSans = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Predictive Pulse',
	description: 'Predictive Pulse',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={notoSans.className}>
				<Layout>{children}</Layout>
			</body>
		</html>
	)
}
