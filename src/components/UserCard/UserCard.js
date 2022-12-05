import React from 'react'
import './usercard.css'
import Edit from '../Edit/Edit';
import {toast} from 'react-toastify'
import { useNavigate} from 'react-router-dom'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBRow,
    MDBCol
  } from 'mdb-react-ui-kit';
import axios from 'axios';
const UserCard = ({user}) => {
  const navigate=useNavigate()
  const handleDeleteClick=async(id)=>{
 await axios.delete("http://localhost:3000/users/"+id)
 .then((res)=>toast.success("Succesfully Deleted"));
 navigate('/')

  }
 
  return (
    <div>
  
   <MDBCard className='usercard'>
    <MDBCardBody>
      <MDBCardTitle>{user.id}</MDBCardTitle>
      <MDBCardText>
        Name: {user.name}
      </MDBCardText>
      <MDBCardText>
        Surname: {user.surname}
      </MDBCardText>
      <MDBCardText>
        Balance: {user.balance}$
      </MDBCardText>
      <MDBCardText>
        Gender: {user.gender}
      </MDBCardText>
      <MDBCardText>
       Card: {user.card==="true" ? "Exist" : "Don`t Exist"}
      </MDBCardText>
      <MDBCardText>
        Date: {user.date}
      </MDBCardText>
      <MDBCardText>
        Bonus: {user.bonus}$
      </MDBCardText>
     <MDBRow>
    <MDBCol style={{width:"170px"}}><Edit user={user}/></MDBCol>
      <MDBCol><MDBBtn  onClick={()=>handleDeleteClick(user.id)}>Delete</MDBBtn></MDBCol>
     </MDBRow>
    </MDBCardBody>
  </MDBCard>
   


  </div>
  )
}

export default UserCard