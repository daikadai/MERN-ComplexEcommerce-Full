import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleProduct from "../components/cards/SingleProduct";
import { getProduct, productStar } from "../functions/product";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);

  const { user } = useSelector(state => ({...state}))
  const { slug } = match.params;

  useEffect(() => {
    loadingSingleProduct();
  }, [slug]);

  useEffect(() => {
    if(product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() == user._id.toString()
      );
      console.log('existingRatingObject',existingRatingObject);
      // current user's star
      existingRatingObject && setStar(existingRatingObject.star)
    }
  })

  const loadingSingleProduct = () => {
    getProduct(slug).then((res) => setProduct(res.data));
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating)
    console.table(newRating, name);
    productStar(name, newRating, user.token)
      .then(res => {
        console.log('rating clicked',res.data);
        loadingSingleProduct() //if you want to show updated rating in real time
      })
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          onStarClick={onStarClick}
          product={product}
          star={star}
        />
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Product</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
