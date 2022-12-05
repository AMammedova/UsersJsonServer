import React,{useState,useEffect} from 'react'
import Helmet from '../Helmet/Helmet';
import axios from 'axios';
import { MDBContainer,MDBRow } from 'mdb-react-ui-kit';
import './home.css'
import Header from '../Header/Header';
import ReactPaginate from 'react-paginate';
const Home = () => {
    const [users,setUsers]=useState([])
    const [pageCount,setpageCount]=useState(0)
    let limit=3
    useEffect( ()=>{
      const fetchUser=async ()=>{
        try{
          const response=await axios.get(`http://localhost:3000/users?_page=1&_limit=${limit}`);
         
     setUsers(response.data);
     const total=response.headers.get('x-total-count');
     setpageCount(Math.ceil(total/limit))
        }catch(err){
          console.log(err)
        }
      }
     fetchUser()
    },[])
    const pageUsers= async(currentPage)=>{
      const res= await axios.get(`http://localhost:3000/users?_page=${currentPage}&_limit=${limit}`)
      const curentUser=res.data;
      console.log(curentUser)
      return curentUser;
    }
  const handlePageClick=async(data)=>{

    let currentPage=data.selected+1;
   const usersFormServer=await pageUsers(currentPage)
   setUsers(usersFormServer)
  }
  return (
    <Helmet title={'Home'}>    
        <MDBContainer className='body__container'>
            <MDBRow>
            <div>
           <Header users={users} />
    </div>
            </MDBRow>
        </MDBContainer>
        <ReactPaginate
      previousLabel={'Previous'}
      nextLabe={'next'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={3}
      pageRangeDisplayed={1}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-liNk'}
      activeClassName={'active'}
      />
    </Helmet>
    
  )
}

export default Home