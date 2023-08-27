import { Outlet } from "react-router";
import MyNavBar from "./MyNavBar";

export default function Root() {
  return (
    <>
      <MyNavBar />
      <Outlet />
    </>
  );
}
