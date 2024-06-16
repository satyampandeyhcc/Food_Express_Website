import React, { useState, useEffect, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef(); // gave a reference to the prize  useref is a hook
  let options = props.options;
  let priceOptions = Object.keys(options); //half or full // regular or medium or large

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async (id) => {
    const existingFoodItem = data.find(
      (item) => item.id === id && item.size === size
    );

    console.log(existingFoodItem);
    console.log(12);

    if (existingFoodItem) {
      if (existingFoodItem.size === size) {
        await dispatch({
          type: "UPDATE",
          id: id,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;
      } else {
        await dispatch({
          type: "ADD",
          id: id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.foodItem.img,
        });
        return;
      }
    } else {
      await dispatch({
        type: "ADD",
        id: id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.foodItem.img,
      });
    }
  };

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  });
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "152px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>

            <div className=" w-100">
              <select
                className="m-2 h-100 bg-light rounded"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}{" "}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2 h-100  bg-light rounded" // bg-light
                ref={priceRef} //
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline h-100 fs-5">₹ {finalPrice}</div>
            </div>
          </div>
          <hr />
          <button
            className="btn btn-danger justify-center w-50 mb-3 mx-3"
            // onClick={handleAddToCart}
            onClick={() => handleAddToCart(props.foodItem._id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
