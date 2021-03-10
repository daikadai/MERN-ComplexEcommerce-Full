import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import { getProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match }) => {
  //state
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([])
  const [subOptions, setSubOptions] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params

  useEffect(() => {
   loadProduct()
   loadCategories()
  }, [])

  const loadProduct = () => {
    getProduct(slug)
    .then( p => {
      setValues({...values, ...p.data})
    })
  }

  const handleCategoryChange = (e) => {
    e.preventDefault();

    console.log("clicked category", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("sub options on category clicked", res);
      setSubOptions(res.data);
    });
  };

  const loadCategories = () =>
  getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => { 
    e.preventDefault();
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Product create</h4>
          <hr />
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            categories={categories}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
