import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// ======================
  import {createStore} from 'redux';
  import {Provider} from 'react-redux';
  import rootReducer from '../src/service/Reducers/index';

  const store = createStore(rootReducer)
// ======================

// ----------------------------------------------------------------------
// axios.defaults.baseURL = 'http://192.168.0.21:8000/'
axios.defaults.baseURL = 'https://king-place-backend.onrender.com/'
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store ={store}>
        <App />
    </Provider>

);

serviceWorker.unregister();

reportWebVitals();
