import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from './layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import ListStyle from './pages/ListStyle';
import { QueryClient, QueryClientProvider } from 'react-query';
import ListCommit from './pages/CommitPage';
import CommitPageOAuth from './pages/CommitPageOAuth';
import ListPull from './pages/ListPull';
import ListCommits from './pages/ListCommit';
import UserInfo from './components/UserGithubInfo.ts';
import { getCookie } from './utils/shared';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
const token = getCookie('token');
console.log('token at index', token)
/*const PrivateRoute = ( children: any) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  if (isAuthenticated ) {
    return children
  }
  return navigate('/');
}*/
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ToastContainer closeButton={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<ListStyle />} />
            <Route path='/pulls' element={<ListPull />} />
            <Route path='/commits' element={<ListCommits />} />
            <Route path="/pulls/:id" element={<ListCommit />} />
            <Route path='/userinfo' element={<UserInfo />} />
            <Route path="/details/:id" element ={<CommitPageOAuth />}/>
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
