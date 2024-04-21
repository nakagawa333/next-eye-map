import Image from "next/image";
import MapPage from "./ui/pages/map-page";
import Map from "./ui/components/Map/map";
import Head from "next/head";
import Script from "next/script";
import { Header } from "./ui/components/Header/header";
import { Footer } from "./ui/components/Footer/footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>eye map</title>
        <meta name="description" content="" />
      </Head>

      <main>
        <MapPage />
      </main>
    </div>
  );
}
