import React from 'react'
import './Table.css'

const Table = (props) => {

   const initDataShow = props.limit && props.bodyData ? props.bodyData.slice(0,Number(props.limit)) : props.bodyData
   const [dataShow,setDataShow] = React.useState(initDataShow)
   

   let pages = 1;
   let range = [];
   let range_limit= [];


   if(props.limit !== undefined){
     let page = Math.floor(props.bodyData.length / Number(props.limit));
      pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
     range = [...Array(pages).keys()]
     range_limit= range.slice(0,10)
   }
   const [rangeShow,setRangeShow] = React.useState(range_limit)
   const [currPage,setCurrPage] = React.useState(0)
   const [rangeNumber,setRangeNumber] = React.useState(10)
   const [rangePreNumber,setPreRangeNumber] = React.useState()

   const selectPage = page => {
    const start = props.limit * page
    console.log(page)
    const end = start + Number(props.limit)
    setCurrPage(page)
    setDataShow(props.bodyData.slice(start,end))
  }
   

   const nextRange = () => {
     if( rangeNumber < range.length){
      setRangeNumber(rangeNumber + rangeShow.length)
      const rangeStart = rangeNumber;
      console.log(rangeNumber)
      const rangeEnd =   rangeStart + rangeShow.length;
      setRangeShow(range.slice(rangeStart,rangeEnd)); 
     }
     else{
       setRangeShow(range.slice(0,10))
       setRangeNumber(10)
      
     }
   }
   const prevRange = () => {
    
    setPreRangeNumber(rangeNumber - rangeShow.length)
    console.log(rangePreNumber)
  }

  

  return (
    <div>
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
          {
              props.bodyData && props.renderBody ? (
                  <tbody>
                      {
                         dataShow.map((item,index)=> props.renderBody(item,index))
                      }
                  </tbody>
              ) : null
          }
      </table>
    
    </div>
         {
          pages > 1 ? (
           <div className="table__pagination">
                  <i onClick={() => prevRange()} className='bx bx-skip-previous'></i>
               {
                 rangeShow.map((item,index) => (
                      <div key={index} onClick={() => selectPage(item)} className={`table__pagination-item ${currPage === index  ? 'active' : ''}`}>
                      {item + 1}
                      </div>    
                 ))
                 
               }  
                 <i onClick={() => nextRange()} className='bx bx-skip-next'></i>
              </div>
          ) : null
        }
    </div>
  )
}

export default Table
