import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate} from 'react-router-dom'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBValidationItem,
  MDBValidation
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';


const Edit = ({user}) => {
  const json = JSON.stringify(new Date().toISOString());
  const date = new Date(JSON.parse(json));
   const currentDate=date.toDateString();
   const navigate=useNavigate();
  const [basicModal, setBasicModal] = useState(false);
  const[update,setUpdate]=useState(

    {
      name:"",
      surname:"",
      gender:"",
      balance:"",
      card:"",
      date:currentDate,
      bonus:""
    }
  )

  const toggleShow = () => setBasicModal(!basicModal);
  const capitalizeFirstLetter = ([ first, ...rest ], locale = navigator.language) =>
  first === undefined ? '' : first.toLocaleUpperCase(locale) + rest.join('')
  const handleUpdate=()=>{
    toggleShow();
    setUpdate({
      name:user.name,
      surname:user.surname,
      gender:user.gender,
      balance:user.balance,
      card:user.card,
      date:user.date,
      bonus:user.bonus

     });

     

  }
  const handleUpdateSubmit=async(id)=>{
    let response=await axios.put("http://localhost:3000/users/"+id,update)
    if(response){
      toast("data updated succesfully")
    }
    else{
      toast("something wrent wrong")
    }
   
    navigate('/')
      }
      const isValid = Object.values(update).every(value => value.length > 0)
  return (
    <div>
       <MDBBtn onClick={handleUpdate }>Edit User</MDBBtn>
       <MDBValidation isValidated>
       <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add User</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
         
    
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBValidationItem feedback='Please choose a name.' invalid >
          <MDBInput id='name' label='First name' 
           value={update.name}
           onChange={(e)=>{setUpdate({...update,name:capitalizeFirstLetter(e.target.value)})}}
          required
          />
          </MDBValidationItem>
         
        </MDBCol>
        <MDBCol>
         <MDBValidationItem feedback='Please choose a username.' invalid>
         <MDBInput id='surname' label='Surname'
           value={update.surname}
           onChange={(e)=>{setUpdate({...update,surname:capitalizeFirstLetter(e.target.value)})}}
           required
                  />
         </MDBValidationItem>
        </MDBCol>
      </MDBRow>
     
      <MDBValidationItem feedback='Please choose a gender.' invalid>
      <div>
                <select className='mb-4'
                value={update.gender}
                onChange={(e)=>{setUpdate({...update,gender:e.target.value})}}
                required
               >
                  <option disabled>Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  </select>
              </div>
      </MDBValidationItem >
              <MDBValidationItem feedback='Please choose a balance.' invalid>
              <MDBInput className='mb-4'
               type='number' 
               id='balance'
                label='Amount of balance'
                value={update.balance}
                onChange={(e)=>{setUpdate({...update,balance:e.target.value})}}
                required
                />
              </MDBValidationItem>
      
     <MDBValidationItem feedback='Please choose a card.' invalid>
     <div>
                <select className='mb-4'
                value={update.card}
                onChange={(e)=>{setUpdate({...update,card:e.target.value})}}
                required
                >
                  
                  <option disabled>Is Card ?</option>
                  <option value="true">Exist Card</option>
                  <option value="false">No Exist Card</option>
              
                </select>
              </div>
     </MDBValidationItem>
             <MDBValidationItem feedback='Please choose a bonus.' invalid>
             <MDBInput className='mb-4'
               type='number'
                id='bonus' 
                label='Bonus'
                value={update.bonus}
                onChange={(e)=>{setUpdate({...update,bonus:e.target.value})}}
                required
                
                />
             </MDBValidationItem>
   
         

            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn type='submit' onClick={()=>handleUpdateSubmit(user.id)}
               disabled={!isValid}
               title={isValid ? "Create your post" : "All fields must be filled out."}>Update User</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
       </MDBValidation>
     
    </div>
  )
}

export default Edit