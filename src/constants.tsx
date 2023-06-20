import { Avatar, Button } from "antd";
import Paragraph from "antd/es/typography/Paragraph";

export const RES_STATUS = {
  SUCCESS: 200,
};

export const MESSAGE = {
  ERROR: "Sever Error",
};

export const COLUMN_STYLE = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Negative prompt",
    dataIndex: "config",
    key: "negativePrompt",
     render: (value: any) => {
      return <Paragraph>{value?.negativePrompt || ""}</Paragraph>;
    },
  },
  {
    title: "Positive prompt",
    dataIndex: "config",
    key: "positivePrompt",
    render: (value: any) => {
      return <Paragraph>{value?.positivePrompt || ""}</Paragraph>;
    },
  },
  {
    title: "Config",
    dataIndex: "config",
    key: "config",
    render: (value: any) => {
      return <Paragraph>{JSON.stringify(value, null, 2)}</Paragraph>;
    },
  },
  {
    title: "Key",
    dataIndex: "key",
    key: "key",
    render: (value: string) => {
      return <Avatar shape="square" size={128} src={value}></Avatar>;
    },
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

export enum Algorithym {
  DIFF_V1 = 'stable-diffusion-v1',
  DIFF_V1_5 = 'stable-diffusion-v1-5',
  DIFF_512_V2_0 = 'stable-diffusion-512-v2-0',
  DIFF_768_V2_0 = 'stable-diffusion-768-v2-0',
  DIFF_512_V2_1 = 'stable-diffusion-512-v2-1',
  DIFF_768_V2_1 = 'stable-diffusion-768-v2-1',
  INPAINTING_V1_0 = 'stable-inpainting-v1-0',
  INPAINTING_512_V2_0 = 'stable-inpainting-512-v2-0',
}


export const AlgorithmList = [
  {
    label: 'stable-diffusion-v1',
    value: 'stable-diffusion-v1'
  },
  {
    label: 'stable-diffusion-v1-5',
    value: 'stable-diffusion-v1-5'
  },
  {
    label: 'stable-diffusion-512-v2-0',
    value: 'stable-diffusion-512-v2-0'
  },
  {
    label: 'stable-diffusion-768-v2-0',
    value: 'stable-diffusion-768-v2-0'
  },
  {
    label: 'stable-diffusion-512-v2-1',
    value: 'stable-diffusion-512-v2-1'
  },
  {
    label: 'stable-diffusion-768-v2-1',
    value: 'stable-diffusion-768-v2-1'
  },
  {
    label: 'stable-inpainting-v1-0',
    value: 'stable-inpainting-v1-0'
  },
  {
    label: 'stable-inpainting-512-v2-0',
    value: 'stable-inpainting-512-v2-0'
  }
]