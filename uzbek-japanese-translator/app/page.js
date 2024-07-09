import Head from 'next/head';
import Translator from '../components/Translator.js';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Uzbek to Japanese Translator</title>
        <meta name="description" content="Translate Uzbek text to Japanese using Lingvanex API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Translator />
      </main>
    </div>
  );
}
