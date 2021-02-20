import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";

const ProductCreate = () => {
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          product create form
        </div>
      </div>
    </div>
  )
}

export default ProductCreate

