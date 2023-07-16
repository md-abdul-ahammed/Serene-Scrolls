import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import { NotFound } from '../pages/404';
import AuthLayout from '../layouts/AuthLayout';
import { MainLayout } from '../layouts/MainLayout';
import BookDetails from '../pages/BookDetails';
import Home from '../pages/Home';
import AuthRoute from './AuthRoute';
import AllBooks from '../pages/AllBooks';
import WatchList from '../pages/WatchList';
import ReadingList from '../pages/ReadingList';
import PrivateRoute from './PrivateRoute';



const routes = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/watchlist',
				element: <PrivateRoute>
					<WatchList />
				</PrivateRoute>,
			},
			{
				path: '/reading',
				element: <PrivateRoute>
					<ReadingList />
				</PrivateRoute>,
			},
			{
				path: '/book/:id',
				element: <BookDetails />,
			},
			{
				path: '/all',
				element: <AllBooks />,
			},
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
				element: <AuthRoute>
					<Login />
				</AuthRoute>,
			},
			{
				path: 'login',
				element: <AuthRoute>
					<Login />
				</AuthRoute>,
			},
			{
				path: 'signup',
				element: <AuthRoute>
					<SignUp />
				</AuthRoute>,
			},
		],
	},

	{
		path: '*',
		element: <NotFound />,
	},
]);

export default routes;
