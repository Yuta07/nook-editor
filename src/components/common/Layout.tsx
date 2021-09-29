import { ReactNode, VFC } from 'react'

import { Header } from './Header'

import './layout.scss'

export const Layout: VFC<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<Header />
			<main className="layout-main">{children}</main>
		</>
	)
}
