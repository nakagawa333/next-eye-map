import { NonDirectionalSuspenseListProps, useRef, useState } from "react"
import { Footer } from "../Footer/footer"
import { Header } from "../Header/header"
import EegexPatterns from "@/constants/regexPatterns";
import { isEmpty } from "@/lib/isEmpty";
import { useStoreInfos } from "../../reactQuery/storeInfos/useQuery";
import { Loading } from "../loading";
import { CreateStoreInfo } from "@/interfaces/createStoreInfo";
import { Snackbar } from "../Snackbar/snackbar";

const StoreInfosRegister = () =>{
    const [tags,setTags] = useState<string[]>([]);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [isSucess,setIsSucess] = useState<boolean>(false);
    const [isOpen,setIsOpen] = useState<boolean>(true);
    const [type,setType] = useState<string>("");
    const [message,setMessage] = useState<string>("");

    const storeNameInputRef = useRef<HTMLInputElement>(null);
    const addressInputRef = useRef<HTMLInputElement>(null);
    const contentTextAreaRef = useRef<HTMLTextAreaElement>(null);
    const businessHourInputRef = useRef<HTMLInputElement>(null);
    const telephoneInputRef = useRef<HTMLInputElement>(null);
    const hashTagInputRef = useRef<HTMLInputElement>(null);

    const storeNameMaxLength:number = 30;
    const addressMaxLength:number = 400;
    const contentMaxLength:number = 65535;
    const businessHourMaxLength:number = 65535;
    const telephonerMaxLength:number = 30;

    const [{createStoreInfos}] = useStoreInfos();
    const data = createStoreInfos();

    //登録クリック
    const registerClick = async(e:any) => {
        let validateCheckRes:boolean = validateCheck();
        if(validateCheckRes === false){
            return;
        }

        setIsLoading(true);
        e.preventDefault();

        let storeInfo:CreateStoreInfo = {
            storeName:storeNameInputRef?.current?.value,
            address:addressInputRef?.current?.value,
            content:contentTextAreaRef?.current?.value,
            businessHour:businessHourInputRef?.current?.value,
            phoneNumber:telephoneInputRef?.current?.value,
            tags:tags
        }

        try{
            await data.mutateAsync(storeInfo);
            setIsLoading(false);
            setIsSucess(true);
            //フォームの初期化を行う
            initForm();
            setTags([]);
            setMessage("登録に成功しました");
            setType("sucess");
        } catch(error:any){
            setIsLoading(false);
            setMessage("登録に失敗しました");
            setType("error");
        } finally {
            setIsOpen(true);
        } 
    }

    const tagButtonClick = (index:number) => {
        let filterTasgs = tags.filter((tag:string,i:number) => {
            return index !== i;
        })
        setTags(filterTasgs);
    }

    /**
     * バリデーションチェックを行う
     * @returns true:正常 false:異常
     */
    const validateCheck = () => {
        let storeName:string | undefined = storeNameInputRef?.current?.value;
        if(isEmpty(storeName) || storeNameMaxLength < storeName?.length){
            return false;
        }

        let address:string | undefined = addressInputRef?.current?.value;
        if(isEmpty(address) || addressMaxLength < address?.length){
            return false;
        }

        let content:string | undefined = contentTextAreaRef?.current?.value;
        if(isEmpty(content) || contentMaxLength < content?.length){
            return false;
        }

        let budiness:string | undefined = businessHourInputRef?.current?.value;
        if(isEmpty(budiness) || businessHourMaxLength < budiness?.length){
            return false;
        }

        let telephone:string | undefined = telephoneInputRef?.current?.value;
        if(isEmpty(telephone) 
            || telephonerMaxLength < telephone?.length
            || !EegexPatterns.PHONENUMBER.test(telephone)
        ){
            return false;
        }
        return true;
    }

    /**
     * フォームの初期化を行う
     */
    const initForm = () => {
        if(storeNameInputRef.current){
            storeNameInputRef.current.value = "";
        }

        if(addressInputRef.current){
            addressInputRef.current.value = "";
        }

        if(contentTextAreaRef.current){
            contentTextAreaRef.current.value = "";
        }

        if(businessHourInputRef.current){
            businessHourInputRef.current.value = "";
        }

        if(telephoneInputRef.current){
            telephoneInputRef.current.value = "";
        }
    }

    const onSubmit = (e:any) => {
        return false;
    }

    const onEnterKeydown = (e:any) => {
        if(e.key === "Enter"){
            e.preventDefault();
            let tag:string | undefined = hashTagInputRef?.current?.value;
            let copyTags:string[] = [...tags];
            if(!isEmpty(tag)) copyTags.push(`${tag}`);

            if(hashTagInputRef?.current?.value) hashTagInputRef.current.value = "";
            setTags(copyTags);
        }
    }

    return(
        <>
            <Header />
                <section className="bg-white gray:bg-gray-900">
                    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                        <form action="#" className="space-y-8" onSubmit={(e) => onSubmit(e)}>
                            <div>
                                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                                    店舗名
                                </label>

                                <input 
                                  type="text" 
                                  id="subject"
                                  data-testid="subject"
                                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                                  placeholder="店舗名"
                                  maxLength={storeNameMaxLength}
                                  required={true}
                                  ref={storeNameInputRef}
                                  />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                                    住所
                                </label>
                        

                                <input 
                                  type="text" 
                                  id="subject"
                                  data-testid="subject"
                                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                                  placeholder="住所"
                                  maxLength={addressMaxLength}
                                  required={true}
                                  ref={addressInputRef}
                                  />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="contactInformation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                                    内容
                                </label>

                                <textarea 
                                  id="contactInformation"
                                  data-testid="contact"
                                  rows={6} 
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                  placeholder="内容"
                                  ref={contentTextAreaRef}
                                  required={true}
                                  maxLength={contentMaxLength}
                                />                               

                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="contactInformaion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                                    営業時間
                                </label>

                                <input 
                                  type="text" 
                                  id="subject"
                                  data-testid="subject"
                                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                                  placeholder="営業時間"
                                  maxLength={businessHourMaxLength}
                                  required={true}
                                  ref={businessHourInputRef}
                                  />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="contactInformation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                                    電話番号
                                </label>

                                <input 
                                  type="tel" 
                                  id="subject"
                                  data-testid="subject"
                                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                                  placeholder="電話番号"
                                  maxLength={telephonerMaxLength}
                                  required={true}
                                  ref={telephoneInputRef}
                                  pattern="[0-9]{1,3}-[0-9]{1,4}-[0-9]{3,4}"
                                />  
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="contactInformation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                                    ハッシュタグ
                                </label>

                                <div className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light">
                                    <div className="flex flex-wrap gap-y-2">
                                    {
                                        tags.map((tag:string,index:number) => {
                                            return (
                                                <button 
                                                  className="flex border rounded-full border-gray-800 mr-2" 
                                                  onClick={(e) => tagButtonClick(index)}
                                                  type="button"
                                                >
                                                    <span 
                                                        className="pl-2 text-gray-900"
                                                        key={index}
                                                    >
                                                        #{tag}
                                                    </span>

                                                    <span className="ml-1 pl-1 pr-2">
                                                        ×
                                                    </span>
                                                </button>
                                            )
                                        })
                                    }
                                    </div>
                                    
                                    <div>
                                        <input 
                                            placeholder="ハッシュタグを追加する" 
                                            type="text"
                                            onKeyDown={(e) => onEnterKeydown(e)}
                                            ref={hashTagInputRef}
                                            className="mt-3 block w-full p-4 ps-5 text-sm rounded-lg"
                                        >   
                                        </input>
                                    </div>
                                </div>
                            </div>

                        <div className="flex justify-end">
                                <button 
                                    type="submit"
                                    data-testid="submit"
                                    onClick={(e) => registerClick(e)}
                                    className="py-3 px-5 text-sm font-medium text-center text-gray-800 rounded-lg bg-gray-300 bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    登録
                                </button> 
                            </div>
            
                        </form>
                    </div>
                </section>
            <Footer />

            <Snackbar 
               isOpen={isOpen}
               setIsOpen={setIsOpen}
               type={type}
               message={message}
               time={5000}
            />

            {
                isLoading === true &&  (
                    <Loading 
                    isOpen={isLoading}
                  />  
                )
            }
        </>
    )
}

export default StoreInfosRegister;