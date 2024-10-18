import { Link } from "react-router-dom";

interface IProps{

}
const PageNotFound = ({}:IProps)=>{
  return (
    <div className="block h-screen">
      <div className="h-1/2">
        <h1 className="text-gray-400 text-center text-[280px]">404</h1>
      </div>
      <div className="mx-auto text-center bg-gray-400 h-1/2">
        <h1 className="text-gray-700 text-[60px]">Sorry, Page Not Found</h1>
        <p className="mb-8">The page you requested could not be found</p>
        <Link className="!bg-gray-700 mx-auto mt-80 p-3 !rounded-lg text-white font-bold" to={'/Register'} reloadDocument>
            Go back to home
        </Link>
      </div>
    </div>
  );
}
export default PageNotFound
