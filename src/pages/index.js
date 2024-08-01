import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

const Content = dynamic(async () => await import('../components/content'), {
	ssr: false
});

export default function Home() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<main className={`${inter.className}`}>
				<Content />
			</main>
		</>
	);
}
