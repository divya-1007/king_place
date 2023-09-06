// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfigSub = [
  {
    title: 'dashboard',
    path: '/userDashboard/app',
    icon: icon('dashboard'),
  },
  {
    title: 'Order Process',
    path: '/userDashboard/order_process/:id',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Order List',
    path: '/userDashboard/orderLists/',
    icon: icon('order_list'),
  },
  {
    title: 'Add To Cart',
    path: '/userDashboard/addTo_cart',
    icon: icon('cart_shopping'),
  },
//   {
//     title: 'food',
//     path: '/dashboard/food',
//     icon: icon('reshotfood'),
//   },
//   {
//     title: 'wedding',
//     path: '/dashboard/wedding',
//     icon: icon('wedding'),
//   },
  // {
  //   title: 'blog',
  //   path: '/userDashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfigSub;
