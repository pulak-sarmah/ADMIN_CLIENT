import {
  Upload,
  Space,
  Typography,
  message,
  UploadProps,
  Form,
  UploadFile,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const ProductImage = () => {
  // State to manage the file list
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const uploadConfig: UploadProps = {
    name: "file",
    multiple: false,
    fileList, // Pass the fileList state here
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList); // Update file list when user adds/removes files
    },
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG files!");
        return false;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
        return false;
      }

      // Generate an object URL for the file preview
      const objectUrl = URL.createObjectURL(file);
      setFileList([{ ...file, thumbUrl: objectUrl }]); // Manually set the fileList with preview

      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setFileList([]); // Clear the file list when the user removes the image
    },
  };

  // Clean up object URLs when the component unmounts
  useEffect(() => {
    return () => {
      fileList.forEach((file) => {
        if (file.thumbUrl) {
          URL.revokeObjectURL(file.thumbUrl);
        }
      });
    };
  }, [fileList]);

  return (
    <Form.Item
      name="image"
      rules={[
        {
          required: true,
          message: "Product image is required",
        },
      ]}
    >
      <Upload listType="picture-card" {...uploadConfig}>
        {fileList.length >= 1 ? null : (
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
