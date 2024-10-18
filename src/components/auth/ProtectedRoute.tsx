import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

interface IProps{
    isAllowed:boolean,
    redirectionPath:string,
    children:ReactNode,
    data?:unknown
}
const ProtectedRoute = ({isAllowed,redirectionPath,children,data}:IProps)=>{
    if(!isAllowed)return <Navigate to={redirectionPath} replace state={data}/>
    return children
}
export default ProtectedRoute