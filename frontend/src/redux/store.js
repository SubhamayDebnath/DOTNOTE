import { configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './slice/auth.slice.js'
const store = configureStore({
    reducer:{
        auth: authSliceReducer
    },
    devTools:true
});

export default store