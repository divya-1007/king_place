import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './layouts/footer/privacyPolicy';
import TermsConditions from './layouts/footer/termsConditions';
import ForgotForm from './sections/auth/login/Forgot';
import ResetPassword from './sections/auth/login/Resetpassword';
import Foodpage from './pages/Foodpage'
import WeddingPage from './pages/WeddingPage';
import WeddingPageEdit from './sections/@dashboard/products/WeddingPageEdit';
import WeddingViewPage from './sections/@dashboard/products/WedingViewPage';
import AddProduct from './pages/AddProduct';
import AllProduct from './components/card/AllProduct';
import AllProductPage from './components/card/AllProductLastPage';
import ProductCart from './components/card/ProductCart';
import OrderListPage from './sections/UserDashboard/OrderListPage';
import MainScreen from './sections/UserDashboard/index';
import OrderList from './sections/UserDashboard/OrderList/OrderList';
import WeddingBlog from './components/card/wedding';
import GallaryRoom from './components/card/gallary'
import FoodService from './components/card/foodservice';
// import Homes from "./containers/HomeContainer";
// ----------------------------------------------------------------------

export default function Router() {

  const routes = useRoutes([
    {
      path: '/dashboard', element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        {path:'product',element:<AddProduct />},
        { path: 'room', element: <ProductsPage /> },
        { path: 'food', element: <Foodpage /> },
        { path: 'wedding', element: <WeddingPage /> },
        { path: 'edit/:id', element: <WeddingPageEdit /> },
        { path: 'view/:id', element: <WeddingViewPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '/userDashboard', element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/userDashboard/app" /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'order_process/:id', element: <OrderListPage /> },
        { path: 'orderLists', element: <OrderList /> },
        { path:'addTo_cart',element:<ProductCart />},
        { path: 'blog', element: <MainScreen /> },
      ],
    },
    // {
    //   path: 'home',
    //   element: <Homes />,
    // },
    {
      path: 'food',
      element: <FoodService />,
    },
    {
      path: 'gallary',
      element: <GallaryRoom />,
    },
    {
      path: 'wedding',
      element: <WeddingBlog />,
    },
    {
      path: 'contact',
      element: <ContactUs />,
    },
    {
      path: 'privacyPolicy',
      element: <PrivacyPolicy />,
    },
    {
      path: 'termsAndCondition',
      element: <TermsConditions />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      path: 'forget',
      element: <ForgotForm />,
    },
    {
      path: 'reset/:id/:otp',
      element: <ResetPassword />,
    },
    {
      path:'/all-product',element:<AllProduct />
    },
    {
      path:'/all-product/view/:id',element:<AllProductPage />
    },
    {
      path:'/all-product/cart',element:<ProductCart />
    },
    {
      path: '/',
      element: <LandingPage />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
