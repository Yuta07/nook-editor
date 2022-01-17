import { User } from '@supabase/supabase-js'
import { useCallback, useReducer } from 'react'

export type AuthState =
	| undefined // before init
	| {
			isLoading: true
			loggedIn: false
			user: null
	  }
	| {
			isLoading: false
			loggedIn: true
			user: User | null
	  }
	| {
			isLoading: false
			loggedIn: false
			user: null
	  }

const START_FETCH_AUTH = 'START_FETCH_AUTH'
const FAIL_FETCH_AUTH = 'FAIL_FETCH_AUTH'
const SUCCESS_AUTH = 'SUCCESS_AUTH'
const REMOVE_AUTH = 'REMOVE_AUTH'
const UPDATE_AUTH = 'UPDATE_AUTH'

type startFetchAuthAction = {
	type: typeof START_FETCH_AUTH
}

type failFetchAuthAction = {
	type: typeof FAIL_FETCH_AUTH
}

type successAuthAction = {
	type: typeof SUCCESS_AUTH
	payload: User
}

type removeAuthAction = {
	type: typeof REMOVE_AUTH
}

type updateAuthAction = {
	type: typeof UPDATE_AUTH
	payload: User
}

export type ActionType =
	| startFetchAuthAction
	| failFetchAuthAction
	| successAuthAction
	| removeAuthAction
	| updateAuthAction

const initialStateFactory: AuthState = undefined

function reducer(state: AuthState, action: ActionType): AuthState {
	switch (action.type) {
		case 'START_FETCH_AUTH':
			return {
				...state,
				isLoading: true,
				loggedIn: false,
				user: null,
			}
		case 'FAIL_FETCH_AUTH':
			return {
				...state,
				isLoading: false,
				loggedIn: false,
				user: null,
			}
		case 'SUCCESS_AUTH':
			return {
				...state,
				isLoading: false,
				loggedIn: true,
				user: action.payload,
			}
		case 'REMOVE_AUTH':
			return {
				...state,
				isLoading: false,
				loggedIn: false,
				user: null,
			}
		case 'UPDATE_AUTH':
			return {
				...state,
				isLoading: false,
				loggedIn: true,
				user: action.payload,
			}
	}
}

export const useAuthCore = () => {
	const [state, dispatch] = useReducer(reducer, initialStateFactory)

	const startFetchAuth = useCallback(() => {
		dispatch({ type: 'START_FETCH_AUTH' })
	}, [dispatch])

	const failFetchAuth = useCallback(() => {
		dispatch({ type: 'FAIL_FETCH_AUTH' })
	}, [dispatch])

	const successAuth = useCallback(
		(user: User) => {
			dispatch({ type: 'SUCCESS_AUTH', payload: user })
		},
		[dispatch]
	)

	const removeAuth = useCallback(() => {
		dispatch({ type: 'REMOVE_AUTH' })
	}, [dispatch])

	const updateAuth = useCallback(
		(user: User) => {
			dispatch({ type: 'UPDATE_AUTH', payload: user })
		},
		[dispatch]
	)

	return {
		state,
		startFetchAuth,
		failFetchAuth,
		successAuth,
		removeAuth,
		updateAuth,
	}
}
