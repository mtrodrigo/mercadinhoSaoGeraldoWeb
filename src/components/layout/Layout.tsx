import { Outlet } from "react-router";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { LayoutContainer } from "../containers/LayoutContainer";

export const Layout = () => {
  return (
    <LayoutContainer>
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    </LayoutContainer>
  );
};
