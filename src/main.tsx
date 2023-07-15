import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { MantineProvider } from '@mantine/core'
import {
	// createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import routes from './routes/routes';

ReactDOM.createRoot(document.getElementById('root')!).render(

	<MantineProvider
		withCSSVariables withGlobalStyles withNormalizeCSS
		theme={{
			primaryColor: 'cyan',


			shadows: {
				md: '1px 1px 3px rgba(0, 0, 0, .25)',
				xl: '5px 5px 3px rgba(0, 0, 0, .25)',
			},

			headings: {
				fontFamily: 'Roboto, sans-serif',
				sizes: {
					h1: { fontSize: '2rem' },
				},
			},
		}}
	>
		<RouterProvider router={routes} />
	</MantineProvider>
)
