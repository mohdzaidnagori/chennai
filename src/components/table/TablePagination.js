import React, { useEffect, useState } from "react";

const renderData = (data) => {
  return (
    
      data.map((item) => {
        return (
          <tr key={item.id}>
          <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.path}</td> 
      </tr>
        )
      })
    
  );
};



function TablePagination(props) {

  const [data, setData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(3);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);


  setData(props.bodyData)


    
 
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  console.log(props.bodyData)
 const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
            <div
            key={number}
          id={number}
          onClick={handleClick}
          className={`table__pagination-item ${currentPage === number ? "active" : null}`}
           >
          {number}
            </div>
        
          
        
      );
    } else {
      return null;
    }
  });
  
 

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <i className='bx bx-skip-next' onClick={handleNextbtn}></i>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <i className='bx bx-skip-previous' onClick={handlePrevbtn}></i>;
  }

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };

  return (
    <>
    <div className='table-wrapper'>
      <table>
          {
              props.headData && props.renderHead ? (
                <thead>
                <tr>
                    {
                        props.headData.map((item,index) => props.renderHead(item,index))
                    }
                </tr>
            </thead>
              ) : null
          }
         <tbody>
         {renderData(currentItems)}
         </tbody>
          
      </table>
    </div>
     
      <div className="table__pagination"> 
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
      </div>
      <div className="table__load-more">
      <button className="button__table" onClick={handleLoadMore}>
        Load More
      </button>
      </div>
     
    
    </>
  );
}

export default TablePagination;