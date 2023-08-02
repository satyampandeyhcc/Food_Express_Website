import React, { useState, useEffect, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options); //half or full // regular or medium or large

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let foodItem = props.item;
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    //console.log(food)
    //console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        // console.log("Size different so simply ADD one more to the list")
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });

    // setBtnEnable(true)
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
            style={{ height: "150px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            <div className=" w-100">
              <select
                className="m-2 h-100 bg-danger rounded"
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
                className="m-2 h-100  bg-danger rounded"
                ref={priceRef}
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
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
