import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import {TileLayer, Marker, Popup, MapContainer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";


import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";
import { Loading } from "./loading";
import { Header } from "./Header/Header";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const Map = () => {
    const defaultPosition:LatLngExpression = [35.669261,139.764429];
    const [isWaitng, setIsWaiting] = useState(true);
    const [isLoadingOpen,setIsLoadingOpen] = useState<boolean>(true);

    const [storeInfos,setStoreInfos] = useState<any[]>([]);

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

    return (
        <>
            <Header />
                    <MapContainer
                        center={defaultPosition}
                        zoom={13}
                        scrollWheelZoom={true}
                        style={{ height: "100vh", width: "100%" }}
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
                    </MapContainer>

            <Loading 
              isOpen={isLoadingOpen}
            />  
        </>

    )

}

export default Map;
