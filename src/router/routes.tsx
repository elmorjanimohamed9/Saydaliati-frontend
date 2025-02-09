import { lazy } from 'react';
const Index = lazy(() => import('../pages/Pharmacies'));
const PharmacyComments = lazy(() => import('../pages/PharmacyComments'));
const Login = lazy(() => import('../pages/auth/Login'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));

const routes = [
    // dashboard
    {
        path: '/pharmacies',
        element: <Index />,
        layout: 'default',
    },
    {
        path: '/pharmacies/:pharmacyId/comments',
        element: <PharmacyComments />,
        layout: 'default',
    },

    // auth routes
    {
        path: '/',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
        layout: 'blank',
    },
    {
        path: '/reset-password',
        element: <ResetPassword />,
        layout: 'blank',
    },
];

export { routes };