import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import ReactQueryKeys from '@/constants/reactQueryKeys';
import { Endpoints } from '@/constants/endpoints';
import { StoreInfo } from '@/interfaces/storeInfo';

export const useStoreInfos = () => {

    const fetchStoreInfos = () => {
        return useQuery({
            queryKey:[ReactQueryKeys.STOREINFOS],
            queryFn: async() => {
                let res = await axios.get(process.env.NEXT_PUBLIC_URL + Endpoints.STOREINFOS);
                return res.data;
            }
        })
    }

    const createStoreInfos = () => {
        return useMutation({
            mutationKey:[ReactQueryKeys.STOREINFOS],
            mutationFn:async (storeInfo:any) => {
                let res = await axios.post(process.env.NEXT_PUBLIC_URL + Endpoints.STOREINFOS,storeInfo);
                return res.data;
            }
        })
    }

    return [{fetchStoreInfos,createStoreInfos}];
}
