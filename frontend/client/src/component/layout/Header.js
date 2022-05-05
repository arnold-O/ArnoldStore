import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="container-fluid bg-dark p-1">
      <div className="d-flex  justify-content-around align-items-center ">
        <div>
          <NavLink className="navbar-brand text-white" to="/">
            ArnoldStore
          </NavLink>
        </div>

        <div>
          <form class="d-flex ">
            <input
              className="form-control  border-secondary border-3 border-top-0 border-start-0 border-bottom-0"
              type="search"
              placeholder="Search for product"
              aria-label="Search"
            />
            <button
              className="btn bg-warning  text-white border-1"
              type="submit"
            >
              <i class="fas fa-search"></i>
            </button>
          </form>
        </div>

        <div className="d-flex align-items-center">
          <button className=" btn btn-warning  py-0 m-0">
            <NavLink to="#" className="nav-link text-dark p-1 m-0">
              Login
            </NavLink>
          </button>

          <NavLink className="nav-link text-white" to="#">
            Cart{" "}
            <button className="btn btn-warning p-1 py-0">
              <span className="text-dark">2</span>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
    
  );
}
