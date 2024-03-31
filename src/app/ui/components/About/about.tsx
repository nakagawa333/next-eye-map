import { Footer } from "../Footer/footer";
import { Header } from "../Header/header";

export default function About() {
    return (
        <>
            <Header />
                <div>
                    <p className="text-black">こちらのサイトは、全国の目元専門サロンのマップです。</p>
                    <p className="text-black">スマホの登場により以前よりもまして眼精疲労が身近なものになっています。</p>
                    <p className="text-black">そんな眼精疲労を解決する一つの方法が目元専門サロンです。ぜひこの機会に近くの目元専門サロンに行ってみるのはいかがでしょうか。</p>
                </div>
            <Footer />
        </>
    );
  }