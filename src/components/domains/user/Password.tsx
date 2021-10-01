import React, { useCallback, useState } from 'react'

import { useAuthDispatch } from '../../../contexts/auth'
import { supabase } from '../../../supabase/supabaseClient'
import { Button } from '../../ui/Button'
import { InputWithLabel } from '../../ui/Input'

import './password.scss'

export const Password = () => {
	const [newPassword, setNewPassword] = useState('')
	const [error, setError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const dispatch = useAuthDispatch()

	const handleChangePassword = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		setNewPassword(e.currentTarget.value)
	}, [])

	const handleUpdatePassword = async () => {
		try {
			setError(false)
			setIsLoading(true)

			if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/.test(newPassword)) {
				setError(true)

				return
			}

			const { data, error } = await supabase.auth.update({
				password: newPassword,
			})

			if (error) {
				alert(error)
			} else {
				if (data) {
					dispatch?.updateAuth(data)
				}

				setNewPassword('')
			}
		} catch (e) {
			alert(e)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="password-change-container">
			<h3 className="password-change-little-hero">Change Password</h3>
			{error ? (
				<ul className="password-change-error-list">
					<li className="password-change-error">Contains at least 8 characters.</li>
					<li className="password-change-error">Contains at least one uppercase.</li>
					<li className="password-change-error">Contains at least one number.</li>
				</ul>
			) : null}
			<div className="password-change-form-container">
				<InputWithLabel
					className="password-change-form"
					labelProps={{ label: 'New password' }}
					inputProps={{ name: 'newPassword', value: newPassword, type: 'password', onChange: handleChangePassword }}
				/>
				<Button
					name="password-change"
					className="password-change-button"
					disabled={newPassword === '' || error || isLoading}
					onClick={handleUpdatePassword}
				>
					Save changes
				</Button>
			</div>
		</div>
	)
}
