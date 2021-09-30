import { useCallback, useState, VFC } from 'react'
import classnames from 'classnames'

import { SigninSection } from '../../auth/SigninSection'
import { SignupSection } from '../../auth/SignupSection'

import './authSection.scss'

type AuthTabType = 'Sign in' | 'Sign up'

const AuthTab: AuthTabType[] = ['Sign in', 'Sign up']

const AuthSectionUI: VFC<{ authType: AuthTabType }> = ({ authType }) => {
	switch (authType) {
		case 'Sign in':
			return <SigninSection />
		case 'Sign up':
			return <SignupSection />
		default:
			return <SigninSection />
	}
}

export const AuthSection = () => {
	const [authType, setAuthType] = useState<AuthTabType>('Sign in')

	const handleChangeAuthTab = useCallback((authType: AuthTabType) => {
		setAuthType(authType)
	}, [])

	return (
		<div className="auth-section-container">
			<div className="auth-section-tab">
				{AuthTab.map((tab) => {
					return (
						<a
							key={tab}
							className={classnames(
								'auth-section-tab-link',
								authType === tab ? 'auth-section-selected-tab' : 'auth-section-not-selected'
							)}
							onClick={() => handleChangeAuthTab(tab)}
						>
							<span>{tab}</span>
						</a>
					)
				})}
			</div>
			<div className="auth-section-inner">
				<AuthSectionUI authType={authType} />
			</div>
		</div>
	)
}
