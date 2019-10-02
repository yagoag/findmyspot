import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => thumbnail && URL.createObjectURL(thumbnail), [
    thumbnail,
  ]);

  async function handleSubmit(evt) {
    evt.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');
    console.log('user_id', user_id);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);
    data.append('thumbnail', thumbnail);

    await api.post('/spots', data, { headers: { user_id } });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={preview && { backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input
          type="file"
          onChange={evt => setThumbnail(evt.target.files[0])}
        />
        <img src={camera} alt="Select Thumbnail" />
      </label>

      <label htmlFor="company">COMPANY *</label>
      <input
        id="company"
        placeholder="Your awesome company"
        value={company}
        onChange={evt => setCompany(evt.target.value)}
      />
      <label htmlFor="techs">
        TECHNOLOGIES * <span>(comma separated)</span>
      </label>
      <input
        id="techs"
        placeholder="Node.js, React.js"
        value={techs}
        onChange={evt => setTechs(evt.target.value)}
      />
      <label htmlFor="price">
        DAILY PRICE * <span>(empty for free)</span>
      </label>
      <input
        id="price"
        placeholder="FREE"
        value={price}
        onChange={evt => setPrice(evt.target.value)}
      />

      <button type="submit" className="btn">
        Add spot
      </button>
    </form>
  );
}
