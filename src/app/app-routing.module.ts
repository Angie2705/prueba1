import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'addauto',
    loadChildren: () => import('./pages/addauto/addauto.module').then( m => m.AddautoPageModule)
  },
  {
    path: 'addviaje',
    loadChildren: () => import('./pages/addviaje/addviaje.module').then( m => m.AddviajePageModule)
  },
  {
    path: 'infoviaje',
    loadChildren: () => import('./pages/infoviaje/infoviaje.module').then( m => m.InfoviajePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'modificaruser',
    loadChildren: () => import('./pages/modificaruser/modificaruser.module').then( m => m.ModificaruserPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'pprincipal',
    loadChildren: () => import('./pages/pprincipal/pprincipal.module').then( m => m.PprincipalPageModule)
  },
  {
    path: 'reclamo',
    loadChildren: () => import('./pages/reclamo/reclamo.module').then( m => m.ReclamoPageModule)
  },
  {
    path: 'recuperacontra',
    loadChildren: () => import('./pages/recuperacontra/recuperacontra.module').then( m => m.RecuperacontraPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
