import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Edit.scss";

const Edit = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    website: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/students/${id}`);
        setFormData(res.data);
        setLoading(false);
      } catch (error) {
        setError("Malumotlar yuklanmadi");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/students/${id}`, formData);
      // Redirect to Home page after successful edit
      window.location.href = "/";
    } catch (error) {
      setError("Tahrirlashda xatolik yuz berdi");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="edit">
      <div className="container">
        <div className="edit_head">
          <Link to="/">Orqaga</Link>
          <h1>Talabani tahrirlash sahifasi</h1>
        </div>
        <div className="edit_content">
          <form onSubmit={handleSubmit} className="edit_body">
            <div className="name">
              <label htmlFor="firstName">Ism</label>
              <input
                type="text"
                name="name"
                id="firstName"
                placeholder="Ism"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Familiya</label>
              <input
                type="text"
                name="username"
                id="lastName"
                placeholder="Familiya"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label htmlFor="group">Guruh</label>
              <input
                type="text"
                name="website"
                id="group"
                placeholder="Guruh"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            <div className="edit_btn">
              <button className="btn1" type="submit">
                Saqlash
              </button>
              <Link to="/">
                <button className="btn2">Bekor qilish</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
