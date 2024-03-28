import React, { useEffect } from "react";
import "./App.css";
import Home from "./features/Pages/Home";
import LoginPage from "./features/Pages/LoginPage";
import SignupPage from "./features/Pages/SignupPage";
import CartPage from "./features/Pages/CartPage";


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Checkout from "./features/Pages/Checkout";
import ProductDetailPage from "./features/Pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./features/Pages/404";
import OrderSuccessPage from "./features/Pages/OrderSuccessPage";
import UserOrdersPage from "./features/Pages/UserOrdersPage";
import UserProfilePage from "./features/Pages/UserProfilePage";
import { fetchLoggedInUser } from "./features/user/userAPI";
import { fetchLoggedInUserAsync, selectUserInfo } from "./features/user/userSlice";
import ForgotPasswordPage from "./features/Pages/ForgotPasswordPage";
import Logout from "./features/auth/components/Logout";
import AdminProductDetailPage from "./features/Pages/AdminProductDetailPage";
import AdminProductFormPage from "./features/Pages/AdminProductFormPage";
import AdminOrdersPage from "./features/Pages/AdminOrdersPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./features/Pages/AdminHome";
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import StripeCheckout from "./features/Pages/StripeCheckout";



const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};




const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home></Home></Protected>,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout></Checkout></Protected>,
  },
  {
    path: "/productdetail/:id",
    element: <Protected><ProductDetailPage></ProductDetailPage></Protected>,
  },
  {
    path: "admin/productdetail/:id",
    element: <ProtectedAdmin><AdminProductDetailPage></AdminProductDetailPage></ProtectedAdmin>,
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order-success/:id",
    element: <Protected>
       <OrderSuccessPage></OrderSuccessPage>{' '}
      </Protected>
  },
  {
    path: "/my-orders",
    element:   <Protected>
            <UserOrdersPage/>{' '}
            </Protected>
  },
  {
    path: "/profile",
    element: <Protected>
    <UserProfilePage></UserProfilePage>{' '}
    </Protected> 
  },
  {
    path: '/stripe-checkout/',
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    ),
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  }
]);

function App() {




  const dispatch=useDispatch();
  // const user=useSelector(selectUserInfo);
  const user=useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);


  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);


  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync())
      // we can get req.user by token on backend so no need to give in front-end
      dispatch(fetchLoggedInUserAsync())
    }
  },[dispatch,user])


  return (
    <>
      <div className="App">
      {userChecked && (
        <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>
        )}
      
        
        {/*  {userChecked && (
                         upr will come here    )}
         Link must be inside the Provider */}
      </div>
    </>
  );
}

export default App;
