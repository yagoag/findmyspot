import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';
import './styles.css';

function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [bookingReqs, setBookingReqs] = useState([]);

  const user_id = localStorage.getItem('user');
  const socket = useMemo(
    () =>
      socketio('http://localhost:3333', {
        query: { user_id },
      }),
    [user_id],
  );

  useEffect(() => {
    socket.on('booking_request', data => {
      setBookingReqs([...bookingReqs, data]);
    });
  }, [bookingReqs, socket]);

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

  async function handleBookingApproval(id, approved = true) {
    api.post(`/bookings/${id}/${approved ? 'approve' : 'reject'}`);

    setBookingReqs(bookingReqs.filter(req => req._id !== id));
  }

  return (
    <>
      <ul className="notifications">
        {bookingReqs.map(bookingReq => (
          <li key={bookingReq._id}>
            <p>
              <strong>{bookingReq.user.email}</strong> has requested to book{' '}
              <strong>{bookingReq.spot.company}</strong> on{' '}
              <strong>{bookingReq.date}</strong>
            </p>
            <button
              className="reject"
              onClick={() => handleBookingApproval(bookingReq._id, false)}
            >
              REJECT
            </button>
            <button
              className="approve"
              onClick={() => handleBookingApproval(bookingReq._id)}
            >
              APPROVE
            </button>
          </li>
        ))}
      </ul>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header
              style={{
                backgroundImage: `url(${spot.thumbnail_url})`,
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
