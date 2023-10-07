import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container-fluid vh-100 vw-100 d-flex align-items-center justify-content-center">
      <NavLink to={"/users"} className="btn btn-primary btn-lg me-5">
        Users
      </NavLink>
    </div>
  );
};

export default HomePage;
