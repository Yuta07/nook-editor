import { createContext, ReactNode, VFC } from 'react'

import { UIState, ToastType, useUICore } from './useUICore'

type Props = {
	children: ReactNode
}

export type DispatchAction = {
	showToast: (toast: Omit<ToastType, 'id' | 'time'>) => void
	removeToast: (toastId: ToastType['id']) => void
}

export const UIStateContext = createContext<UIState>({ toasts: [] })
export const UIDispatchContext = createContext<DispatchAction | undefined>(undefined)

export const UIProviderContainer: VFC<Props> = (props) => {
	const { state, showToast, removeToast } = useUICore()

	return (
		<UIStateContext.Provider value={state}>
			<UIDispatchContext.Provider value={{ showToast, removeToast }}>{props.children}</UIDispatchContext.Provider>
		</UIStateContext.Provider>
	)
}
