import React from 'react';
import { FaUser } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';


const PlayersList = ({ players }) => {
  if (!players || players.length === 0) {
    return <p className="message">No results found.</p>;
  }

  return (
    <div className="players-list">
      <ul className="player-list">
        {players.map((p) => (
          <li className="player-row" key={p.id}>
            <div className="avatar">
              <FaUser size={14} /> {/* Player icon inside avatar */}
            </div>
            <div className="player-info">
              <span className="player-name">{p.name}</span>
              <span className="player-meta">ID: {p.id}</span>
            </div>
            <span className="rating">
              <FaStar size={12} style={{ marginRight: 4 }} />
              {Number(p.averageRating).toFixed(1)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersList;
