import { useCallback, useReducer } from 'react'

export type ToastType = {
	id: number
	type: 'SUCCESS' | 'ERROR'
	message: string
	time: number
}

export type UIState = {
	toasts: ToastType[]
}

let toastId = 0

function createToast() {
	return toastId++
}

const SHOW_TOAST = 'SHOW_TOAST'
const REMOVE_TOAST = 'REMOVE_TOAST'

type showToast = {
	type: typeof SHOW_TOAST
	payload: ToastType
}

type removeToast = {
	type: typeof REMOVE_TOAST
	payload: ToastType['id']
}

type ActionType = showToast | removeToast

const initialStateFactory: UIState = {
	toasts: [],
}

function reducer(state: UIState, action: ActionType): UIState {
	switch (action.type) {
		case 'SHOW_TOAST':
			return { ...state, toasts: [action.payload, ...state.toasts] }
		case 'REMOVE_TOAST':
			return {
				...state,
				toasts: state.toasts.filter((toast) => {
					return toast.id != action.payload
				}),
			}
	}
}

export const useUICore = () => {
	const [state, dispatch] = useReducer(reducer, initialStateFactory)

	const showToast = useCallback(
		(toast: Omit<ToastType, 'id' | 'time'>) => {
			const newId = createToast()

			dispatch({
				type: 'SHOW_TOAST',
				payload: {
					id: newId,
					type: toast.type,
					message: toast.message,
					time: toast.type === 'SUCCESS' ? 10000000 : 60000,
				},
			})
		},
		[dispatch]
	)

	const removeToast = useCallback(
		(toastId: ToastType['id']) => {
			dispatch({ type: 'REMOVE_TOAST', payload: toastId })
		},
		[dispatch]
	)

	return {
		state,
		showToast,
		removeToast,
	}
}
