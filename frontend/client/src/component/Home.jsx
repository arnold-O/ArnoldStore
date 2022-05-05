import React, { Fragment } from "react";
import MeataData from "./layout/MeataData";

export default function Home() {
  return (
    <Fragment>
      <MeataData title={'Buy all your product here'}/>
      <div className="container px-1">
        <p className="text-center h2 mb-3 mt-3">Latest Product</p>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 gx-5  mb-3 mt-5">
          <div className="col mb-3">
            <div class="card" style={{ width: "288px", height: "388px" }}>
              <img
                src="https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/83/611767/1.jpg?1882"
                className="card-img-top p-0 m-0"
                alt="..."
                style={{ width: "286px", height: "230px" }}
              />
              <div class="card-body">
                <h5 class="card-title">Oppo 3243</h5>

                <p className="p-0 mb-0 mt-1">
                  <span className="text-warning me-2">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </span>
                  <span className="text-muted">(5 Reviews)</span>
                </p>
                <p class="card-text fw-bold p-0 mb-0 mt-2">
                  $46.89
                </p>
                <div className="text-center mt-2">
                <button className="btn btn-warning text-white fw-bold">view Details</button>

                </div>
              </div>
            </div>
          </div>
          <div className="col mb-3 ">
            <div class="card" style={{ width: "288px", height: "388px" }}>
              <img
                src="https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/30/513617/1.jpg?7317"
                class="card-img-top"
                alt="..."
                style={{ width: "286px", height: "230px" }}
              />
              <div class="card-body">
                <h5 class="card-title">Shoe Rack</h5>

                <p className="p-0 mb-0">
                  <span className="text-warning me-2">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </span>
                  <span className="text-muted mb-0">(5 Reviews)</span>
                </p>
                <p class="card-text fw-bold p-0 mb-0 mt-2">
                  $46.89
                </p>
                <div className="text-center mt-2">
                <button className="btn btn-warning text-white fw-bold">view Details</button>

                </div>
              </div>
            </div>
          </div>
          <div className="col mb-3">
            <div class="card" style={{ width: "288px", height: "388px" }}>
              <img
                src="https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/15/688617/1.jpg?7833"
                class="card-img-top"
                alt="..."
                style={{ width: "286px", height: "230px" }}
              />
              <div class="card-body">
                <h5 class="card-title p-0">Girly Dress</h5>
                <p className="p-0 mb-0">
                  <span className="text-warning me-2">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </span>
                  <span className="text-muted">(5 Reviews)</span>
                </p>
                <p class="card-text fw-bold p-0 mb-0 mt-2">
                  $46.89
                </p>
                <div className="text-center mt-2">
                <button className="btn btn-warning text-white fw-bold">view Details</button>

                </div>
              </div>
            </div>
          </div>
          <div className="col mb-3">
            <div class="card" style={{ width: "288px", height: "388px" }}>
              <img
                src="https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/166696/1.jpg?9677"
                class="card-img-top"
                alt="..."
                style={{ width: "286px", height: "230px" }}
              />
              <div class="card-body">
                <h5 class="card-title p-0 ">Bouncing Son</h5>
                <p className="p-0 mb-0">
                  <span className="text-warning me-2">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </span>
                  <span className="text-muted">(5 Reviews)</span>
                </p>
                <p class="card-text fw-bold p-0 mb-0 mt-2">
                  $46.89
                </p>
                <div className="text-center mt-2">
                <button className="btn btn-warning text-white fw-bold">view Details</button>

                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </Fragment>
  );
}
