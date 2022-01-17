import { ReactNode, VFC } from 'react'

import { useFetchCategories } from '../../hooks/useCategories'
import { Toast } from '../ui/Toast'

import { Header } from './Header'

import './layout.scss'

export const Layout: VFC<{ children: ReactNode }> = ({ children }) => {
	useFetchCategories()

	return (
		<>
			<Header />
			<main className="layout-main">{children}</main>
			<Toast />
		</>
	)
}
