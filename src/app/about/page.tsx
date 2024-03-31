import Head from "next/head";
import { AboutPage } from "../ui/pages/about-page";

export default function About() {
  return (
    <div>
      <Head>
        <title>eye map</title>
        <meta name="description" content="" />
      </Head>

      <main>
        <AboutPage />
      </main>
    </div>
  );
}