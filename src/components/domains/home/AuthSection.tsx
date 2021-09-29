import { useCallback, useState } from 'react'

import './authSection.scss'

const AuthTabType = ['Sign in', 'Sign up', 'Forgot']

export const AuthSection = () => {
	const [authType, setAuthType] = useState<'Sign in' | 'Sign up' | 'Forgot'>('Sign in')

	const handleChangeAuthTab = useCallback(() => {
		setAuthType('Sign in')
	}, [])

	console.log(authType)

	return (
		<div className="auth-section-container">
			<div className="auth-section-tab">
				{AuthTabType.map((tab) => {
					return (
						<a key={tab} onClick={handleChangeAuthTab}>
							<span>{tab}</span>
						</a>
					)
				})}
			</div>
		</div>
	)
}
