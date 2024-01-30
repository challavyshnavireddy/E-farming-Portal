import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

const Shop = () => {

  let [err, setErr] = useState("");
  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  let submitForm = (productObj) => {
    //  console.log(productObj)
    axios
      .post("http://localhost:3500/product-api/create-product", productObj)
      .then((response) => {
        // console.log(response)
        if (response.status === 200) {
          // setProducts(prev => [...prev , response.data])
        // setProducts(response.data)
          setValue("name",'')
          setValue("cost",'')
          setValue("stock",'')
          setValue("productType",'')
          console.log("new product posted")
        } else {
          setErr(response.data.message);
        }
      })
      .catch((err) => {
        console.log("error message is : ", err);
      });
  };
  return (
    <div className="container ">
      <div className="row form-style ">
        <div className="col-sm-6 col-md-4 mx-auto  bg-opacity-75 d-flex flex-column justify-content-center form-background p-3 rounded">
          <h1 className="text-center fs-1 login-heading">ADD PRODUCT</h1>

          <form onSubmit={handleSubmit(submitForm)}>
            <label htmlFor="name" className="  fs-4 mt-3">
              name
            </label>
            <input
              type="text"
              className="form-control mt-1"
              id="name"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p className="text-danger ">*name is required</p>
            )}
            <label htmlFor="cost" className="  fs-4 mt-3">
              cost
            </label>
            <input
              type="number"
              className="form-control mt-1"
              id="cost"
              {...register("cost", { required: true })}
            />
            {errors.cost?.type === "required" && (
              <p className="text-danger ">*cost is required</p>
            )}
            <label htmlFor="stock" className="  fs-4 mt-3">
              stock
            </label>
            <input
              type="number"
              className="form-control mt-1"
              id="stock"
              {...register("stock", { required: true })}
            />
            {errors.stock?.type === "required" && (
              <p className="text-danger ">*stock is required</p>
            )}

            <div className="mt-3">
              <input
                type="radio"
                name="productType"
                value="vegetables"
                id="vegetables"
                {...register("productType", { required: true })}
              />
              <label htmlFor="vegetables">
                <p>vegetable</p>
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="productType"
                id="fruits"
                value="fruits"
                {...register("productType", { required: true })}
              />
              <label htmlFor="fruits">
                <p>fruit</p>
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="productType"
                id="pulses"
                value="pulses"
                {...register("productType", { required: true })}
              />
              <label htmlFor="pulses">
                <p>pulse</p>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-secondary fs-5 mt-3 d-block float-end"
            >
              ADD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shop;
