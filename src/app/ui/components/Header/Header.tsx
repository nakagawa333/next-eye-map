type Props = {

}

//Headerコンポーネントクラス
export const Header = (props:Props) => {
    const text:string = `目元専門サロン Mapを共有 ${process.env.NEXT_PUBLIC_DOMAIN}`;
    const url:string = process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : "";
    const params = new URLSearchParams();
    params.set("ref_src","twsrc%5Etf");
    params.set("data-text",text);
    params.set("data-url",url);

    const twitterHref:string = `https://twitter.com/share?${params}`;
    
    return (
        <>
          <header className="bg-white">
            <nav className="bg-white border-gray-100 px-4 lg:px-6 py-2.5 dark:bg-gray-100">
                <div className="flex flex-wrap">
                    <div className="flex">
                        <p className="text-black">目元専門サロン Map</p>
                    </div>
                    <div className="flex ml-auto">
                        <a href={twitterHref}
                        className="twitter-share-button" data-show-count="false">
                            Tweet
                        </a>
                        <script async src="https://platform.twitter.com/widgets.js"></script>
                    </div>
                </div>
            </nav>
          </header>
        </>
    )
}