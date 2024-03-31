import Head from "next/head";
import { ContactPage } from "../ui/pages/contact-page";

export default function Contact() {
  return (
    <div>
      <Head>
        <title>eye map</title>
        <meta name="description" content="" />
      </Head>

      <main>
        <ContactPage />
      </main>
    </div>
  );
}