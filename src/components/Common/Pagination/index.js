import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Pagination() {
  return (
    <nav
      className="pagination is-right"
      role="navigation"
      aria-label="pagination"
    >
      {/* <a className="pagination-previous">
        <FontAwesomeIcon icon={faChevronLeft} />
      </a>
      <a className="pagination-next">
        <FontAwesomeIcon icon={faChevronRight} />
      </a> */}
      <ul className="pagination-list">
        <li>
          <a className="pagination-link" aria-label="Goto page 45">
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 45">
            1
          </a>
        </li>
        <li>
          <a
            className="pagination-link is-current"
            aria-label="Page 46"
            aria-current="page"
          >
            2
          </a>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 47">
            3
          </a>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 47">
            <FontAwesomeIcon icon={faChevronRight} />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
