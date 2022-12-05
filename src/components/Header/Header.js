import React,{useEffect, useState} from 'react'
import {Col} from 'reactstrap'
import Adduser from '../Adduser/Adduser'
import UserList from '../UserList/UserList'
const Header = ({users}) => {
    const [usersData,setUsersData]=useState(users)
  useEffect(()=>{
    setUsersData(users)
  },[users])
     const handleSearch=(e)=>{
        const searchItem=e.target.value
        const searchedUsers=users.filter(item=>item.name.toLowerCase().includes(searchItem.toLowerCase())||
        item.surname.toLowerCase().includes(searchItem.toLowerCase()) || 
        item.balance.toString().includes(searchItem) ||
         item.bonus.toString().includes(searchItem)  ||
         item.date.includes(searchItem) 
         )
        setUsersData(searchedUsers)
      }
      const handleMouseOut=(e)=>{
        e.target.value=''
        e.target.value.blur()

      }
      const handleFilter=e=>{
        const filterValue=e.target.value
        if(filterValue==='female'){
          const filteredUsers=users.filter(item=>item.gender==='female')
          setUsersData(filteredUsers)
        }
        if(filterValue==='male'){
          const filteredUsers=users.filter(item=>item.gender==='male')
          setUsersData(filteredUsers)
        }
        if(filterValue==='true'){
          const filteredUsers=users.filter(item=>item.card==="true")
          setUsersData(filteredUsers)
        }
        if(filterValue==='false'){
          const filteredUsers=users.filter(item=>item.card==="false")
          setUsersData(filteredUsers)
        }
        if(filterValue==='default'){
  
          setUsersData(users)
        }
    
       
      }
      const [sortState, setSortState] = useState("none");
        const sortMethods = {
          none: { method: (a,b)=>null},
          name: {  method: (a, b) => (a.name > b.name ? 1 : -1)  },
          surname: { method: (a, b) => (a.surname > b.surname ? 1 : -1) },
          balance: { method: (a, b) => (a.balance > b.balance ? 1 : -1) },
          date: { method: (a, b) => (a.date > b.date ? 1 : -1) },

        };
    

      
   
      useEffect(()=>{
 setUsersData([].concat(users).sort(sortMethods[sortState].method))
      },[sortState])
      
   

  return (
    <div>
        <section>
        <div className='header'>
            <Col>
            <div className="box mb-4">
    <form name="search">
        <input type="text" className="input" name="txt" onMouseOut={handleMouseOut} onChange={handleSearch}/>
    </form>
    <i className="fas fa-search"></i>

</div>
            
            </Col>
            <Col>
            <div className="filter__widget mb-4">
                <select onChange={handleFilter}>
                  <option value="default">Filter by Category</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="true">Card is exist</option>
                  <option value="false">Card is no exist</option>
                </select>
              </div>
            </Col>
            <Col>
            <div className="filter__widget mb-4">
            <select defaultValue={'DEFAULT'}  onChange={(e) => setSortState(e.target.value)}>
              
        <option value="DEFAULT" disabled>Sort by</option>
        <option value="name">Name</option>
        <option value="surname">Surname</option>
        <option value="balance">Balance</option>
        <option value="date">Date</option>
        
      </select>
              </div></Col>
    
            <Col> 
            <Adduser/>
            </Col>
            
            
        </div>
        </section>
       
    <section>
    {
                usersData.length === 0? <h1 style={{marginTop:"15%"}} className='text-center fs-4'>No users are founded</h1> :  <UserList users={usersData}/> 
              }
    </section>
    </div>
  )
}

export default Header