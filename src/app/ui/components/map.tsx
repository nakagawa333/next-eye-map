import { LatLngExpression } from "leaflet";
import { useEffect, useReducer, useRef, useState } from "react";
import {TileLayer, Marker, Popup, MapContainer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";
import { Loading } from "./loading";
import { Footer } from "./Footer/footer";
import { Header } from "./Header/header";
import { PrefectureCoordinates } from "@/constants/prefectureCoordinates";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});


type Props = {
    center:LatLngExpression
}
const ChangeMapCenter = (props:Props) =>  {
    const map = useMap()
    map.panTo(props.center)

    return (
        <>
        </>
    )
}

const Map = () => {
    const initialCenter:LatLngExpression = [35.689501,139.691722];
    const [center,setCenter] = useState<LatLngExpression>([35.689501,139.691722]);
    const [isWaitng, setIsWaiting] = useState(true);
    const [isLoadingOpen,setIsLoadingOpen] = useState<boolean>(true);

    const [storeInfos,setStoreInfos] = useState<any[]>([]);

    const prefectures:string[] = [
        "北海道", "青森県", "岩手県", "宮城県", "秋田県", 
        "山形県", "福島県", "茨城県", "栃木県", "群馬県", 
        "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", 
        "富山県", "石川県", "福井県", "山梨県", "長野県", 
        "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", 
        "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県", 
        "鳥取県", "島根県", "岡山県", "広島県", "山口県", 
        "徳島県", "香川県", "愛媛県", "高知県", "福岡県", 
        "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", 
        "鹿児島県", "沖縄県"
    ];

    useEffect(() => {
        (async() => {
            try{
                let res = await axios.get("/api/position");
                let data = res.data;
                setStoreInfos(() => data.storeInfos);
                setIsLoadingOpen(() => false);
            } catch(error:any){
                console.error(error);
            }
        })()
    },[])

    const prefectureSelect = (prefecture:string) => {
        let center = PrefectureCoordinates.coordinates[prefecture];
        setCenter(center);
    }

    return (
        <>
            <Header />

            <select 
              className="border border-gray-300 text-black bg-gray-50 block"
              style={{
                position: "absolute",
                zIndex:"9999",
                top:"55px",
                left:"50px"
              }}
              defaultValue={"東京都"}
              onChange={(e) => prefectureSelect(e.target.value)}
            >
                {
                    prefectures.map((prefecture:string,index:number) => {
                        return (
                            <option 
                              key={index}
                            >
                                {prefecture}
                            </option>
                        )
                    })
                }
            </select>
            <MapContainer
                center={initialCenter}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: "calc(100vh - 70px)", width: "100%" }}
            >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    storeInfos.map((storeInfo:any,index:number) => {
                        return(
                            <Marker position={[storeInfo.lat,storeInfo.lng]} key={index}>
                                <Popup>
                                    <b>{storeInfo.storeName}</b>
                                    <p>{storeInfo.address}</p>
                                    <p>{storeInfo.contents}</p>
                                    <p>{storeInfo.businessHours}</p>
                                    <p className="flex">
                                    {
                                        storeInfo.tags.map((store:any,l:any) => {
                                            return(
                                                <p key={l}>#{store} </p>
                                            )
                                        })
                                    }
                                    </p>
                                </Popup>
                            </Marker>                            
                        )
                    })
                }

                <ChangeMapCenter center={center} />

            </MapContainer>
            <Footer />
            <Loading 
              isOpen={isLoadingOpen}
            />  
        </>

    )

}

export default Map;
