
type Props = {

}

//Headerコンポーネントクラス
export const Header = (props:Props) => {
    const text:string = `目元専門サロン Mapを共有`;
    const url:string = location.href;
    const params = new URLSearchParams();
    params.set("ref_src","twsrc%5Etf");
    params.set("data-text",text);
    params.set("data-url",url);

    const href = location.href;
    const twitterHref:string = `https://twitter.com/share?${params}`;

    /**
     * シェアボタンクリックイベント
     */
    const shareButtonClick = async() => {
        try{
            await shareContent("共有","共有します",url);
        } catch(error:any){
            console.error("共有失敗")
        }
    }

    const shareContent = async(title:string,text:string,url:string) => {
        const data:ShareData = {
            title:title,
            text:text,
            url:url
        }

        if(navigator.share && navigator.canShare(data)){
            //共有可能の場合
            try{
                await navigator.share(data);
            } catch(error:any){
                //TODO ブラウザの不具合で何度も共有APIを呼び出すとエラーが発生する
                if(error.name === "InvalidStateError"){
                    alert("共有に失敗しました。画面をリロードして再度お試しください")
                }
                console.info(error);
            }
        }
    }
    
    return (
        <>
          <header className="bg-white">
            <nav className="bg-white border-gray-100 px-4 lg:px-6 py-2.5 dark:bg-gray-100">
                <div className="flex flex-wrap">
                    <div className="flex">
                        <p className="text-black">目元専門サロン Map</p>
                    </div>
                    <div className="flex ml-auto">
                        <div>
                            <a href={twitterHref}
                            className="twitter-share-button" data-show-count="false">
                                Tweet
                            </a>
                            <script async src="https://platform.twitter.com/widgets.js"></script>
                        </div>
                        <div>

                            <div 
                              className="text-black flex ml-3"
                            >
                                <button 
                                  className="flex bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-px px-px rounded inline-flex"
                                  onClick={() => shareButtonClick()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M18 22q-1.25 0-2.125-.875T15 19q0-.175.025-.363t.075-.337l-7.05-4.1q-.425.375-.95.588T6 15q-1.25 0-2.125-.875T3 12q0-1.25.875-2.125T6 9q.575 0 1.1.213t.95.587l7.05-4.1q-.05-.15-.075-.337T15 5q0-1.25.875-2.125T18 2q1.25 0 2.125.875T21 5q0 1.25-.875 2.125T18 8q-.575 0-1.1-.212t-.95-.588L8.9 11.3q.05.15.075.338T9 12q0 .175-.025.363T8.9 12.7l7.05 4.1q.425-.375.95-.587T18 16q1.25 0 2.125.875T21 19q0 1.25-.875 2.125T18 22m0-16q.425 0 .713-.287T19 5q0-.425-.288-.712T18 4q-.425 0-.712.288T17 5q0 .425.288.713T18 6M6 13q.425 0 .713-.288T7 12q0-.425-.288-.712T6 11q-.425 0-.712.288T5 12q0 .425.288.713T6 13m12 7q.425 0 .713-.288T19 19q0-.425-.288-.712T18 18q-.425 0-.712.288T17 19q0 .425.288.713T18 20m0-1"/>
                                    </svg>
                                    <span className="-mt-0.5">シェア</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
          </header>
        </>
    )
}