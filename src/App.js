import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function App() {
const[formdata,setformdata]=useState({name:'',id:''})
const[data,setdata]=useState([])

 const inputhandler=(event)=>{
  setformdata({...formdata,[event.target.name]:event.target.value})
 }
 useEffect(()=>{
  fetchdata();
 },[])

 const fetchdata=async()=>{
  try{
  const response=await axios.get("http://localhost:3000/items")
   console.log("res",response)
    setdata(response.data)
  }
  catch(errors){
    console.log("errors")
  }

}

 const submithandler=async()=>{
  try{
    const response= await axios.post("http://localhost:3000/items",formdata)
     console.log("respost",response)
        fetchdata();
        setformdata({name:'',id:''})
    }
    catch(errors){
      console.log("errors")
    }
  
 }
 const delhanlder=async(id)=>{
  try{
     await axios.delete(`http://localhost:3000/items/${id}`)
     fetchdata();
   }
    catch(errors){
      console.log("errors")
    }
 }
 const edithandler = async (id) => {
  try {
    await axios.put(`http://localhost:3000/items/${id}`, formdata);
    fetchdata();
  } catch (error) {
    console.error('Error updating item:', error);
  }
};
 
  return (
    <div>
      <input type="text" placeholder="eneter name" name="name" value={formdata.name} onChange={inputhandler}/><br/>
  
      <input type="text" placeholder="enter id" name="id" value={formdata.id} onChange={inputhandler}/><br/>
    
      <button onClick={submithandler}>submit</button>
      {data && data.map((item)=>(
        <div key={item.id}>
          <p>{item.id}- {item.name} <button onClick={()=>delhanlder(item.id)}>delete</button><button onClick={()=>edithandler(item.id)}>edit</button></p> 
      
          </div>
      ))}
    </div>
  )
}
