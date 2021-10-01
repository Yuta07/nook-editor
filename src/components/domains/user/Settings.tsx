import React, { useCallback, useState } from 'react'

import { Account } from './Account'
import { Password } from './Password'

import './settings.scss'

export const Settings = () => {
	const [settingsType, setSettingsType] = useState<'Account' | 'Password'>('Account')

	const handleChangeSettingsType = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, type: 'Account' | 'Password') => {
			e.preventDefault()

			setSettingsType(type)
		},
		[]
	)

	return (
		<div className="settings-container">
			<nav className="settings-nav">
				<span className="settings-title">Account Settings</span>
				<a
					className={settingsType === 'Account' ? 'settings-selected-tab-type' : 'settings-tab-type'}
					onClick={(e) => handleChangeSettingsType(e, 'Account')}
				>
					Account
				</a>
				<a
					className={settingsType === 'Password' ? 'settings-selected-tab-type' : 'settings-tab-type'}
					onClick={(e) => handleChangeSettingsType(e, 'Password')}
				>
					Password
				</a>
			</nav>
			<div className="settings-content">{settingsType === 'Account' ? <Account /> : <Password />}</div>
		</div>
	)
}
