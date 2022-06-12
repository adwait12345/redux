import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from'axios';

import { setUsers } from '../redux/actions/Useraction';
import UserDetails from './UserDetails';

import './user.css'


export default function UserListing() {

  const [quantity , setQuantity] = useState(1)

 const handleDecrement = () =>{
setQuantity(prevCount => prevCount - 1)

 }
  const handleIncrement = () =>{
    setQuantity(prevCount => prevCount + 1)
 }



   const [userclick, setuserclick] = useState()

   const [loading, setLoading] = useState(false);

    const users = useSelector((state)=> state.allUsers.users);


   const renderUser = users.map((users)=>{
    const {id,first_name,last_name} = users
     return(<>
     <div >
      
            <button  onClick={()=>setuserclick(id)} key={id}>{first_name}</button>
            
     </div>
    
     </>
        
     );
   })


    const dispatch = useDispatch();

    const FetchingUsers = async() => {
         const response = await axios.get(`https://reqres.in/api/users/?page=${quantity}`).catch((err) =>{
            console.log("Err",err)
         });
        dispatch(setUsers(response.data.data))
        setLoading(true);
    }
  useEffect(()=>{
   FetchingUsers();
  },[quantity]);
  console.log("Users",users)
return(
   <>   <UserDetails userid={userclick}/>

   <div className="buttons">
    <button onClick={handleDecrement}>Previous Page</button>
    <div className='btn'>
    {loading?renderUser:(<div className='loader'>...Loading</div>)}
    </div>
    <button onClick={handleIncrement}>Next Page</button>
   </div>

 <div className="currentpage">
  PageNo:{quantity}
 </div>
  </> 
)

}
