import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ReactQueryKeys from '@/constants/reactQueryKeys';
import { Endpoints } from '@/constants/endpoints';

const fetchPosition = async() => {
    let res = await axios.get(process.env.NEXT_PUBLIC_URL + Endpoints.position);
    return res.data;
}

const usePosition = () => {
    return useQuery({
        queryKey:[ReactQueryKeys.POSITION],
        queryFn: fetchPosition
    })
}

export default usePosition;