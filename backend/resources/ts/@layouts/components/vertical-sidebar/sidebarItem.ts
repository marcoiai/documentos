export interface menu {
  id?: string;
  header?: string
  title?: string
  icon?: string
  to?: string
  divider?: boolean
  chip?: string
  chipColor?: string
  chipVariant?: string
  chipIcon?: string
  children?: menu[]
  disabled?: boolean
  type?: string
  subCaption?: string
}

const sidebarItem: menu[] = [
  { header: 'Dashboard' },
  {
    title: 'Dashboard',
    icon: 'custom-home-trend',
    to: '/dashboards/default',
    children: [
      {
        id: 'default',
        title: 'Default',
        to: '/dashboards/default',
      },
      {
        id: 'analytics',
        title: 'Analytics',
        to: '/dashboards/analytics',
      },
    ],
  },
  {
    id: 'components',
    title: 'Components',
    icon: 'custom-box-1',
    to: '/forms/components/buttons',
    type: 'external',
    chip: 'new',
    chipColor: 'primary',
    chipVariant: 'tonal',
  },
  { header: 'Widget' },
  {
    id: 'statistics',
    title: 'Statistics',
    icon: 'custom-story',
    to: '/widgets/statistics',
  },
  {
    id: 'data',
    title: 'Data',
    icon: 'custom-fatrows',
    to: '/widgets/data',
  },
  {
    id: 'chart',
    title: 'Chart',
    icon: 'custom-presentation-chart',
    to: '/widgets/chart',
  },
  { header: 'Applications' },
  {
    id: 'documentos-app',
    title: 'Documentos',
    icon: 'custom-document-text-outline',
    to: '/documentos',
    children: [
      {
        id: 'documentos-hub',
        title: 'Visao Geral',
        to: '/documentos',
      },
      {
        id: 'documentos-tipos',
        title: 'Tipos',
        to: '/documentos/tipos',
      },
      {
        id: 'documentos-secoes',
        title: 'Secoes',
        to: '/documentos/secoes',
      },
      {
        id: 'documentos-atributos',
        title: 'Atributos',
        to: '/documentos/atributos',
      },
      {
        id: 'documentos-registros',
        title: 'Documentos',
        to: '/documentos/documentos',
      },
      {
        id: 'documentos-layout',
        title: 'Layout',
        to: '/documentos/layout',
      },
      {
        id: 'documentos-relatorios',
        title: 'Relatorios',
        to: '/documentos/relatorios',
      },
      {
        id: 'documentos-relatorio-layout',
        title: 'Layout Relatorio',
        to: '/documentos/relatorio-layout',
      },
    ],
  },
  {
    id: 'chat',
    title: 'Chat',
    icon: 'custom-chat',
    to: '/apps/chats',
  },
  {
    id: 'calendar',
    title: 'Calendar',
    icon: 'custom-calendar-1',
    to: '/apps/calendar',
  },
  {
    id: 'kanban',
    title: 'Kanban',
    icon: 'custom-kanban',
    to: '/apps/kanban',
  },
  {
    title: 'Customer',
    icon: 'custom-users',
    to: '/customer/',
    children: [
      {
        id: 'customerlist',
        title: 'Customer List',
        to: '/apps/customer/customerlist',
      },
      {
        id: 'createinvoice',
        title: 'Create Invoice',
        to: '/apps/customer/createinvoice',
      },
      {
        id: 'orderdetails',
        title: 'Order Details',
        to: '/apps/customer/orderdetails',
      },
      {
        id: 'orderlist',
        title: 'Order List',
        to: '/apps/customer/orderlist',
      },
      {
        id: 'productlist',
        title: 'Product List',
        to: '/apps/customer/productlist',
      },
      {
        id: 'productreview',
        title: 'Product Review',
        to: '/apps/customer/productreview',
      },
    ],
  },
  {
    title: 'Invoice',
    icon: 'custom-invoice',
    to: '/',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        to: '/apps/invoice/dashboard',
      },
      {
        id: 'create',
        title: 'Create',
        to: '/apps/invoice/create',
      },
      {
        id: 'details',
        title: 'Details',
        to: '/apps/invoice/details',
      },
      {
        id: 'list',
        title: 'List',
        to: '/apps/invoice/list',
      },
      {
        id: 'edit',
        title: 'Edit',
        to: '/apps/invoice/edit',
      },
    ],
  },
  {
    title: 'Users',
    icon: 'custom-user-square',
    to: '/apps/users',
    children: [
      {
        id: 'socialprofile',
        title: 'Social Profile',
        to: '/apps/users/social/posts',
      },
      {
        title: 'Account Profile',
        to: '/apps/users/accountprofile',
        children: [
          {
            id: 'profile01',
            title: 'Profile 01',
            to: '/apps/users/accountprofile/profile1',
          },
          {
            id: 'profile02',
            title: 'Profile 02',
            to: '/apps/users/accountprofile/profile2',
          },
          {
            id: 'profile03',
            title: 'Profile 03',
            to: '/apps/users/accountprofile/profile3',
          },
        ],
      },
      {
        id: 'userprofile',
        title: 'User Profile',
        to: '/apps/users/userprofile',
      },
      {
        title: 'Cards',
        to: '/apps/users/card',
        children: [
          {
            id: 'style01',
            title: 'Style 01',
            to: '/apps/users/card/card1',
          },
          {
            id: 'style02',
            title: 'Style 02',
            to: '/apps/users/card/card2',
          },
          {
            id: 'style03',
            title: 'Style 03',
            to: '/apps/users/card/card3',
          },
        ],
      },
      {
        title: 'List',
        to: '/apps/users/list',
        children: [
          {
            id: 'liststyle01',
            title: 'Style 01',
            to: '/apps/users/list/list1',
          },
          {
            id: 'liststyle02',
            title: 'Style 02',
            to: '/apps/users/list/list2',
          },
        ],
      },
    ],
  },
  {
    id: 'mail',
    title: 'Mail',
    icon: 'custom-direct-inbox',
    to: '/apps/mail',
  },
  {
    title: 'Contact',
    icon: 'custom-user-circle-add',
    to: '/app/contacts',
    children: [
      {
        id: 'contactcard',
        title: 'Card',
        to: '/apps/contacts/card',
      },
      {
        id: 'contactlist',
        title: 'List',
        to: '/apps/contacts/list',
      },
    ],
  },
  {
    title: 'E-Commerce',
    icon: 'custom-shopping-bag',
    to: '/ecommerce/',
    children: [
      {
        id: 'products',
        title: 'Products',
        to: '/apps/ecommerce/products',
      },
      {
        id: 'productdetail',
        title: 'Product Detail',
        to: '/apps/ecommerce/details/1',
      },
      {
        id: 'productlist',
        title: 'Product List',
        to: '/apps/ecommerce/productlist',
      },
      {
        id: 'addproduct',
        title: 'Add New Product',
        to: '/apps/ecommerce/addproduct',
      },
      {
        id: 'checkout',
        title: 'Checkout',
        to: '/apps/ecommerce/checkout',
      },
    ],
  },
  { header: 'Forms & Tables' },
  {
    id: 'formvalidation',
    title: 'Form Validation',
    icon: 'custom-password-check',
    to: '/forms/formvalidation',
  },
  {
    title: 'Layouts',
    icon: 'custom-row-vertical',
    to: '/forms/layouts',
    children: [
      {
        id: 'layouts',
        title: 'Layouts',
        to: '/forms/layouts/layouts',
      },
      {
        id: 'multicolumns',
        title: 'Multi Columns',
        to: '/forms/layouts/multicolumnforms',
      },
      {
        id: 'actionbar',
        title: 'Action Bar',
        to: '/forms/layouts/actionbar',
      },
      {
        id: 'stickybar',
        title: 'Sticky Bar',
        to: '/forms/layouts/stickyactionbar',
      },
    ],
  },
  {
    title: 'Plugins',
    icon: 'custom-cpu-charge',
    to: '/forms/radio',
    children: [
      {
        id: 'mask',
        title: 'Mask',
        to: '/forms/plugins/mask',
      },
      {
        id: 'clipboard',
        title: 'Clipboard',
        to: '/forms/plugins/clipboard',
      },
      {
        id: 'recaptcha',
        title: 'reCaptcha',
        to: '/forms/plugins/captcha',
      },
      {
        id: 'dropzone',
        title: 'Dropzone',
        to: '/forms/plugins/dropzone',
        chip: 'new',
        chipColor: 'primary',
        chipVariant: 'tonal'
      },
      {
        id: 'editor',
        title: 'Editor',
        to: '/forms/plugins/editor',
      },
    ],
  },
  {
    title: 'Tables',
    icon: 'custom-table',
    to: '/forms/tables',
    children: [
      {
        id: 'basictable',
        title: 'Basic Table',
        to: '/forms/tables/tablebasic',
      },
      {
        id: 'darktable',
        title: 'Dark Table',
        to: '/forms/tables/tabledark',
      },
      {
        id: 'densitytable',
        title: 'Density Table',
        to: '/forms/tables/tabledensity',
      },
      {
        id: 'heighttable',
        title: 'Height Table',
        to: '/forms/tables/tableheight',
      },
      {
        id: 'fixedheadertable',
        title: 'Fixed Header Table',
        to: '/forms/tables/tableheaderfixed',
      },
    ],
  },
  { header: 'Charts & map' },
  {
    title: 'Charts',
    icon: 'custom-graph',
    to: '/forms/radio',
    children: [
      {
        id: 'apexcharts',
        title: 'Apex Charts',
        to: '/forms/charts/apexchart',
      },
      {
        id: 'orgcharts',
        title: 'Org Charts',
        to: '/forms/charts/orgchart',
      },
    ],
  },
  { header: 'Utilities' },
  {
    title: 'Icons',
    icon: 'custom-mouse-circle',
    to: '/forms/radio',
    children: [
      {
        id: 'iconsax',
        title: 'Iconsax',
        type: 'external',
        to: 'https://iconsax.io/',
      },
      {
        id: 'tablericon',
        title: 'Tabler Icons',
        to: '/utilities/icons/tabler',
      },
      {
        id: 'materialicon',
        title: 'Material Icons',
        to: '/utilities/icons/material',
      },
    ],
  },
  { header: 'Pages' },
  {
    title: 'Authentication',
    icon: 'custom-shield',
    to: '/auth',
    children: [
      {
        title: 'Authentication 1',
        to: '/auth',
        children: [
          {
            id: 'login1',
            title: 'Login',
            to: '/authentication/auth1/login1',
          },
          {
            id: 'register1',
            title: 'Register',
            to: '/authentication/auth1/register1',
          },
          {
            id: 'forgotpassword1',
            title: 'Forgot Password',
            to: '/authentication/auth1/forgotpwd1',
          },
          {
            id: 'checkmail1',
            title: 'Check Mail',
            to: '/authentication/auth1/checkmail1',
          },
          {
            id: 'resetpassword1',
            title: 'Reset Password',
            to: '/authentication/auth1/resetpwd1',
          },
          {
            id: 'codeverification1',
            title: 'Code Verification',
            to: '/authentication/auth1/codeverification1',
          },
        ],
      },
      {
        title: 'Authentication 2',
        to: '/auth',
        children: [
          {
            id: 'login2',
            title: 'Login',
            to: '/authentication/auth2/login2',
          },
          {
            id: 'register2',
            title: 'Register',
            to: '/authentication/auth2/register2',
          },
          {
            id: 'forgotpassword2',
            title: 'Forgot Password',
            to: '/authentication/auth2/forgotpwd2',
          },
          {
            id: 'checkmail2',
            title: 'Check Mail',
            to: '/authentication/auth2/checkmail2',
          },
          {
            id: 'resetpassword2',
            title: 'Reset Password',
            to: '/authentication/auth2/resetpwd2',
          },
          {
            id: 'codeverification2',
            title: 'Code Verification',
            to: '/authentication/auth2/codeverification2',
          },
        ],
      },
      {
        id: 'authentication3',
        title: 'Authentication 3',
        to: '/authentication/auth3',
      },
    ],
  },
  {
    title: 'Maintenance',
    icon: 'custom-maintenance',
    to: '/maintenenace',
    children: [
      {
        id: 'error404',
        title: 'Error 404',
        to: '/:error(.*)',
      },
      {
        id: 'error500',
        title: 'Error 500',
        to: '/error500',
      },
      {
        title: 'Coming soon',
        to: '/maintenenace',
        children: [
          {
            id: 'cominingsoon1',
            title: 'Coming soon 1',
            to: '/maintenance/comingsoon1',
          },
          {
            id: 'cominingsoon2',
            title: 'Coming soon 2',
            to: '/maintenance/comingsoon2',
          },
        ],
      },
      {
        title: 'Under Construction',
        to: '/underconstruction',
        children: [
          {
            id: 'construction1',
            title: 'Under Construction 1',
            to: '/underconstruction/construction1',
          },
          {
            id: 'construction2',
            title: 'Under Construction 2',
            to: '/underconstruction/construction2',
          },
        ],
      },
    ],
  },
  {
    title: 'Price',
    icon: 'custom-dollar-square',
    to: '/pricing/pricing1',
    children: [
      {
        id: 'price1',
        title: 'Price 1',
        to: '/pricing/pricing1',
      },
      {
        id: 'price2',
        title: 'Price 2',
        to: '/pricing/pricing2',
      },
    ],
  },
  {
    id: 'landing',
    title: 'Landing page',
    icon: 'custom-airplane',
    to: '/landing',
    type: 'external',
  },
  {
    id: 'contact',
    title: 'Contact Us',
    icon: 'custom-support',
    to: '/contactus',
    type: 'external',
  },
  {
    id: 'faq',
    title: 'FAQs',
    icon: 'custom-flag',
    to: '/faq',
    type: 'external',
  },
  {
    id: 'privacypolicy',
    title: 'Privacy Policy',
    icon: 'custom-shield-tick',
    to: '/privacypolicy',
    type: 'external',
  },
  { header: 'Others' },
  {
    id: 'sample',
    title: 'Sample Page',
    icon: 'custom-sample',
    to: '/starter',
  },
  {
    title: 'Menu levels',
    icon: 'custom-level-1',
    to: '#',
    children: [
      {
        id: 'level1',
        title: 'Level 1',
        disabled: true,
        to: '/level1'
      },
      {
        title: 'Level 1',
        to: '',
        children: [
          {
            id: 'level2',
            title: 'Level 2',
            disabled: true,
            to: '/level2'
          },
          {
            title: 'Level 2',
            to: '/2.2level',
            children: [
              {
                id: 'level3',
                title: 'Level 3',
                disabled: true,
                to: '/level3'
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'subcaption',
    title: 'Sub Caption Levels',
    icon: 'custom-level',
    subCaption: 'Caption Collapse',
    to: '',
  },
  {
    id: 'disabledmenu',
    title: 'Disabled Menu',
    icon: 'custom-disabled',
    disabled: true,
    to: '/disabled',
  },
  {
    id: 'documentation',
    title: 'Documentation',
    icon: 'custom-support',
    to: 'https://phoenixcoded.gitbook.io/able-pro',
    type: 'external',
    chip: 'gitbook',
    chipColor: 'info',
    chipVariant: 'flat',
  },
  {
    id: 'roadmap',
    title: 'Road Map',
    icon: 'custom-roadmap',
    to: 'https://phoenixcoded.gitbook.io/able-pro/v/vue-laravel/roadmap',
    type: 'external',
  },
]

export default sidebarItem
