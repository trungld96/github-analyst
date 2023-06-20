import { Col, Form, Input, Modal, Row, Select, Upload, message } from "antd";
import { useForm } from "antd/es/form/Form";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { useEffect, useState } from "react";
import {
  fetchPresignUrl,
  getListProjects,
  submitFormApi,
  updateFormApi,
  uploadImageApi,
  getAllNameStyle,
} from "../services/AIStyleService";
import UploadButton from "./UploadButton";

const convertBase64ToFile = function (image: string) {
  const byteString = atob(image.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  const newBlob = new Blob([ab], {
    type: "image/jpeg",
  });
  return newBlob;
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  // const newHeight=HEIGHT_RESIZE;
  // const newWidth=WIDTH_RESIZE;
  const reader = new FileReader();

  // reader.readAsDataURL(img);
  // 	reader.onload = () => {
  // 		console.log('called: ', reader);
  //         const originalImage = new Image();

  // 	    originalImage.src = reader.result as any;
  // 		// setSrc(reader.result);
  //         const canvas = document.createElement('canvas');
  //         const ctx = canvas.getContext('2d') as any;

  //          originalImage.addEventListener('load', function() {

  //             canvas.width = newWidth;
  //             canvas.height = newHeight;

  //             //render the image
  //             ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
  //             const dataUrl = canvas.toDataURL('image/jpeg', 1);
  //             callback(dataUrl);
  // });
  // 	};

  // // reader.addEventListener("load", () => callback(reader.result as string));
  // reader.readAsDataURL(img);

  reader.addEventListener("load", () => callback(reader.result as string));
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

const ModalCreateStyle = (props: IProps) => {
  const { styleItem } = props;
  const isUpdate = styleItem?.key;
  const [file, setFile] = useState<UploadChangeParam | any>({ name: "" });

  const [isLoading, setIsLoading] = useState(false);
  const [base64, setBase64] = useState<string>();
  const [listProjectsData, setListProjectsData] = useState<any[]>([]);
  const [allNameStyle, setAllNameStyle] = useState<any>([]);
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    try {
      let dataTmp: ConfigData = {
        key: "",
        thumbnailUrl: "",
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
              console.log("value", value);
              config[key] = value;
            });
            const body = {
              ...values,
              key: dataTmp.key,
              config,
            };
            let resSubmit: any;
            if (!file.name) {
              delete body["key"];
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
              setBase64("");
              setIsLoading(false);
              props.resetStyleItem();
            }
          }
        }
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Internal Server",
      });
      return;
    }
  };

  const getListProjectsData = async () => {
    try {
      const res = await getListProjects();
      if (res) {
        const convertProjectData = res.map((item: any) => ({
          label: item.project,
          value: item.project,
        }));
        setListProjectsData(convertProjectData);
      }
    } catch (err: any) {
      console.log("err", err);
      setListProjectsData([]);
    }
  };

  const getListAllNameStyle = async () => {
    try {
      const res = await getAllNameStyle();
      console.log(res);
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
    getListProjectsData();
    getListAllNameStyle();
  }, []);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file?.size && info?.file.size > 200000) {
      messageApi.open({
        type: "error",
        content: "File size over 2000000",
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
      <Modal
        title={`${isUpdate ? "Edit" : "Create"} Style`}
        centered
        open={props.open}
        onOk={() => {
          // props.setOpen(false);
          form.submit();
        }}
        onCancel={() => props.setOpen(false)}
        width={1000}
      >
        {contextHolder}

        <Form
          form={form}
          name="createStyle"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: "90%" }}
          initialValues={{
            name: styleItem?.name || "",
            // prompt: styleItem?.prompt || '',
            config: styleItem?.config || {},
            project: styleItem?.project || "",
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Style name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name of style!",
                type: "string",
                max: 15,
              },
            ]}
          >
            <Input name="name" />
          </Form.Item>

          <Form.Item
            label="Positive prompt"
            name={["config", "positivePrompt"]}
            rules={[
              () => ({
                validator(_, value?: any) {
                  if (value) {
                    if (typeof value !== "string") {
                      return Promise.reject("Positive prompt must be string");
                    } else if (value.length > 2000) {
                      return Promise.reject(
                        "Max length of Positive prompt is 2000"
                      );
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input name="config.positivePrompt" />
          </Form.Item>
          <Form.Item
            label="Negative prompt"
            name={["config", "negativePrompt"]}
            rules={[
              () => ({
                validator(_, value?: any) {
                  if (value) {
                    if (typeof value !== "string") {
                      return Promise.reject("Negative prompt must be string");
                    } else if (value.length > 2000) {
                      return Promise.reject(
                        "Max length of Negative prompt is 2000"
                      );
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input name="config.negativePrompt" />
          </Form.Item>

          <Form.Item
            label="Alpha"
            name={["config", "alpha"]}
            rules={[
              () => ({
                validator(_, value) {
                  if (value && (value > 1 || value < 0)) {
                    return Promise.reject("Alpha phải nằm trong khoảng 0 -> 1");
                  }
                  return Promise.resolve();
                },
              }),
              // {
              //     pattern: new RegExp(/^[0-9]*$/),
              //     message: "Strength chỉ có thể là số nguyên",
              // },
            ]}
          >
            <Input type="number" name="config.alpha" step={0.1} />
          </Form.Item>

          <Form.Item
            label="Strength"
            name={["config", "strength"]}
            rules={[
              () => ({
                validator(_, value) {
                  if (value && (value > 1 || value < 0)) {
                    return Promise.reject(
                      "Strength phải nằm trong khoảng 0 -> 1"
                    );
                  }
                  return Promise.resolve();
                },
              }),
              // {
              //     pattern: new RegExp(/^[0-9]*$/),
              //     message: "Strength chỉ có thể là số nguyên",
              // },
            ]}
          >
            <Input type="number" name="config.strength" step={0.1} />
          </Form.Item>

          <Form.Item
            label="Guidance scale"
            name={["config", "guidanceScale"]}
            rules={[
              () => ({
                validator(_, value) {
                  if (value && (value > 10 || value < 0)) {
                    return Promise.reject(
                      "Guidance scale phải nằm trong khoảng 0 -> 10"
                    );
                  }
                  return Promise.resolve();
                },
              }),
              // {
              //     pattern: new RegExp(/^[0-9]*$/),
              //     message: "Guidance scale chỉ có thể là số nguyên",
              // },
            ]}
          >
            <Input type="number" name="config.guidanceScale" step={0.1} />
          </Form.Item>

          <Form.Item
            label="Step"
            name={["config", "numInferenceSteps"]}
            rules={[
              () => ({
                validator(_, value) {
                  if (value && (value > 100 || value < 0)) {
                    return Promise.reject(
                      "Step chỉ được phép trong khoảng từ 0 -> 100"
                    );
                  }
                  return Promise.resolve();
                },
              }),
              {
                pattern: new RegExp(/^[0-9]*$/),
                message: "Step chỉ có thể là số nguyên",
              },
            ]}
          >
            <Input type="number" name="config.step" />
          </Form.Item>
          {/* <Form.Item
                        label="Step schedule start"
                        name={["config", "stepScheduleStart"]}
                        rules={[
                            () => ({
                                validator(_, value) {
                                    if (value && value > 1) {
                                        return Promise.reject(
                                            "Step Schedule Start chỉ được phép trong khoảng từ 0 -> 1"
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input type="number" name="stepScheduleStart"/>
                    </Form.Item> */}

          <Form.Item
            label="Project"
            name="project"
            rules={[
              {
                required: true,
                message: "Please select an project name!",
              },
            ]}
          >
            <Select options={listProjectsData} />
          </Form.Item>
          <Form.Item label="Style" name={["config", "style"]}>
            <Select
              options={allNameStyle}
              showSearch
            />
          </Form.Item>
          {/* <Form.Item> */}
          <Row>
            <Col span={16} offset={8}>
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={handleChange}
                customRequest={() => handleChange}
              >
                {base64 ? (
                  <img style={{ height: "100%" }} src={base64} alt="avatar" />
                ) : (
                  <UploadButton isLoading={isLoading} />
                )}
              </Upload>
            </Col>
          </Row>
          {/* </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateStyle;
