import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import { NotFound } from '../pages/404';
import AuthLayout from '../layouts/AuthLayout';
import { MainLayout } from '../layouts/MainLayout';



const routes = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <App />,
			},
			//   {
			//     path: '/products',
			//     element: <Products />,
			//   },
			//   {
			//     path: '/product-details/:id',
			//     element: <ProductDetails />,
			//   },
			//   {
			//     path: '/checkout',
			//     element: <Checkout />,
			//   },
		],
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				index: true,
				element: <Login />,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'signup',
				element: <SignUp />,
			},
		],
	},

	{
		path: '*',
		element: <NotFound />,
	},
]);

export default routes;
