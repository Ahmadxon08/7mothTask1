/* eslint-disable react/no-unescaped-entities */
import { useReducer } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Add.scss";

const initialState = {
  name: "",
  username: "",
  website: "",
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        error: null,
      };
    case "SUBMIT_ERROR":
      return {
        ...state,
        error: action.payload.error,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const Add = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name, value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/students", {
        name: state.name,
        username: state.username,
        website: state.website,
      });

      dispatch({ type: "SUBMIT_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "SUBMIT_ERROR",
        payload: { error: "Talabani qo'shishda xatolik yuz berdi" },
      });
    }
  };

  return (
    <div className="add">
      <div className="container">
        <div className="add_head">
          <h2>Yangi Talaba Qo'shish</h2>
        </div>

        {state.error && <div className="error">{state.error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="firstName">Ism</label>
            <input
              type="text"
              id="firstName"
              name="name"
              value={state.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="lastName">Familiya</label>
            <input
              type="text"
              id="lastName"
              name="username"
              value={state.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="group">Guruh</label>
            <input
              type="text"
              id="group"
              name="website"
              value={state.website}
              onChange={handleChange}
            />
          </div>

          <Link to="/">
            <button className="btn11" type="submit">
              Qo'shish
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Add;
