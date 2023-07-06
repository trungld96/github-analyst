import axiosInstance from './axiosInstance';
import axiosGit from './axiosGit';
export const getListPullRequest = async (repos: string | null, token: string, params: any) => {
  let url = `/search/issues?q=is:pr+repo:${repos}`;
  if (params.author) {
    url = `/search/issues?q=is:pr+repo:${repos}+author:${params.author}`
  }
  const res = await axiosInstance.get(url, { params, headers: {
    Authorization: `token ${token}`
  }
  });
  console.log('params', params)
  return res;
};

export const getListCommitRequest = async (id: number, repos: string | null, token: string, params: any) => {
  let url = `/repos/${repos}/commits`;
  const res = await axiosInstance.get(url, {
    params, headers: {
    Authorization: `token ${token}`
    }
  });
  console.log('params', params)
  return res;
};
export const getBranchs = async (repos: string | null, token: string, params: any) => {
  let url = `/repos/${repos}/branches`;
  const res = await axiosInstance.get(url, {
    params, headers: {
    Authorization: `token ${token}`
    }
  });
  return res;
}

export const getProfile = async (username: string | null, token: string) => {
  let url = `/users/${username}`;
  const res = await axiosInstance.get(url, {
    headers: {
      Authorization: `token ${token}`
    }
  });
  return res
}
export const getOgzs = async (token: string) => {
  let url = `/user/memberships/orgs`;
  const res = await axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res
}
export const getRepoOgzs = async (org: string, access_token: string) => {
  let url = `/orgs/${org}/repos`
  const res = await axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  return res
}
export const checkRepoExits = async (repos: string | null, token: string, params: any) => {
  const res = await axiosInstance.get(`/repos/${repos}`, { params, headers: {
    Authorization: `token ${token}`
  }});
  return res;
};

export const getListCollaborators = async (repos: string | null, token: string, params: any) => {
  const res = await axiosInstance.get(`/repos/${repos}/collaborators`, { params, headers: {
    Authorization: `token ${token}`
  }});
  return res;
};

export const getPullRequest = async (repos: string | null, id: number, token: string) => {
  const res = await axiosInstance.get(`/repos/${repos}/pulls/${id}`, { headers: {
    Authorization: `token ${token}`
  }});
  return res;
};  
export const getAccessToken = async () => {
  const res = await axiosGit.get(`/github`,
  )

  return res;
}

