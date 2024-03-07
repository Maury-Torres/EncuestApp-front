import { Pagination } from "react-bootstrap";
import propTypes from "prop-types";

// eslint-disable-next-line react/prop-types
export const ABMPagination = ({ page, handlePageChange, data }) => {
  return (
    <>
      <Pagination className="mt-5 justify-content-center">
        <Pagination.Prev
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next
          onClick={() => handlePageChange(page + 1)}
          // eslint-disable-next-line react/prop-types
          disabled={page === (data ? data.totalPages : 1)}
        />
      </Pagination>
    </>
  );
};

ABMPagination.propTypes = {
  page: propTypes.number.isRequired,
  handlePageChange: propTypes.func.isRequired,
};
