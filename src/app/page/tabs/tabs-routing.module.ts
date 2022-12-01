import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'library',
        loadChildren: () => import('./library/library.module').then(m => m.LibraryPageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./myAccount/myAccount.module').then(m => m.MyAccountPageModule)
      },
      {
        path: 'library/detail',
        loadChildren: () => import('../../page/details/book-detail/book-detail.module').then((m) => m.BookDetailPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/library',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
