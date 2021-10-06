import React, { useCallback, useEffect, useState } from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'

import { useAuthDispatch } from '../../contexts/auth'
import { supabase } from '../../supabase/supabaseClient'
import { Button } from '../ui/Button'
import { InputWithLabel } from '../ui/Input'
import { Loading } from '../ui/Loading'

import './signupSection.scss'

export const SignupSection = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [isSubmit, setIsSubmit] = useState(false)
	const [error, setError] = useState('')

	const [isLeastTxtEight, setIsLeastTxtEight] = useState(false)
	const [isLeastUpper, setIsLeastUpper] = useState(false)
	const [isLeastOneNum, setIsLeastOneNum] = useState(false)

	const dispatch = useAuthDispatch()

	useEffect(() => {
		if (/^[a-zA-Z\d]{8,100}$/.test(password)) {
			setIsLeastTxtEight(true)
		} else {
			setIsLeastTxtEight(false)
		}

		if (/[A-Z]/.test(password)) {
			setIsLeastUpper(true)
		} else {
			setIsLeastUpper(false)
		}

		if (/[\d]/.test(password)) {
			setIsLeastOneNum(true)
		} else {
			setIsLeastOneNum(false)
		}
	}, [password])

	useEffect(() => {
		let didCancel = false

		async function signup() {
			try {
				const { user, error } = await supabase.auth.signUp({
					email: email,
					password: password,
				})

				if (error) {
					setError(error.message)
				}

				if (user && !didCancel) {
					dispatch?.successAuth(user)
				}
			} catch (e) {
				alert(e)
			} finally {
				setIsSubmit(false)
			}
		}

		if (isSubmit) {
			void signup()
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

	const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setIsSubmit(true)
	}

	const disabled = !isLeastTxtEight || !isLeastUpper || !isLeastOneNum || email === ''

	return (
		<form onSubmit={handleSignup}>
			{error ? <p className="signup-section-error">{error}</p> : null}
			<InputWithLabel
				className="signup-section-input"
				labelProps={{ label: 'Email', required: true }}
				inputProps={{ name: 'email', value: email, type: 'email', onChange: handleInputChange }}
			/>
			<InputWithLabel
				className="signup-section-input"
				labelProps={{ label: 'Password', required: true }}
				inputProps={{ name: 'password', value: password, type: 'password', onChange: handleInputChange }}
			/>
			<div className="signup-section-password-policy">
				<p className={isLeastTxtEight ? 'signup-section-policy-success' : 'signup-section-policy-check'}>
					<FaRegCheckCircle size={16} color={isLeastTxtEight ? 'var(--color-main)' : 'var(--color-gray)'} />
					Contains at least 8 characters.
				</p>
				<p className={isLeastUpper ? 'signup-section-policy-success' : 'signup-section-policy-check'}>
					<FaRegCheckCircle size={16} color={isLeastUpper ? 'var(--color-main)' : 'var(--color-gray)'} />
					Contains at least one uppercase.
				</p>
				<p className={isLeastOneNum ? 'signup-section-policy-success' : 'signup-section-policy-check'}>
					<FaRegCheckCircle size={16} color={isLeastOneNum ? 'var(--color-main)' : 'var(--color-gray)'} />
					Contains at least one number.
				</p>
			</div>
			<div className="signup-section-button-container">
				<Button name="signup-button" type="submit" disabled={disabled} className="signup-section-form-button">
					{isSubmit ? <Loading /> : 'Sign up'}
				</Button>
			</div>
		</form>
	)
}
