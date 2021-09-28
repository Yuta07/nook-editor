import { ReactNode, VFC } from 'react'

import { Header } from './Header'

export const Layout: VFC<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	)
}
