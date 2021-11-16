import React, { useCallback, useEffect, useState } from 'react'

import { Button } from '../../components/ui/Button'
import { InputWithLabel } from '../../components/ui/Input'
import { Loading } from '../../components/ui/Loading'
import { useAuthDispatch } from '../../contexts/auth'
import { useUIDispatch } from '../../contexts/ui'
import { supabase } from '../../supabase/supabaseClient'

import './signinSection.scss'

export const SigninSection = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [isSubmit, setIsSubmit] = useState(false)
	const [error, setError] = useState('')

	const authDispatch = useAuthDispatch()
	const uiDispatch = useUIDispatch()

	useEffect(() => {
		let didCancel = false

		async function signin() {
			try {
				const { user, error } = await supabase.auth.signIn({
					email: email,
					password: password,
				})

				if (error) {
					setError(error.message)
				}

				if (user && !didCancel) {
					uiDispatch?.showToast({ type: 'SUCCESS', message: 'Successful login.' })

					authDispatch?.successAuth(user)
				}
			} catch (e) {
				uiDispatch?.showToast({ type: 'ERROR', message: 'Login failed.' })

				alert(e)
			} finally {
				setIsSubmit(false)
			}
		}

		if (isSubmit) {
			void signin()
		}

		return () => {
			didCancel = true
		}
	}, [isSubmit])

	const handleInputChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget
		switch (name) {
			case 'email':
				setEmail(value)
				break
			case 'password':
				setPassword(value)
				break
		}
	}, [])

	const handleSignin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setIsSubmit(true)
	}

	const disabled = email === '' || password === ''

	return (
		<form onSubmit={handleSignin}>
			{error ? <p className="signin-section-error">{error}</p> : null}
			<InputWithLabel
				className="signin-section-input"
				labelProps={{ label: 'Email' }}
				inputProps={{ name: 'email', value: email, type: 'email', onChange: handleInputChange }}
			/>
			<InputWithLabel
				className="signin-section-input"
				labelProps={{ label: 'Password' }}
				inputProps={{ name: 'password', value: password, type: 'password', onChange: handleInputChange }}
			/>
			<div className="signin-section-button-container">
				<Button name="signin-button" type="submit" disabled={disabled} className="signin-section-form-button">
					{isSubmit ? <Loading /> : 'Sign in'}
				</Button>
			</div>
		</form>
	)
}
