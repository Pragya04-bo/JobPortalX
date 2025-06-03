import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import { Link } from 'react-router-dom';
import { CardThree } from './cards';
import { BASE_URL } from '../../header';
function Jobs() {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getMyJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/job/alljobs`, { withCredentials: true });
        setData(response.data.jobs);
        console.log(response.data.jobs);
      } catch (error) {
        console.error("Error fetching all jobs:", error);
      }
    };

    getMyJobs();
  }, []); 

  console.log("Data in state:", data); 
  return (
    <section className="jobs page">
    <div className="container">
      <h1>ALL AVAILABLE JOBS</h1>
      <div className="banner">
        { data &&
           data.map((element) => {
            return (
              <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/job/${element._id}`}>Job Details</Link>
              </div>
            );
          })}
      </div>
    </div>
  </section>
  );
}

export default Jobs;
