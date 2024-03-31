import { useRef } from "react"
import { Footer } from "../Footer/footer"
import { Header } from "../Header/header"

/** 連絡先 */
export const Contact = () => {
    const nameInputRef = useRef<HTMLInputElement>(null);
    const mailInputRef = useRef<HTMLInputElement>(null);
    const contactInformationRef = useRef<HTMLTextAreaElement>(null);

    //送信ボタンクリック
    const submitClick = (e:any) => {
        e.preventDefault();
        alert("送信しました!")
    }

    return (
        <>
            <Header />
                <section className="bg-white gray:bg-gray-900">
                    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-dark">お問い合わせ</h2>
                        <p className="mb-8 lg:mb-16 font-light text-center text-gray-900 sm:text-xl dark:text-dark">
                            当サイトへのご連絡は、以下のフォームからご連絡ください
                        </p>
                        <form action="#" className="space-y-8">
                            <div>
                                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">お名前</label>
                                <input 
                                  type="text" 
                                  id="subject" 
                                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                                  placeholder="お名前" 
                                  required
                                  ref={nameInputRef}
                                  />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">メールアドレス</label>
                                <input 
                                   type="email" 
                                   id="email"
                                   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                                   placeholder="example@gmail.com" 
                                   ref={mailInputRef}
                                   required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="contactInformation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">お問い合わせ</label>
                                <textarea 
                                  id="contactInformation" 
                                  rows={6} 
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                  placeholder="お問い合わせ内容"
                                  ref={contactInformationRef}
                                >
                                
                                 </textarea>
                            </div>

                            <div className="flex justify-end">
                                <button 
                                type="submit"
                                onClick={(e) => submitClick(e)}
                                className="py-3 px-5 text-sm font-medium text-center text-gray-800 rounded-lg bg-gray-300 bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    送信
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            <Footer />        
        </>

    )
}