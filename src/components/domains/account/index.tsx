import React, { useCallback, useEffect, useState } from 'react'

import { useAuthDispatch, useAuthState } from '../../../contexts/auth'
import { supabase } from '../../../supabase/supabaseClient'
import { Button } from '../../ui/Button'
import { InputWithLabel } from '../../ui/Input'

import './account.scss'

export const Account = () => {
	const state = useAuthState()

	const [newEmail, setNewEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const dispatch = useAuthDispatch()

	useEffect(() => {
		if (state && state.user && state.user.email) {
			setNewEmail(state.user.email)
		}
	}, [state])

	const handleChangeEmail = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		setNewEmail(e.currentTarget.value)
	}, [])

	const handleUpdateEmail = async () => {
		try {
			setIsLoading(true)

			const { data, error } = await supabase.auth.update({
				email: newEmail,
			})

			if (error) {
				alert(error)
			} else {
				if (data) {
					dispatch?.updateAuth(data)
				}
			}
		} catch (e) {
			alert(e)
		} finally {
			setIsLoading(false)
		}
	}

	const handleClickLogout = useCallback(async () => {
		await supabase.auth
			.signOut()
			.then(() => {
				dispatch?.removeAuth()
			})
			.catch((e) => {
				alert(e)
			})
	}, [])

	const handleClickDeleteAccount = useCallback(async () => {
		if (window.confirm('Are you sure?')) {
			if (state && state.user) {
				const { error } = await supabase.rpc('deleteUser', { id: state.user.id })

				if (error) {
					alert(error.message)
				} else {
					await supabase.auth.signOut()
					dispatch?.removeAuth()
				}
			}
		}
	}, [])

	return (
		<div className="account-container">
			<h2 className="account-hero">Account</h2>
			<div className="account-section">
				<h3 className="account-little-hero">Change email</h3>
				<InputWithLabel
					className="account-email-form"
					labelProps={{ label: 'Email' }}
					inputProps={{ name: 'newEmail', value: newEmail, type: 'email', onChange: handleChangeEmail }}
				/>
				<div className="accout-email-button">
					<Button name="email-change" disabled={newEmail === '' || isLoading} onClick={handleUpdateEmail}>
						Save changes
					</Button>
				</div>
			</div>
			<div className="account-section">
				<h3 className="account-little-hero">Logout</h3>
				<div className="account-section-row">
					<p className="account-section-description">Delete the current session and log out.</p>
					<div className="account-section-button">
						<Button name="logout" onClick={handleClickLogout}>
							Logout
						</Button>
					</div>
				</div>
			</div>
			<div className="account-section">
				<h3 className="account-little-hero">Delete account</h3>
				<div className="account-section-row">
					<p className="account-section-description">By deleteing your account you will lose all your data.</p>
					<div className="account-section-button">
						<Button name="delete-account" className="account-delete-button" onClick={handleClickDeleteAccount}>
							Delete account
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
