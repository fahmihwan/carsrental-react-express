import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import startedBookingSlice from "../features/startedBookingSlice";
import storage from 'redux-persist/lib/storage';
import userSlice from "../features/userSlice";

// mengabungkan lebih dari 1 slice atau reducers, kedalam rootReducer
const rootReducer = combineReducers({
    startedBooking: startedBookingSlice,
    user: userSlice
    // tambahkan di sini jika ada slice lagi 
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['startedBooking', 'user'], // Hanya persist state dari startedBooking & user yang akan di persist (opsional)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }), // supaya ga error aja sih
    // middleware: getDefaultmiddleware => getDefaultmiddleware({
    //     serializableCheck: {
    //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //     },
    // })
})


const persistor = persistStore(store);

export { store, persistor };











