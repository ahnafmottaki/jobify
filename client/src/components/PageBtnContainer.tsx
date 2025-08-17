import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import { useLocation, useNavigate } from "react-router";

const PageBtnContainer = () => {
  const navigate = useNavigate();
  const {
    pagination: { numOfPages, currentPage },
  } = useAllJobsContext();
  const { search, pathname } = useLocation();
  const handlePageChange = (pageNumber: number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber.toString());
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  const addPageButton = ({
    pageNumber,
    activeClass,
  }: {
    pageNumber: number;
    activeClass: boolean;
  }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    //first page
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: +currentPage === 1 })
    );
    // before dots
    if (+currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key={"dots-1"}>
          ...
        </span>
      );
    }
    //one before current page
    if (+currentPage !== 1 && +currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: +currentPage - 1,
          activeClass: false,
        })
      );
    }
    //current page
    if (+currentPage !== 1 && +currentPage !== +numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: +currentPage,
          activeClass: true,
        })
      );
    }
    //one after current page
    if (+currentPage !== +numOfPages && +currentPage !== +numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: +currentPage + 1,
          activeClass: false,
        })
      );
    }
    //after dots
    if (+currentPage < +numOfPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key={"dots-1"}>
          ...
        </span>
      );
    }
    //last page
    pageButtons.push(
      addPageButton({
        pageNumber: +numOfPages,
        activeClass: +currentPage === +numOfPages,
      })
    );
    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() =>
          handlePageChange(+currentPage < 2 ? +numOfPages : +currentPage - 1)
        }
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() =>
          handlePageChange(+currentPage >= +numOfPages ? 1 : +currentPage + 1)
        }
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
