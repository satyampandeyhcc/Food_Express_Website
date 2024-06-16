import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    console.log(response[0], response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      {/* We are writing the carousel code here and not in separate component because we given a search bar on carousel and that is directly linked with the elements of home page. Hence when it is given to a separate component, it will not work. */}
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div class="d-flex justify-content-center">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
            
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://img.freepik.com/free-photo/exploding-burger-with-vegetables-melted-cheese-black-background-generative-ai_157027-1734.jpg"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.freepik.com/free-photo/top-view-pepperoni-pizza-sliced-into-six-slices_141793-2157.jpg?t=st=1718526386~exp=1718529986~hmac=4e0fca5ecea67dba36f9948cd6369d9a61aed36de4ba78b7fc2f6769a25647c0&w=996"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.freepik.com/free-photo/crop-hand-pointing-blackboard-near-food_23-2147740728.jpg?t=st=1718526549~exp=1718530149~hmac=c0a37fd25eff4d9d430894564f4ef8920fa7123d08d8620710046c7f55ec177b&w=996"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {foodCat != []
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />

                  {foodItem != [] ? (
                    foodItem
                      .filter((item) => {
                        return (
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                        );
                      })
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3 "
                          >
                            <Card
                              foodItem={filterItems}
                              options={filterItems.options[0]}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No such data found</div>
                  )}
                </div>
              );
            })
          : "no data"}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
