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
  const [subOptions, setSubOptions] = useState([])
  const [arrayOfSubs, setArrayOfSubs] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params

  console.log(values);
  useEffect(() => {
   loadProduct()
   loadCategories()
  }, [])

  const loadProduct = () => {
    getProduct(slug)
    .then( p => {
      //1 load single product
      setValues({...values, ...p.data})
      //2 load singe product category subs
      getCategorySubs(p.data.category._id)
      .then(res => {
        //on first load, show default sub
        setSubOptions(res.data)
      })
      //3 prepare array of sub ids to show as default sub values in antd Select
      let arr = []
      p.data.subs.map(s => {
        arr.push(s._id)
      })
      //required for ant design select to work
      setArrayOfSubs(prev => arr)
    })
  }

  const handleCategoryChange = (e) => {
    e.preventDefault();

    console.log("clicked category", e.target.value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value)

    getCategorySubs(e.target.value).then((res) => {
      console.log("sub options on category clicked", res);
      setSubOptions(res.data);
    });

    console.log("Existing Category values.category", values.category);

    // if user clicks back to the original category
    // show its sub categories in default
     if(values.category._id === e.target.value) {
       loadProduct()
     }
    
     // clear old sub category ids
    setArrayOfSubs([])
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
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
