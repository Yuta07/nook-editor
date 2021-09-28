import { createContext, ReactNode, useEffect, VFC } from 'react'
import { AuthState, useAuthCore } from './useAuthCore'

import { supabase } from '../../supabase/supabaseClient'

type Props = {
	children: ReactNode
}

type DispatchAction = {
	startFetchAuth: () => void
	failFetchAuth: () => void
	successAuth: () => void
	removeAuth: () => void
} | null

export const AuthStateContext = createContext<AuthState | undefined>(undefined)
export const AuthDispatchContext = createContext<DispatchAction>(null)

export const AuthProviderContainer: VFC<Props> = (props) => {
	const { state, startFetchAuth, failFetchAuth, successAuth, removeAuth } = useAuthCore()

	useEffect(() => {
		try {
			startFetchAuth()

			const session = supabase.auth.session()

			if (session === null) {
				failFetchAuth()
			}
		} catch {
			failFetchAuth()
		}
	}, [])

	return (
		<AuthStateContext.Provider value={state}>
			<AuthDispatchContext.Provider value={{ startFetchAuth, failFetchAuth, successAuth, removeAuth }}>
				{props.children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	)
}
