// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('dashboard'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'add product',
    path: '/dashboard/product',
    icon: icon('add_product'),
  },
  {
    title: 'room',
    path: '/dashboard/room_product',
    icon: icon('rooms'),
  },
  {
    title: 'food',
    path: '/dashboard/food_product',
    icon: icon('reshotfood'),
  },
  {
    title: 'wedding',
    path: '/dashboard/wedding_product',
    icon: icon('wedding'),
  },
  {
    title: 'orders List',
    path: '/dashboard/orders',
    icon: icon('ic_analytics'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  // {orders
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
