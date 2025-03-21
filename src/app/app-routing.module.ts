import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./login-signup/login-signup.module').then(m => m.LoginSignupPageModule),
		pathMatch: 'full'
	},
	{
		path: 'tabs',
		loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
	}
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
