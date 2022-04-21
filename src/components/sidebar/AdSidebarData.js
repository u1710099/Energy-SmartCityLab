import React from 'react';
import * as CgIcons from 'react-icons/cg';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'View Profile',
    path: '/adminProfile',
    icon: <i class="far fa-user-circle"></i>,
    cName: 'nav-text'
  },
  {
    title: 'View Customers',
    path: '/customerList',
    icon: <CgIcons.CgDetailsMore />,
    cName: 'nav-text'
  },

  {
    title: 'Create Bill',
    path: '/createBill',
    icon: <IoIcons.IoIosCreate />,

    cName: 'nav-text'
  },
  /*Admin Functionalities*/
  {
    title: 'View Bills',
    path: '/allBills',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Payment History',
    path: '/allPayment',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  
  {
    title: 'Add Energy Meter',
    path: '/adminEnergyMeter',
    icon: <i class="fas fa-sign-out-alt"></i>,
    cName: 'nav-text'
  },
  {
    title: 'View Registered Homes',
    path: '/viewregisteredhomes',
    icon:  <i class="fa fa-undo"></i>,
    cName: 'nav-text'
  },

  {
    title: 'View All Homes',
    path: '/viewhome',
    icon: <i class="fas fa-sign-out-alt"></i>,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <i class="fas fa-sign-out-alt"></i>,
    cName: 'nav-text'
  },
  

];