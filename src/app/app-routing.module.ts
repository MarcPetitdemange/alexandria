import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./page/connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./page/create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
		path: 'tabs',
		loadChildren: () => import('./page/tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard]
	},
  {
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
  {
    path: '**',
		redirectTo: '/not-found',
  },
  {
    path: 'not-found',
    loadChildren: () => import('./page/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },  {
    path: 'book-detail',
    loadChildren: () => import('./page/details/book-detail/book-detail.module').then( m => m.BookDetailPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
