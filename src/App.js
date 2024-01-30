import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./RootLayout";
import Products from "./components/allCategories/Products";
import Home from "./components/Home";
import About from "./components/About";
import Register from "./components/Register";
import LoginCustomer from "./components/LoginCustomer";
import Shop from "./components/addCategories/Shop";
import UserProfile from "./components/user-profile/UserProfile";
import CardsUsage from "./components/allCategories/CardsUsage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        
        {
          path: "/LoginCustomer",
          element: <LoginCustomer />,
        },
        {
          path: "/Register",
          element: <Register />,
        },
        {
          path: "/About",
          element: <About />,
        },
        {
          path:'/Products',
          element:<Products/>
        },
        {
          path:'/Shop',
          element:<Shop/>
        },
        {
          path:"/AddToCart",
          element:<CardsUsage/>
        },
        // route for user-profile
        {
          path: "/user-profile",
          element: <UserProfile />,
          
        },
      ],
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
