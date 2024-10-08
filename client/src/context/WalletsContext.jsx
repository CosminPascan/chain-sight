import { createContext, useReducer } from 'react'

const WalletsContext = createContext()

const walletsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WALLETS':
            return {
                wallets: action.payload,
            }
        case 'CREATE_WALLET':
            return {
                wallets: [...state.wallets, action.payload],
            }
        case 'UPDATE_WALLET':
            return {
                wallets: state.wallets.map((w) =>
                    w.id === action.payload.id ? action.payload : w
                ),
            }
        case 'DELETE_WALLET':
            return {
                wallets: state.wallets.filter(
                    (w) => w.id !== action.payload.id
                ),
            }
        default:
            return state
    }
}

const WalletsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(walletsReducer, {
        wallets: [],
    })

    return (
        <WalletsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WalletsContext.Provider>
    )
}

export { WalletsContext, WalletsProvider }
