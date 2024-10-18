import { NavLink, useLocation } from "react-router-dom"
import Button from "./ui/Button";
interface IProps{

}
const Navbar = ({}:IProps)=>{
  const {pathname} = useLocation();

  const logKey = "loggedInUser";
  const loggedInUser = localStorage.length!=0 ? localStorage.getItem("loggedInUser"):null;
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const LogOut = () =>{
    localStorage.removeItem(logKey);
    setTimeout(()=>{
      location.replace(pathname);
    },1500)
  }
  return (
    <nav className="felx bg-indigo-600 p-3 text-white font-bold w-[390px] m-auto rounded-md mt-8">
      <ul className="flex justify-between items-center">
        <div>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
        </div>
        <div className="flex justify-between">
          {!loggedInUser ? (
            <ul className="flex">
              <li className="mr-10">
                <NavLink to={"/Login"}>Login</NavLink>
              </li>
              <li>
                <NavLink to={"/Register"}>Register</NavLink>
              </li>
            </ul>
          ) : (
            <ul className="flex text-sm items-center space-x-4">
              <li className="font-semibold">
                <NavLink to={"/todos"}>Todos</NavLink>
              </li>
              <li>
                <Button   size={"sm"} onClick={LogOut}>
                  Logout
                </Button>
              </li>
            </ul>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar