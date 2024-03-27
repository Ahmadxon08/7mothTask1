import { Link } from "react-router-dom";
import "./Home.scss";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
const edit = "./edit.svg";
const delete1 = "./delete.svg";

const initialState = {
  loading: false,
  students: [],
  error: null,
  deleteID: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PENDING":
      return {
        loading: true,
        students: [],
        error: null,
        deleteID: null,
      };
    case "FETCH_SUCCESS":
      return {
        loading: false,
        students: action.payload,
        error: null,
        deleteID: null,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        students: [],
        deleteID: null,
        error: "Hatolik bor",
      };

    case "DELETE_PENDING":
      return {
        ...state,
        deleteID: action.payload,
      };
    case "DELETE_SUCCESS":
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
        deleteID: null,
      };

    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    dispatch({ type: "FETCH_PENDING" });
    try {
      const res = await axios.get("http://localhost:3000/students");
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
  }, []);

  ////////////////////////////////
  const deleteStudent = async (id) => {
    dispatch({ type: "DELETE_PENDING", payload: id });
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/students/${state.deleteID}`);
      dispatch({ type: "DELETE_SUCCESS", payload: state.deleteID });
      setShowModal(false);
    } catch (error) {
      console.log(error.massege, "Hatolik bor");
    }
  };

  return (
    <div className="home">
      {state.loading && <h1 className="load"> Loading...</h1>}
      {state.error && <h1 className="load">{state.error}</h1>}
      <div className="container">
        <div className="home_head">
          <h1>Students</h1>
          <Link to="/add"> Add +</Link>
        </div>

        <div className="table">
          <div className="head">
            <span>id</span>
            <span>firstName</span>
            <span>lastName</span>
            <span>website</span>
            <span>action</span>
          </div>
          <div className="body">
            {state.students.map((student) => (
              <div className="row" key={student.id}>
                <span>{student.id}</span>
                <span>{student.name}</span>
                <span>{student.username}</span>
                <span>{student?.website}</span>
                <span className="action">
                  <Link to={`./edit/${student.id}`}>
                    <button className="btn1">
                      <img src={edit} alt="edit" />
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteStudent(student.id)}
                    className="btn2"
                  >
                    <img src={delete1} alt="delete" />
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal_content">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this student account ?</p>
            <div className="modal_btn">
              <button className="btn11" onClick={confirmDelete}>
                Delete
              </button>
              <button className="btn22" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
