import { Routes } from '@angular/router';
import { publicGuard } from './guards/public.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { authenticatedGuard } from './guards/authenticated.guard';
import { ViewProductComponent } from './pages/products/view-product/view-product.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { ShoppingCartComponent } from './components/pages/shopping-cart/shopping-cart.component';
import { BrowseProductsComponent } from './pages/browse-products/browse-products.component';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';

export const routes: Routes = [
    // Auth
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [publicGuard]
    },
    // App
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            // Home
            { path: '', component: HomeComponent },
            // View Product
            {
                path: 'products/:categorySlug/:id/:productSlug',
                component: ViewProductComponent
            },
            {
                path: 'shopping-cart',
                component: ShoppingCartComponent
            },
            {
                path: 'order-confirmation',
                component: OrderConfirmationComponent
            },
            {
                path: 'browse',
                component: BrowseProductsComponent
            },
            // FAQ
            {
                path: 'faqs',
                component: FaqsComponent
            },
            {
                path: 'terms-conditions',
                component: TermsConditionsComponent
            },
            {
                path: 'privacy-policy',
                component: PrivacyPolicyComponent
            },
        ]
    },

];
