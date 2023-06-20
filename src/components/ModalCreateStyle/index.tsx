import { Button, Col, Form, Input, Row, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import {
  fetchPresignUrl,
  submitFormApi,
  updateFormApi,
  uploadImageApi,
  getAllNameStyle,
} from '../../services/AIStyleService';
import UploadButton from '../UploadButton';
import { ModalCreate } from './style';

const convertBase64ToFile = function (image: string) {
  const byteString = atob(image.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  const newBlob = new Blob([ab], {
    type: 'image/jpeg',
  });
  return newBlob;
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

interface IProps {
  reload: (props: any) => void | Promise<void>;
  styleItem: any;
  open: boolean;
  setOpen: (params: boolean) => void;
  resetStyleItem: () => void;
}

interface ConfigData {
  key: string;
  thumbnailUrl: string;
}

const ModalCreateStyle = (props: any) => {
  const { styleItem } = props;
  const isUpdate = styleItem?.key;
  const [file, setFile] = useState<UploadChangeParam | any>({ name: '' });

  const [isLoading, setIsLoading] = useState(false);
  const [base64, setBase64] = useState<string>();
  const [allNameStyle, setAllNameStyle] = useState<any>([]);
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    try {
      let dataTmp: ConfigData = {
        key: '',
        thumbnailUrl: '',
      };
      if (base64 && values.name) {
        setIsLoading(true);
        if (file) {
          let presign = await fetchPresignUrl(file.name);
          dataTmp = {
            ...dataTmp,
            key: presign.filepath,
            thumbnailUrl: presign.thumbnailPresign,
          };
          let res: any;
          if (file.name) {
            const newFile = convertBase64ToFile(base64);
            res = await uploadImageApi(dataTmp.thumbnailUrl, newFile);
          } else res = true;
          if (res) {
            let config: any = {};
            Object.keys(values.config).forEach((key) => {
              let value = values.config[key];
              if (Number(values.config[key])) {
                value = Number(values.config[key]);
              }
              config[key] = value;
            });
            const body = {
              ...values,
              key: dataTmp.key,
              config,
            };
            let resSubmit: any;
            if (!file.name) {
              delete body['key'];
            }

            if (!styleItem?.key) {
              resSubmit = await submitFormApi({
                ...body,
              });
            } else {
              resSubmit = await updateFormApi(styleItem._id, { ...body });
            }

            if (resSubmit) {
              props.reload(1);
              props.setOpen(false);
              form.resetFields();
              setFile(null);
              setBase64('');
              setIsLoading(false);
              props.resetStyleItem();
            }
          }
        }
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Internal Server',
      });
      return;
    }
  };

  const getListAllNameStyle = async () => {
    try {
      const res = await getAllNameStyle();
      if (res) {
        const listStyleSelect = res.map((item: any) => ({
          label: item,
          value: item,
        }));
        setAllNameStyle(listStyleSelect);
      }
    } catch (err: any) {
      setAllNameStyle([]);
    }
  };

  useEffect(() => {
    getListAllNameStyle();
  }, []);

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file?.size && info?.file.size > 200000) {
      messageApi.open({
        type: 'error',
        content: 'File size over 2000000',
      });
      return;
    }
    // if (info.file?.size && !info?.file.type?.match(/png/)) {
    //     messageApi.open({
    //         type: "error",
    //         content: "Image is not PNG type",
    //     });
    //     return;
    // }

    setFile(info.file.originFileObj);
    getBase64(info.file.originFileObj as any, async (url) => {
      setBase64(url);
    });
  };

  const getUploadedThumbnailBase64 = () => {
    const url = styleItem?.key;
    setBase64(url);
  };

  useEffect(() => {
    getUploadedThumbnailBase64();
  }, [styleItem?.key]);

  return (
    <>
      <ModalCreate
        width={841}
        closable={false}
        footer={null}
        centered
        open={props.open}
        // onOk={() => {
        //   // props.setOpen(false);
        //   form.submit();
        // }}
        onCancel={() => props.setOpen(false)}>
        {contextHolder}
        <Form
          requiredMark={false}
          colon={false}
          form={form}
          name="createStyle"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          initialValues={{
            name: styleItem?.name || '',
            // prompt: styleItem?.prompt || '',
            config: styleItem?.config || {},
          }}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            label="AI style name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input name of style!',
                type: 'string',
                max: 30,
              },
            ]}>
            <Input name="name" size="large" className="name-input" />
          </Form.Item>

          <Form.Item label="Style" name={['config', 'style']}>
            <Select options={allNameStyle} size="large" />
          </Form.Item>

          <Form.Item
            label="Positive prompt"
            name={['config', 'positivePrompt']}
            rules={[
              () => ({
                validator(_, value?: any) {
                  if (value) {
                    if (typeof value !== 'string') {
                      return Promise.reject('Positive prompt must be string');
                    } else if (value.length > 1000) {
                      return Promise.reject('Max length of Positive prompt is 1000');
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}>
            <Input name="config.positivePrompt" size="large" />
          </Form.Item>
          <Form.Item
            label="Negative prompt"
            name={['config', 'negativePrompt']}
            rules={[
              () => ({
                validator(_, value?: any) {
                  if (value) {
                    if (typeof value !== 'string') {
                      return Promise.reject('Negative prompt must be string');
                    } else if (value.length > 1000) {
                      return Promise.reject('Max length of Negative prompt is 1000');
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}>
            <Input name="config.negativePrompt" size="large" />
          </Form.Item>

          <Form.Item
            label="Alpha"
            name={['config', 'alpha']}
            rules={[
              () => ({
                validator(_, value) {
                  if (value && (value > 1 || value < 0)) {
                    return Promise.reject('Alpha must be in 0 -> 1');
                  }
                  return Promise.resolve();
                },
              }),
              // {
              //     pattern: new RegExp(/^[0-9]*$/),
              //     message: "Strength chỉ có thể là số nguyên",
              // },
            ]}>
            <Input type="number" name="config.alpha" step={0.1} size="large" />
          </Form.Item>

          <Form.Item
            label="Strength"
            name={['config', 'strength']}
            rules={[
              () => ({
                validator(_, value) {
                  if (value && (value > 1 || value < 0)) {
                    return Promise.reject('Strength must be in 0 -> 1');
                  }
                  return Promise.resolve();
                },
              }),
              // {
              //     pattern: new RegExp(/^[0-9]*$/),
              //     message: "Strength chỉ có thể là số nguyên",
              // },
            ]}>
            <Input type="number" name="config.strength" step={0.1} size="large" />
          </Form.Item>

          <Form.Item
            label="Guidance scale"
            name={['config', 'guidanceScale']}
            rules={[
              () => ({
                validator(_, value) {
                  if (value && (value > 10 || value < 0)) {
                    return Promise.reject('Guidance scale must be in 0 -> 10');
                  }
                  return Promise.resolve();
                },
              }),
              // {
              //     pattern: new RegExp(/^[0-9]*$/),
              //     message: "Guidance scale chỉ có thể là số nguyên",
              // },
            ]}>
            <Input type="number" name="config.guidanceScale" step={0.1} size="large" />
          </Form.Item>

          <Form.Item
            label="Step"
            name={['config', 'numInferenceSteps']}
            rules={[
              () => ({
                validator(_, value) {
                  if (value && (value > 100 || value < 0)) {
                    return Promise.reject('Step must be in 0 -> 100');
                  }
                  return Promise.resolve();
                },
              }),
              {
                pattern: new RegExp(/^[0-9]*$/),
                message: 'Step can only be an integer',
              },
            ]}>
            <Input type="number" name="config.step" size="large" />
          </Form.Item>

          <Form.Item label="Thumnail">
            <Upload
              accept="image/png, image/jpeg"
              showUploadList={false}
              onChange={handleChange}
              customRequest={() => handleChange}>
              <Button icon={<UploadOutlined />} className="btn-upload">
                Upload
              </Button>
            </Upload>
          </Form.Item>

          <div className="image-upload">
            {base64 ? (
              <img src={base64} alt="avatar" />
            ) : (
              <div>
                <div>
                  <span>PNG, JPG</span>
                </div>
                <div>
                  with max size of <span>200KB</span>
                </div>
              </div>
            )}
          </div>

          <div className="group-btn">
            <Button className="cancel-btn">Cancel</Button>
            <Button className="create-btn">Create</Button>
          </div>

          {/* <Row>
            <Col span={16} offset={8}>
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={handleChange}
                customRequest={() => handleChange}>
                {base64 ? (
                  <img style={{ height: '100%' }} src={base64} alt="avatar" />
                ) : (
                  <UploadButton isLoading={isLoading} />
                )}
              </Upload>
            </Col>
          </Row> */}
        </Form>
      </ModalCreate>
    </>
  );
};

export default ModalCreateStyle;
