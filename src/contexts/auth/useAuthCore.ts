import { useCallback, useReducer } from 'react'

export type AuthState =
	| undefined // before init
	| {
			isLoading: true
			loggedIn: false
	  }
	| {
			isLoading: false
			loggedIn: true
	  }
	| {
			isLoading: false
			loggedIn: false
	  }

const START_FETCH_AUTH = 'START_FETCH_AUTH'
const FAIL_FETCH_AUTH = 'FAIL_FETCH_AUTH'
const SUCCESS_AUTH = 'SUCCESS_AUTH'
const REMOVE_AUTH = 'REMOVE_AUTH'

type startFetchAuthAction = {
	type: typeof START_FETCH_AUTH
}

type failFetchAuthAction = {
	type: typeof FAIL_FETCH_AUTH
}

type successAuthAction = {
	type: typeof SUCCESS_AUTH
}

type removeAuthAction = {
	type: typeof REMOVE_AUTH
}

export type ActionType = startFetchAuthAction | failFetchAuthAction | successAuthAction | removeAuthAction

const initialStateFactory: AuthState = undefined

function reducer(state: AuthState, action: ActionType): AuthState {
	switch (action.type) {
		case 'START_FETCH_AUTH':
			return {
				...state,
				isLoading: true,
				loggedIn: false,
			}
		case 'FAIL_FETCH_AUTH':
			return {
				...state,
				isLoading: false,
				loggedIn: false,
			}
		case 'SUCCESS_AUTH':
			return {
				...state,
				isLoading: false,
				loggedIn: true,
			}
		case 'REMOVE_AUTH':
			return {
				...state,
				isLoading: false,
				loggedIn: false,
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

	const successAuth = useCallback(() => {
		dispatch({ type: 'SUCCESS_AUTH' })
	}, [dispatch])

	const removeAuth = useCallback(() => {
		dispatch({ type: 'REMOVE_AUTH' })
	}, [dispatch])

	return {
		state,
		startFetchAuth,
		failFetchAuth,
		successAuth,
		removeAuth,
	}
}
