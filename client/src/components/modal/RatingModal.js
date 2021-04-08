import { StarOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'
const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <div onClick={() => setModalVisible(true)}>
        <StarOutlined className="text-danger" /> <br />
        {user ? "Leave Rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success('Thanks for your review. It will appear soon')
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
