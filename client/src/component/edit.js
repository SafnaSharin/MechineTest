import { useState,useEffect } from 'react';
import styles from "./register.module.css";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Form(){
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [address,setAddress]=useState("")
    const [image,setImage]=useState(null)
    const{id}= useParams()
    const navigate = useNavigate();
    
    useEffect(()=>{
        const edit=async()=>{
            try{
                const response=await axios.get(`http://localhost:4000/admin/edit/${id}`);
                const details=response.data;
                console.log(response.data)
                setName(details.name);
                setAddress(details.address);
                setPassword(details.password);
                setImage(details.image)
                
            }
            catch(error){
                console.log(error);
            }
         }
        
        edit();
     },[id])

     const update = async (e) => {
        e.preventDefault();
    
       
        try {
          const response = await axios.put(
            `http://localhost:4000/admin/update/${id}`,
            { name, address, password }, // Send the data as a plain object, not FormData
            {
              headers: { "Content-Type": "application/json" }, // Set appropriate headers for JSON data
            }
          );
    
          console.log("Update response:", response.data);
          navigate('/profile');
        } catch (error) {
          console.log("Update error:", error);
        }
      };

    const handleimg =(e)=>{
        const image=e.target.files[0];
        setImage(image)
       }

   
return(
<section className="h-100 h-custom" style={{backgroundColor: '#8fc4b7'}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-8 col-xl-6">
        <div className="card rounded-3">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp" className={styles.img}  alt="Samplephoto" />
          <div className="card-body p-4 p-md-5">
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>
            <form className="px-md-2">
              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form3Example1q">Name</label>
                <input type="text" id="form3Example1q" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form3Example1q">Address</label>
                <input type="text" id="form3Example1q" className="form-control" value={address} onChange={(e)=>setAddress(e.target.value)} />
              </div>
              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form3Example1q">Password</label>
                <input type="text" id="form3Example1q" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
              </div>
              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form3Example1q">Image</label>
                <input type="file" id="form3Example1q" className="form-control"  accept="image/*"  onChange={handleimg} />
              </div>
             
             
              <button type="submit" className="btn btn-success btn-lg mb-1" onClick={update}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

);
}
export default Form;