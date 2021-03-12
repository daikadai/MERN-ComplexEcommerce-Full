import React, { useEffect, useState } from 'react'
import { getProducts } from '../../functions/product';
import LoadingCard from '../cards/LoadingCard';
import ProductCard from '../cards/ProductCard';

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadAllProducts();
  }, []);


  const loadAllProducts = () => {
    setLoading(true);
    //sort, order, limit
    getProducts('sold','desc', 3) 
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      }); 
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3}/>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default BestSeller
