function Navigation() {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <a className="nav-link" aria-current="page" href="#">
          Home
        </a>
      </li>
    </ul>
  );
}

function SearchForm() {
  return (
    <form className="d-flex" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}

function Dropdown() {
  return (
    <ul className="navbar-nav mb-2 me-5 mb-lg-0">
      {" "}
      {/* remove ms-auto */}
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Login
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <a className="dropdown-item text-center" href="#">
              Profile
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="#">
          Firestock
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Navigation />
          <SearchForm />
          <Dropdown />
        </div>
      </div>
    </nav>
  );
}
