import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
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
import './adduser.css'

const Adduser = () => {
  const navigate=useNavigate()
  const json = JSON.stringify(new Date().toISOString());
  const date = new Date(JSON.parse(json));

   const currentDate=date.toDateString();
   
  // console.log(currentDate)
  const [basicModal, setBasicModal] = useState(false);
  const [formData,setFormData]=useState({
    name:"",
    surname:"",
    gender:"",
    balance:"",
    card:"",
    date:currentDate,
    bonus:""
  })
  const toggleShow = () => setBasicModal(!basicModal);
  const capitalizeFirstLetter = ([ first, ...rest ], locale = navigator.language) =>
  first === undefined ? '' : first.toLocaleUpperCase(locale) + rest.join('')
  const handleFormSubmit=async(e)=>{
  
let response=await axios.post("http://localhost:3000/users",formData)
if(response){

  toast.success('Succesfully Added in')
}
else{
  toast.error("Somthing wrent wrong")
}
setFormData({
  name:"",
  surname:"",
  gender:"",
  balance:"",
  card:"",
  date:currentDate,
  bonus:""
})
navigate('/')
  }
  const isValid = Object.values(formData).every(value => value.length > 0)
  return (
    <div className='mb-4'>
       <MDBBtn onClick={toggleShow}>Add User</MDBBtn>
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
          <MDBValidationItem feedback='Please choose a name.' invalid>
          <MDBInput id='name' label='First name' 
          value={formData.name}
          onChange={(e)=>{setFormData({...formData,name:capitalizeFirstLetter(e.target.value)})}}
          required
          />
          </MDBValidationItem>
        </MDBCol>
        <MDBCol>
         <MDBValidationItem feedback='Please choose a surname.' invalid>
         <MDBInput id='surname' label='Surname'
                  value={formData.surname}
                  onChange={(e)=>{setFormData({...formData,surname:capitalizeFirstLetter(e.target.value)})}}
                  required />
         </MDBValidationItem>
        </MDBCol>
      </MDBRow>
     
      <MDBValidationItem feedback='Please choose a gender' invalid>
      <div>
                <select className='mb-4'
                value={formData.gender}
                onChange={(e)=>{setFormData({...formData,gender:e.target.value})}}
                required>
                  <option>Gender</option>
                  <option disabled>Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
              
                </select>
              </div>
      </MDBValidationItem>
             <MDBValidationItem feedback='Please choose a balance' invalid>
             <MDBInput className='mb-4'
               type='number' 
               id='balance'
                label='Amount of balance'
                value={formData.balance}
                onChange={(e)=>{setFormData({...formData,balance:e.target.value})}}
                required
                />
             </MDBValidationItem>
      
    <MDBValidationItem feedback='Please choose a card' invalid>
    <div>
                <select className='mb-4'
                value={formData.card}
                onChange={(e)=>{setFormData({...formData,card:e.target.value})}}
                required>
                  <option>Is Card?</option>
                  <option disabled>Is Card ?</option>
                  <option value="true">Exist Card</option>
                  <option value="false">No Exist Card</option>
              
                </select>
              </div>
    </MDBValidationItem>
              <MDBValidationItem feedback='Please choose a bonus' invalid>
              <MDBInput className='mb-4'
               type='number'
                id='bonus' 
                label='Bonus'
                value={formData.bonus}
                onChange={(e)=>{setFormData({...formData,bonus:e.target.value})}}
                required
                />
              </MDBValidationItem>
    

            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn type="submit"
  disabled={!isValid}
  title={isValid ? "Create your post" : "All fields must be filled out."} onClick={handleFormSubmit}>Add User</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      </MDBValidation>
    </div>
  )
}

export default Adduser