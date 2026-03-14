import {configureStore} from '@reduxjs/toolkit';
import {api} from "../api/api.js";
import auth from '../feature/authSlice.js'



export const store = configureStore({
    reducer: {
        [api.reducerPath] : api.reducer,
        auth : auth,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})
