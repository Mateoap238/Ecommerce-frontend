import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./business/components/dashboard/dashboard.component').then(
            (m) => m.default
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./business/components/products/products.component').then(
            (m) => m.default
          ),
      },
      {
        path: 'management',
        loadComponent: () =>
          import(
            './business/components/admin-products/admin-products.component'
          ).then((m) => m.default),
      },
      {
        path: 'offers',
        loadComponent: () =>
          import('./business/components/offers/offers.component').then(
            (m) => m.default
          ),
      },
      {
        path: 'about-us',
        loadComponent: () =>
          import('./business/components/about-us/about-us.component').then(
            (m) => m.default
          ),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
