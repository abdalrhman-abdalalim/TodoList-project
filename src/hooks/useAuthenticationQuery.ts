import { useQuery } from "@tanstack/react-query";
import instance from "../config/axios.config";
import { AxiosRequestConfig } from "axios";

interface IuseAuthenticationQuery {
    queryKey:string[],
    url:string,
    config?: AxiosRequestConfig;

}
const useAuthenticationQuery = ({queryKey,url,config}:IuseAuthenticationQuery) => {
    return useQuery({
      queryKey,
      queryFn: async () => {
        const {data} = await instance.get(url,config);
        return data;
      },
    });
} 

export default useAuthenticationQuery;
