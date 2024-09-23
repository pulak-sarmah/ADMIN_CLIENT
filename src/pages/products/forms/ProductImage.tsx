import { Form, message, Space, Typography, Upload, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const ProductImage = ({ initialImage }: { initialImage: string }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [imageUrl, setImageUrl] = useState<string | null>(initialImage);

  const uploaderConfig: UploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    beforeUpload: (file) => {
      // Validate file type
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        messageApi.error("You can only upload JPG/PNG files!");
        return false;
      }

      // Validate file size (< 2MB)
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        messageApi.error("Image must be smaller than 2MB!");
        return false;
      }

      // Create a preview URL for the selected file
      setImageUrl(URL.createObjectURL(file));

      // Prevent actual upload
      return false;
    },
  };

  return (
    <Form.Item
      label=""
      name="image"
      rules={[
        {
          required: true,
          message: "Please upload a product image",
        },
      ]}
    >
      <Upload listType="picture-card" {...uploaderConfig}>
        {contextHolder}
        {imageUrl ? (
          <img src={imageUrl} alt="product" style={{ width: "100%" }} />
        ) : (
          <Space direction="vertical">
            <PlusOutlined />
            <Typography.Text>Upload</Typography.Text>
          </Space>
        )}
      </Upload>
    </Form.Item>
  );
};

export default ProductImage;
