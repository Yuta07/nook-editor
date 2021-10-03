import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { App } from './App'
import { AuthProviderContainer } from './contexts/auth'
import { CategoriesProviderContainer } from './contexts/categories'

import 'styles/global.scss'

ReactDOM.render(
	<Router>
		<React.StrictMode>
			<AuthProviderContainer>
				<CategoriesProviderContainer>
					<App />
				</CategoriesProviderContainer>
			</AuthProviderContainer>
		</React.StrictMode>
	</Router>,
	document.getElementById('root')
)
