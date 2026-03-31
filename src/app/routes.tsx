import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { Services } from "./components/pages/Services";
import { Doctors } from "./components/pages/Doctors";
import { Prices } from "./components/pages/Prices";
import { Booking } from "./components/pages/Booking";
import { Contact } from "./components/pages/Contact";
import { Profile } from "./components/pages/Profile";
import { AdminPanel } from "./components/pages/AdminPanel";
import { NotFound } from "./components/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "doctors", Component: Doctors },
      { path: "prices", Component: Prices },
      { path: "booking", Component: Booking },
      { path: "contact", Component: Contact },
      { path: "profile", Component: Profile },
      { path: "admin", Component: AdminPanel },
      { path: "*", Component: NotFound },
    ],
  },
]);
