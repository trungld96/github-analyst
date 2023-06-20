import React from 'react';
import { ConfigProvider, Form, Input } from 'antd';
import {DivWrapper} from "./styles";

interface IProps {
  placeholder: string;
  icon: any;
  name: string;
  rules?: any;
  type?: string;
}

const InputDefault = (props: IProps) => {
  const { placeholder, icon, type = 'text', name, rules = [] } = props;
  return (
    <Form.Item name={name} rules={rules} style={{ width: '100%' }}>
      <DivWrapper>
        <ConfigProvider
          theme={{
            inherit: false,
            components: {
              Input: {
                colorTextPlaceholder: '#9B9C9E',
                  colorBgContainer: '#fff'
              },
            },
          }}>
          <Input placeholder={placeholder} prefix={icon} type={type} />
        </ConfigProvider>
      </DivWrapper>
    </Form.Item>
  );
};

export default InputDefault;
