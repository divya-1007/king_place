import ReactDOM from 'react-dom/client';

//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// ----------------------------------------------------------------------

axios.defaults.baseURL = 'http://192.168.0.18:8000/'
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);

serviceWorker.unregister();

reportWebVitals();
