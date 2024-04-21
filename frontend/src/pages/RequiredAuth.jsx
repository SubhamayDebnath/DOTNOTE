import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequiredAuth({allowedRoutes}) {
    const {isLoggedIn ,role}=useSelector((state) => state?.auth) ;
    const location = useLocation();

  return isLoggedIn && allowedRoutes.find((myRole)=> myRole == role) ? (<Outlet/>) : isLoggedIn ? (<Navigate to={"/denied"}></Navigate>) : (<Navigate to={'/login'}></Navigate>)
}

export default RequiredAuth