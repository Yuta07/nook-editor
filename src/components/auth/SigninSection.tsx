import React, { useCallback, useEffect, useState } from 'react'

import { useAuthDispatch } from '../../contexts/auth'
import { supabase } from '../../supabase/supabaseClient'
import { Button } from '../ui/Button'
import { InputWithLabel } from '../ui/Input'
import { Loading } from '../ui/Loading'

import './signinSection.scss'

export const SigninSection = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [isSubmit, setIsSubmit] = useState(false)
	const [error, setError] = useState('')

	const dispatch = useAuthDispatch()

	useEffect(() => {
		const abortController = new AbortController()

		async function signin() {
			try {
				const { user, error } = await supabase.auth.signIn({
					email: email,
					password: password,
				})

				if (error) {
					setError(error.message)
				}

				if (user) {
					dispatch?.successAuth(user)
				}
			} catch (e) {
				alert(e)
			} finally {
				setIsSubmit(false)
			}
		}

		if (isSubmit) {
			void signin()
		}

		return () => {
			abortController?.abort()
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
