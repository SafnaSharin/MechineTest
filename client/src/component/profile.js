import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import img1 from '../abstract-background-black-background-colour-mix-wallpaper-preview.jpg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Profile() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

   const fetchData = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get("http://localhost:4000/admin/details");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await axios.delete(`http://localhost:4000/admin/delete/${id}`);
        setData(data.filter(item => item._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };
const backTo=()=>{
  navigate("/")
}
  const filteredData = data.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{position:"relative"}}>
      <div className={styles.header}>
        <h1 className={styles.dash_head}>Dashboard</h1>
        
      </div>
      <div className={styles.maindiv} style={{ backgroundImage: `url(${img1})`, height: "89vh" }}>
        <div className={styles.halfBackground}></div>
        <div className={styles.content}>
          <div className={styles.headerContent}>
            <h1 className={styles.heading}>Registered Users</h1>
            <div>
              <input
                type="text"
                placeholder="Search"
                className={styles.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Link to="/sign-in" state={{ isCreate: true }}>
                <button className={styles.createButton}>Create</button>
              </Link>
            </div>
          </div>
          <ul className={styles.list}>
            {filteredData.map((datas) => (
              <li className={styles.listItem} key={datas._id}>
                <div className={styles.listContent}>
                  <img src={`http://localhost:4000/uploads/${datas.image}`} alt="" className={styles.image} />
                  <div className={styles.text}>
                    <p className="fw-bold mb-1">{datas.name}</p>
                    <p className="text-muted mb-0">{datas.address}</p>
                  </div>
                </div>
                <div className={styles.actions}>
                  <Link to={`/edit/${datas._id}`}><EditIcon /></Link>
                  <button className={styles.deleteButton} onClick={() => handleDelete(datas._id)}><DeleteIcon /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div style={{top:"-54px",right:"14px",position:"absolute"}}> <button className={styles.createButton}onClick={backTo}>Logout</button></div>
      </div>
    </div>
  );
}

export default Profile;
