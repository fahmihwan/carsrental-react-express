import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import startedBookingSlice from "../features/startedBookingSlice";
import storage from 'redux-persist/lib/storage';



// mengabungkan lebih dari 1 slice atau reducers, kedalam rootReducer
const rootReducer = combineReducers({
    startedBooking: startedBookingSlice
    // tambahkan di sini jika ada slice lagi 
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['startedBooking'], // Hanya persist state dari startedBooking yang akan di persist (opsional)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }), // supaya ga error aja sih
})


const persistor = persistStore(store);

export { store, persistor };











