import React from "react";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons/lib";

interface IProps {
    isLoading: boolean;
}

const UploadButton = (props: IProps) => {
    const { isLoading } = props;
    return(
        <div>
            {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
}

export default UploadButton;