import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";



export default function AuthLayout() {
    const isAuth = isAuthenticated();

    if (isAuth) {
        return <Navigate to="/" />;
    }


    // return (
    //   <div className="h-full bg-[url('/background.png')] ">
    //     <Outlet />
    //   </div>
    // )

    return (

        <div className="relative flex justify-center items-center align-center h-full">
            {/* <div className="absolute inset-0 bg-red-200 bg-cover bg-center opacity-15"></div> */}
            <div className="relative w-[450px] h-full z-10">
                <Outlet />
            </div>
        </div>



    )
}