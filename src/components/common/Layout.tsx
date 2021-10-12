import { ReactNode, VFC } from 'react'

import { Header } from './Header'
import { Toast } from 'components/ui/Toast'
import { useFetchCategories } from 'hooks/useCategories'

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
