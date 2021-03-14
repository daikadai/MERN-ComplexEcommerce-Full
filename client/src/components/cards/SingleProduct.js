import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Card } from "antd";
import { Carousel } from "react-responsive-carousel";
import React from "react";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.png";
import { Tabs } from "antd";
import StarRating from 'react-star-ratings'
import ProductListItems from "./ProductListItems";

const { TabPane } = Tabs
const SingleProduct = ({ product }) => {
  const { title,images, description, _id } = product;
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={laptop}
                className="mb-3 card-image"
              />
            }
          ></Card>
        )}
        <Tabs type='card'>
          <TabPane tab='Description' key="1">
            {description && description}
          </TabPane>
          <TabPane tab='More' key="2">
            Call us on xxxx xxx xx to learn more about this product
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        <StarRating 
          name={_id}
          numberOfStars={5}
          rating={2}
          changeRating={(newRating, name) => console.log('newRating', newRating, 'name', name)}
          isSelectable={true}
          starRatedColor='red'
        />
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" />
              <br /> Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" />
              <br /> Add to Wishlist
            </Link>,
          ]}
        >
          <ProductListItems product={product}/>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
