import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from './layout/DefaultLayout';
import ListStyle from './pages/ListStyle';
import { QueryClient, QueryClientProvider } from 'react-query';
import ListCommit from './pages/CommitPage';
import ListPull from './pages/ListPull';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ToastContainer closeButton={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<ListStyle />} />
            <Route path='/pulls' element={<ListPull />} />
            <Route path="/pulls/:id" element={<ListCommit />} />
            {/* <Route element={<ListProject />} path="projects" />
            <Route element={<DetailProject />} path="project/:id" /> */}
          </Route>
          {/* <Route path="/app" element={<App />} />
          <Route path="/" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
