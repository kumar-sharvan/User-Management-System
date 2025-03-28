import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser({
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
          email: response.data.data.email,
        });
      } catch (error) {
        setMessage({ text: "Failed to fetch user data.", type: "danger" });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${id}`,
        user
      );
      console.log("Updated User Response:", response.data);

      setUser((prevUser) => ({
        ...prevUser,
        ...response.data,
      }));

      setMessage({ text: "User updated successfully!", type: "success" });

      setTimeout(() => {
        setMessage({ text: "", type: "" });
        navigate("/users");
      }, 2000);
    } catch (error) {
      setMessage({ text: "Failed to update user.", type: "danger" });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit User</h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {message.text && (
            <div className={`alert alert-${message.type}`} role="alert">
              {message.text}
            </div>
          )}

          <form onSubmit={handleUpdate} className="card p-4">
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={user.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={user.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/users")}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EditUser;
