import { Outlet } from "react-router"
import { Header } from "../header/Header"

export const Layout = () => {
    return(
        <>
            <Header />
            <Outlet />
        </>
    )
}