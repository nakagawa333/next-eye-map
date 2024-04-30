import { useRef } from "react"
import { Footer } from "../Footer/footer"
import { Header } from "../Header/header"

/** 連絡先 */
const Contact = () => {
    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const contactInformationRef = useRef<HTMLTextAreaElement>(null);

    const nameMaxLength:number = 50;
    const emailMaxLength:number = 50
    const mailPattern:RegExp = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/

    /**
     * 文字が空文字であるかを判定する
     * @param str 文字列
     * @returns true:空文字 false:それ以外
     */
    const isEmpty = (str:string | null | undefined) => {
        return str === "" || str === null || str === undefined;
    }

    //送信ボタンクリック
    const submitClick = (e:any) => {
        let validateCheckRes:boolean = validateCheck();
        if(validateCheckRes === false){
            return;   
        }
        e.preventDefault();
        alert("送信しました!");
        //フォームの初期化
        initForm();
    }

    const validateCheck = () => {
        let name:any = nameInputRef?.current?.value;
        if(isEmpty(name) || nameMaxLength < name?.length){
            return false;
        }

        let email:any = emailInputRef?.current?.value;

        if(isEmpty(email) || emailMaxLength < email.length){
            return false;
        }

        let mailRegex = new RegExp(mailPattern);
        if(mailRegex.test(email) === false){
            return false;
        }

        let contactInformation:string | undefined = contactInformationRef?.current?.value;
        if(isEmpty(contactInformation)){
            return false;
        }
        return true;
    }

    const initForm = () => {
        if(nameInputRef.current){
            nameInputRef.current.value = "";
        }
        if(emailInputRef.current){
            emailInputRef.current.value = "";
        }
        if(contactInformationRef.current){
            contactInformationRef.current.value = "";
        }
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
                                  data-testid="subject"
                                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                                  placeholder="お名前"
                                  maxLength={nameMaxLength}
                                  required={true}
                                  ref={nameInputRef}
                                  />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">メールアドレス</label>
                                <input 
                                   type="email" 
                                   id="email"
                                   data-testid="email"
                                   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                                   placeholder="example@gmail.com" 
                                   ref={emailInputRef}
                                   required={true}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="contactInformation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">お問い合わせ</label>
                                <textarea 
                                  id="contactInformation"
                                  data-testid="contact"
                                  rows={6} 
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                  placeholder="お問い合わせ内容"
                                  ref={contactInformationRef}
                                  required={true}
                                >
                                
                                 </textarea>
                            </div>

                            <div className="flex justify-end">
                                <button 
                                type="submit"
                                data-testid="submit"
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

export default Contact;