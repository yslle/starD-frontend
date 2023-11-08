import {useEffect, useState} from "react";
import Pagination from "react-js-pagination";
const Paging = ({page,totalItemCount,itemsPerPage, handlePageChange }) => {
    useEffect(() => {
        console.log("pagessss:",page);
    }, []);
    const handleLocalPageChange = (selectedPage) => {
        handlePageChange(selectedPage);
    };

    return (
        <Pagination
            activePage={page}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={totalItemCount}
            pageRangeDisplayed={10}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handleLocalPageChange}/>
    );
};
export default Paging;