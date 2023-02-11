import ReactPaginate from "react-paginate";
import { FcPrevious, FcNext } from "react-icons/fc";

import "./_pagination.scss";

interface IPaginstion {
   initialPage?: number;
   itensPerPage?: number;
   total?: number;
   marginPagesDisplayed?: number;
   pageCount?: number;
   pageRangeDisplayed?: number;
   onChange: ({ selected }: { selected: number }) => void;
}

export const Pagination: React.FC<IPaginstion> = ({
   itensPerPage = 10,
   initialPage = 1,
   total = 10,
   onChange,
   marginPagesDisplayed,
   pageCount = 1,
   pageRangeDisplayed,
}) => {
   return (
      <div className="pagination__div">
         <ReactPaginate
            initialPage={initialPage}
            activeClassName="item active "
            breakClassName="item break-me"
            breakLabel="..."
            containerClassName="pagination"
            disabledClassName="disabled-page"
            marginPagesDisplayed={marginPagesDisplayed}
            nextClassName="item"
            nextLabel={<FcNext />}
            onPageChange={onChange}
            pageCount={pageCount}
            pageClassName="item pagination-page"
            pageRangeDisplayed={pageRangeDisplayed}
            previousClassName="item"
            previousLabel={<FcPrevious />}
         />
      </div>
   );
};
