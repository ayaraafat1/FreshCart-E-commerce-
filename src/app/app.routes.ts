import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';

export const routes: Routes = [

    {
        path: '',
        component: AuthLayoutComponent,canActivate:[loggedGuard],
        children: [
            {
                path: 'login',
                title: 'FreshCart.Login',
                loadComponent: () =>
                    import('./pages/login/login.component').then(
                        (m) => m.LoginComponent
                    ),
            },
            {
                path: 'register',
                title: 'FreshCart.Register',
                loadComponent: () =>
                    import('./pages/register/register.component').then(
                        (m) => m.RegisterComponent
                    ),
            },
            {
                path: 'forgotpassword',
                title: 'FreshCart.forgotPassword',
                loadComponent: () =>
                    import('./pages/forgotpassword/forgotpassword.component').then(
                        (m) => m.ForgotpasswordComponent
                    ),
            }
        ],
    },

    {
        path: '',
        component: MainLayoutComponent,canActivate:[authGuard],
        children: [
            {
                path: 'home',
                title: 'FreshCart.Home',
                loadComponent: () =>
                    import('./pages/home/home.component').then(
                        (m) => m.HomeComponent
                    ),
            },
            {
                path: 'cart',
                title: 'FreshCart.Cart',
                loadComponent: () =>
                    import('./pages/cart/cart.component').then(
                        (m) => m.CartComponent
                    ),
            },
            {
                path: 'products',
                title: 'FreshCart.Products',
                loadComponent: () =>
                    import('./pages/products/products.component').then(
                        (m) => m.ProductsComponent
                    ),
            },
            {
                path: 'categories',
                title: 'FreshCart.Categories',
                loadComponent: () =>
                    import('./pages/categories/categories.component').then(
                        (m) => m.CategoriesComponent
                    ),
            },
            {
                path: 'brands',
                title: 'FreshCart.Brands',
                loadComponent: () =>
                    import('./pages/brands/brands.component').then(
                        (m) => m.BrandsComponent
                    ),
            },
            {
                path: 'checkout',
                title: 'FreshCart.Checkout',
                loadComponent: () =>
                    import('./pages/checkout/checkout.component').then(
                        (m) => m.CheckoutComponent
                    ),
            },
            {
                path: 'wishlist',
                title: 'FreshCart.WishList',
                loadComponent: () =>
                    import('./pages/wishlist/wishlist.component').then(
                        (m) => m.WishlistComponent
                    ),
            },
            {
                path: 'details/:id',
                title: 'FreshCart.Details',
                loadComponent: () =>
                    import('./pages/details/details.component').then(
                        (m) => m.DetailsComponent
                    ),
            },
            {
                path: '**',
                title: 'Not Found',
                loadComponent: () =>
                    import('./pages/not-found/not-found.component').then(
                        (m) => m.NotFoundComponent
                    ),
            },
        ],
    },
];

