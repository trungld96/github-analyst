import axiosInstance from './axiosInstance';
import { MESSAGE, RES_STATUS } from '../constants';
import axios from 'axios';

export const fetchStyles = async (params?: any) => {
  const res = await axiosInstance.get('/v2/styles', { params });
  return res.data?.data;
};

export const deleteStyle = async (styleId: string) => {
  const res = await axiosInstance.delete(`/styles/${styleId}`);
  if (res.status === RES_STATUS.SUCCESS) {
    return res.data.data;
  } else {
    alert(MESSAGE.ERROR);
    return null;
  }
};

export const fetchPresignUrl = async (name: string) => {
  const res = await axiosInstance.get(`/styles/presign?filename=${name}`);
  if (res.status === RES_STATUS.SUCCESS) {
    return res.data.data;
  } else {
    alert(MESSAGE.ERROR);
    return null;
  }
};

export const submitFormApi = async (payload: any) => {
  const res = await axiosInstance.post('/v2/styles', payload);
  if (res.status === RES_STATUS.SUCCESS) {
    return res.data.data;
  } else {
    alert(MESSAGE.ERROR);
    return null;
  }
};

export const updateFormApi = async (id: string, payload: any) => {
  const res = await axiosInstance.put(`/styles/${id}`, payload);
  if (res.status === RES_STATUS.SUCCESS) {
    return res.data.data;
  } else {
    alert(MESSAGE.ERROR);
    return null;
  }
};

export const uploadImageApi = async (url: any, payload: any) => {
  const res = await axios.put(url, payload, {});
  if (res.status === RES_STATUS.SUCCESS) {
    return res;
  } else {
    alert(MESSAGE.ERROR);
    return null;
  }
};

export const getListProjects = async () => {
  const res = await axiosInstance.get("/styles/projects");
  if (res.status === RES_STATUS.SUCCESS) {
    return res.data.data;
  } else {
    alert(MESSAGE.ERROR);
    return null;
  }
};

export const getAllNameStyle = async () => {
  const res = await axiosInstance.get('/style-selectors');

  if (res.status === RES_STATUS.SUCCESS) {
    return res.data.data;
  } else {
    alert(MESSAGE.ERROR);
    return null;
  }
};
