import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { extendedApiSlice } from './features/posts/postsSlice';
import App from './App';
import { store } from './app/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());
store.dispatch(extendedApiSlice.endpoints.getStatuses.initiate());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />}/>
        </Routes>
      </Router>
    </Provider>
  // </React.StrictMode>
);
