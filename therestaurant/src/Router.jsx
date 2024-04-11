
import { createBrowserRouter } from "react-router-dom";

import  { Layout } from "./pages/Layout";
import  { Home } from "./pages/Home"; 
import { NotFound } from "./pages/NotFound";
import { Contact }   from "./pages/Contact";
import { Booking } from "./pages/Booking";
import { BookingsAdm } from "./pagesAdmin/BookingsAdm";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/booking",
                element: <Booking />,
            },
            {
            path: "admin",
            element: <BookingsAdm />,
            },

        ],
    },
]);