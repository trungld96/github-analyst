import axiosInstance from './axiosInstance';

export const getListPullRequest = async (repos: string, token: string, params: any) => {
  let url = `/search/issues?q=is:pr+repo:${repos}`;
  if (params.author) {
    url = `/search/issues?q=is:pr+repo:${repos}+author:${params.author}`
  }
  const res = await axiosInstance.get(url, { params, headers: {
    Authorization: `token ${token}`
  }});
  return res;
};

export const getListCommitRequest = async (id: number, repos: string, token: string, params: any) => {
  const res = await axiosInstance.get(`/repos/${repos}/pulls/${id}/commits`, { params, headers: {
    Authorization: `token ${token}`
  }});
  return res;
};


export const checkRepoExits = async (repos: string, token: string, params: any) => {
  const res = await axiosInstance.get(`/repos/${repos}`, { params, headers: {
    Authorization: `token ${token}`
  }});
  return res;
};

export const getListCollaborators = async (repos: string, token: string, params: any) => {
  const res = await axiosInstance.get(`/repos/${repos}/collaborators`, { params, headers: {
    Authorization: `token ${token}`
  }});
  return res;
};

export const getPullRequest = async (repos: string, id: number, token: string) => {
  const res = await axiosInstance.get(`/repos/${repos}/pulls/${id}`, { headers: {
    Authorization: `token ${token}`
  }});
  return res;
};

