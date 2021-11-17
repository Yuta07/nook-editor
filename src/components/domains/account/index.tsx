import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuthDispatch, useAuthState } from '../../../contexts/auth'
import { useUIDispatch } from '../../../contexts/ui'
import { Button } from '../../ui/Button'
import { InputWithLabel } from '../../ui/Input'
import { supabase } from '../../../supabase/supabaseClient'

import './account.scss'

export const Account = () => {
	const state = useAuthState()

	const [newEmail, setNewEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const authDispatch = useAuthDispatch()
	const uiDispatch = useUIDispatch()

	const history = useHistory()

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
					uiDispatch?.showToast({ type: 'SUCCESS', message: 'Successful change of email address.' })

					authDispatch?.updateAuth(data)
				}
			}
		} catch (e) {
			uiDispatch?.showToast({ type: 'ERROR', message: 'Failed to change email address.' })

			alert(e)
		} finally {
			setIsLoading(false)
		}
	}

	const handleClickLogout = useCallback(async () => {
		await supabase.auth
			.signOut()
			.then(() => {
				uiDispatch?.showToast({ type: 'SUCCESS', message: 'Logged out.' })

				authDispatch?.removeAuth()

				history.push('/')
			})
			.catch((e) => {
				uiDispatch?.showToast({ type: 'ERROR', message: 'Logout failure.' })

				alert(e)
			})
	}, [])

	const handleClickDeleteAccount = useCallback(async () => {
		if (window.confirm('Are you sure?')) {
			if (state && state.user) {
				await supabase.from('articles').delete().eq('user_id', state.user.id)
				const { error } = await supabase.rpc('deleteUser', { id: state.user.id })

				if (error) {
					alert(error.message)
				} else {
					await supabase.auth.signOut()

					authDispatch?.removeAuth()
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
