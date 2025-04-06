import {configureStore} from '@reduxjs/toolkit'
import musicReducer from '../features/musicSlice'
import createSagaMiddleware from 'redux-saga'
import demoReducer from '../features/demoSlice'
import danReducer from '../features/danSlice'
// import audioSaga from '../features/audioSaga'   
import musicSaga from '../features/audioSaga'
import audioReducer from '../features/audioSlice'

const sagaMiddleware = createSagaMiddleware();

export const store =  configureStore({
    reducer:{
            music : musicReducer,
            demo: demoReducer,
            dan:danReducer,
            audio:audioReducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),

    // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware],
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//           serializableCheck: false,  // Disable serializability check here
//         }).concat(sagaMiddleware),  // Add your saga middleware
})
sagaMiddleware.run(musicSaga);
export default store
// sagaMiddleware.run();
