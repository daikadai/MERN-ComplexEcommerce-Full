import { Card } from "antd";
import React from "react";

const { Meta } = Card;
const AdminProductCard = ({ product }) => {
  const { title, description, images } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : ""}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;
