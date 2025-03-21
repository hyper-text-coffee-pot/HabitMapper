import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthRedirectGuard: CanActivateFn = (route, state) =>
{
	const router = inject(Router);
	const user = localStorage.getItem('user');
	if (user)
	{
		router.navigate(['/tabs']); // Redirect to /tabs
		return false;
	}
	else
	{
		return true;
	}
};
