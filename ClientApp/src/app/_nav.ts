interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },

  {
    title: true,
    name: 'Sections'
  },

  {
    name: 'Customer',
    url: '/customer',
    icon: 'icon-user'
  },
  {
    name: 'Product',
    url: '/products',
    icon: 'icon-calculator'
  },
  {
    name: 'Invoice',
    url: '/invoice',
    icon: 'icon-calculator'
  },
  {
    name: 'Admin',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Company Details',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Taxes',
        url: '/base/cards',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Logout',
    url: '/login',
    icon: 'icon-calculator'
  }
];
