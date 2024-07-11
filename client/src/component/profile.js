import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Profile() {
  const [data, setData] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin/details");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
   
    
      try {
        await axios.delete(`http://localhost:4000/admin/delete/${id}`);
        alert('Are you sure want to delete?')
        console.log('deleted');
       
      
       
      } catch (err) {
        console.log(err);
      }
    
  };
  
  return (
    <div>
    <div style={{height:"11vh",backgroundColor:"black"}}>
      <h1 className={styles.dash_head}>Dashbord</h1></div>
    <div className={styles.maindiv}>
      <div style={{backgroundColor:"#871c1c",width:"55%",borderRadius:"6px 6px 0  0"}}>
      <div className={styles.header}>
          <h1 className={styles.heading}>Registered Users</h1>
          <div>
          <input
            type="text"
            placeholder="Search"
            // value={search}
            // onChange={handleSearchChange}
            className={styles.search}
          />
          <Link to="/"state={{ isCreate: true }}>
            <button className={styles.createButton}>Create</button>
          </Link>
          </div>
        </div>
    <ul class="list-group list-group-light" className={styles.list}>
    {data && data.map((datas)=>(
   <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <img src={`http://localhost:4000/uploads/${datas.image}`}  alt="" style={{width: "45px" ,height:" 45px"}}
        class="rounded-circle" />
      <div class="ms-3">
        <p class="fw-bold mb-1">{datas.name}</p>
        <p class="text-muted mb-0">{datas.address}</p>
      </div>
    </div>
    <div>
      {/* <h1><i class="bi bi-pencil-square"></i></h1> */}

    <Link to={`/edit/${datas._id}`}><EditIcon /></Link>
    <button style={{backgroundColor:"transparent",border:"none"}} onClick={()=>handleDelete(datas._id)}><DeleteIcon  sx={{color:"#c14848;"}} /></button>
   
    </div>
  </li>
    ))}
 
</ul>
</div>
</div>
</div>
  );
}
export default Profile;
