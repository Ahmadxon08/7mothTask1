/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import "./Edit.scss";

const initialState = {
  loading: true,
  students: {},
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PENDING":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        students: action.payload,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        students: null,
        error: "Hatolik bor",
      };
    case "UPDATE_PENDING":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "UPDATE_ERROR":
      return {
        ...state,
        loading: false,
        error: "Tahrirlashda hatolik bor",
      };
    default:
      return state;
  }
};

const Edit = () => {
  const { id } = useParams();

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    dispatch({ type: "FETCH_PENDING" });
    try {
      const res = await axios.get(`http://localhost:3000/students/${id}`);
      dispatch({
        type: "FETCH_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "UPDATE_SUCCESS",
      payload: { ...state.students, [name]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_PENDING" });
      await axios.put(`http://localhost:3000/students/${id}`, state.students);
      dispatch({ type: "UPDATE_SUCCESS" });
    } catch (error) {
      dispatch({ type: "UPDATE_ERROR" });
    }
  };

  return (
    <div className="edit">
      <div className="container">
        <div className="edit_head">
          <Link to="/">go back</Link>
          <h1>Students' editor page</h1>
        </div>
        <form onSubmit={handleSubmit} className="edit_content">
          <div className="edit_body">
            <div className="name">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={state?.students.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={state.students?.username || ""}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label htmlFor="group">Group</label>
              <input
                type="text"
                name="group"
                id="group"
                placeholder="Group"
                value={state.students?.company?.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="edit_btn">
              <button className="btn1" type="submit">
                Save
              </button>
              <button className="btn2">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
