import { createContext, ReactNode, useEffect, VFC } from 'react'
import { User } from '@supabase/supabase-js'

import { AuthState, useAuthCore } from './useAuthCore'

import { supabase } from '../../supabase/supabaseClient'

type Props = {
	children: ReactNode
}

export type DispatchAction = {
	startFetchAuth: () => void
	failFetchAuth: () => void
	successAuth: (user: User) => void
	removeAuth: () => void
}

export const AuthStateContext = createContext<AuthState | undefined>(undefined)
export const AuthDispatchContext = createContext<DispatchAction | undefined>(undefined)

export const AuthProviderContainer: VFC<Props> = (props) => {
	const { state, startFetchAuth, failFetchAuth, successAuth, removeAuth } = useAuthCore()

	useEffect(() => {
		const init = () => {
			try {
				startFetchAuth()

				const session = supabase.auth.session()

				if (session && session.user) {
					successAuth(session.user)
				} else {
					failFetchAuth()
				}
			} catch {
				failFetchAuth()
			}
		}

		init()
	}, [])

	return (
		<AuthStateContext.Provider value={state}>
			<AuthDispatchContext.Provider value={{ startFetchAuth, failFetchAuth, successAuth, removeAuth }}>
				{props.children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	)
}
