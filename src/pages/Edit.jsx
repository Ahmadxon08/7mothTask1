/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import "./Edit.scss";

const initialState = {
  loading: true,
  students: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
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
  }
};
const Edit = () => {
  const { id } = useParams;
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    dispatch({ type: "FETCH_PENDING" });
    try {
      const res = await axios.get(`http://localhost:3000/students/${id}`);
      dispatch({
        type: "FETCH_SUCCESS",
        payload: res.data,
      });

      console.log(res.data);
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
      });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //////////////////////////////////////////

  const handleChange = ({ target }) => {
    const { name, value } = target;
    alert("Are you sure you want to change this student account ?");
    dispatch({
      type: "UPDATE_SUCCESS",
      payload: { ...state.students, [name]: value },
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/students/${id}`,
        state.students
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      console.log(res.data);
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
        <div className="edit_content">
          <div className="edit_body">
            <div className="name">
              <label htmlFor="firstName">FirstName</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="firstName"
                value={state?.students?.name}
                onChange={handleChange}
              />
            </div>
            <div className="lastName">
              <label htmlFor="lastName">FirstName</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="lastName"
                value={state?.students?.username}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label htmlFor="group">Group</label>
              <input
                type="text"
                name="group"
                id="group"
                placeholder="group"
                value={state?.student?.company?.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="edit_btn">
            <button onClick={handleSubmit}>Save</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
