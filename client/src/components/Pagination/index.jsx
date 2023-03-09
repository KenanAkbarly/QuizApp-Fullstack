import React from 'react'

const Pagination = ({totalPost, postPerPage, setCurrentPage}) => {
    let pages = [];
    for (let i = 0; i<= Math.ceil(totalPost/postPerPage); i++){
        pages.push(i);
    }
  return (
    <div>
        {
            pages.map((pages, index)=>{
                return <button key={index} onClick={()=> setCurrentPage(pages)}>{pages}</button>
            })
        }
    </div>
  )
}

export default Pagination