import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const res = await api.get('/dashboard', {
        headers: { user_id },
      });

      setSpots(res.data);
    }
    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header
              style={{
                backgroundImage: `url(${spot.thumbnail_url
                  .replace(/\(/g, '')
                  .replace(/\)/g, '')})`,
              }}
            ></header>
            <strong>{spot.company}</strong>
            <span>{spot.price ? `$${spot.price.toFixed(2)}/day` : 'FREE'}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Add new spot</button>
      </Link>
    </>
  );
}

export default Dashboard;
