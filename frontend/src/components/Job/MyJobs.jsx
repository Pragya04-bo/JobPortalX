import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import './MyJob.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../header';
import toast from 'react-hot-toast';
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
function MyJobs() {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const navigateTo=useNavigate();
  if(!isAuthorized){
    navigateTo("/login");
  }
  useEffect(() => {
    const getMyJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/job/myjobs`, { withCredentials: true });
        setMyJobs(response.data.myjobs);
        console.log(response.data.myjobs);
      } catch (error) {
        console.error("Error fetching my jobs:", error);
        toast.error(error.response.data);
      }
    };

    getMyJobs();
  }, []); 

  const deletethejob = async (id) => {
    try {
      const {data}= await axios.delete(`${BASE_URL}/job/delete/${id}`, { withCredentials: true });
      console.log(data);
      toast.success(data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting the job:", error);
    }
  };

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`${BASE_URL}/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  // console.log("Data in state:", data); 
  return (
    <>
    <div className="myJobs page">
      <div className="container">
        <h1>Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <>
            <div className="banner">
              {myJobs.map((element) => (
                <div className="card" key={element._id}>
                  <div className="content">
                    <div className="short_fields">
                      <div>
                        <span>Title:</span>
                        <input
                          type="text"
                          disabled={
                            editingMode !== element._id ? true : false
                          }
                          value={element.title}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "title",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        {" "}
                        <span>Country:</span>
                        <input
                          type="text"
                          disabled={
                            editingMode !== element._id ? true : false
                          }
                          value={element.country}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "country",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <span>City:</span>
                        <input
                          type="text"
                          disabled={
                            editingMode !== element._id ? true : false
                          }
                          value={element.city}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "city",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <span>Category:</span>
                        <select
                          value={element.category}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "category",
                              e.target.value
                            )
                          }
                          disabled={
                            editingMode !== element._id ? true : false
                          }
                        >
                          <option value="Graphics & Design">
                            Graphics & Design
                          </option>
                          <option value="Mobile App Development">
                            Mobile App Development
                          </option>
                          <option value="Frontend Web Development">
                            Frontend Web Development
                          </option>
                          <option value="MERN Stack Development">
                            MERN STACK Development
                          </option>
                          <option value="Account & Finance">
                            Account & Finance
                          </option>
                          <option value="Artificial Intelligence">
                            Artificial Intelligence
                          </option>
                          <option value="Video Animation">
                            Video Animation
                          </option>
                          <option value="MEAN Stack Development">
                            MEAN STACK Development
                          </option>
                          <option value="MEVN Stack Development">
                            MEVN STACK Development
                          </option>
                          <option value="Data Entry Operator">
                            Data Entry Operator
                          </option>
                        </select>
                      </div>
                      <div>
                        <span>
                          Salary:{" "}
                          {element.fixedSalary ? (
                            <input
                              type="number"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.fixedSalary}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "fixedSalary",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            <div>
                              <input
                                type="number"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.salaryFrom}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "salaryFrom",
                                    e.target.value
                                  )
                                }
                              />
                              <input
                                type="number"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.salaryTo}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "salaryTo",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          )}
                        </span>
                      </div>
                      <div>
                        {" "}
                        <span>Expired:</span>
                        <select
                          value={element.expired}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "expired",
                              e.target.value
                            )
                          }
                          disabled={
                            editingMode !== element._id ? true : false
                          }
                        >
                          <option value={true}>TRUE</option>
                          <option value={false}>FALSE</option>
                        </select>
                      </div>
                    </div>
                    <div className="long_field">
                      <div>
                        <span>Description:</span>{" "}
                        <textarea
                          rows={5}
                          value={element.description}
                          disabled={
                            editingMode !== element._id ? true : false
                          }
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <span>Location: </span>
                        <textarea
                          value={element.location}
                          rows={5}
                          disabled={
                            editingMode !== element._id ? true : false
                          }
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "location",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {/* Out Of Content Class */}
                  <div className="button_wrapper">
                    <div className="edit_btn_wrapper">
                      {editingMode === element._id ? (
                        <>
                          <button
                            onClick={() => handleUpdateJob(element._id)}
                            className="check_btn"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleDisableEdit()}
                            className="cross_btn"
                          >
                            <RxCross2 />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEnableEdit(element._id)}
                          className="edit_btn"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => deletethejob(element._id)}
                      className="delete_btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>
            You've not posted any job or may be you deleted all of your jobs!
          </p>
        )}
      </div>
    </div>
  </>
  );
}

export default MyJobs;
