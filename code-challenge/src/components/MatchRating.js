import React, { useState } from 'react';
import { submitRating } from '../api/ratingApi';
import { FaUser, FaStar } from 'react-icons/fa';

const MatchRating = ({ players, setPlayers }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [rating, setRating] = useState(4.0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlayer) {
      setMessage({ type: 'error', text: 'Please select a player.' });
      return;
    }
    setIsSubmitting(true);
    setMessage({ type: 'info', text: 'Submitting rating…' });
    try {
      const updatedPlayers = await submitRating(selectedPlayer, rating, players);
      setPlayers(updatedPlayers);
      setMessage({ type: 'success', text: 'Rating submitted successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="match-rating">
      <h2>Rate a Player</h2>
      <form onSubmit={handleSubmit} className="rating-form">
        <div className="form-row">
          <label htmlFor="player-select">
            <FaUser style={{ marginRight: 6 }} /> Player:
          </label>
          <select
            id="player-select"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            disabled={isSubmitting}
          >
            <option value="">-- Select --</option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="rating-slider">
            <FaStar style={{ marginRight: 6 }} /> Rating: {rating.toFixed(1)}
          </label>
          <input
            type="range"
            id="rating-slider"
            min="1.0"
            max="7.0"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            disabled={isSubmitting}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Submit'}
        </button>

        {message && (
          <p
            className={`message ${
              message.type === 'success'
                ? 'success'
                : message.type === 'error'
                ? 'error'
                : ''
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default MatchRating;
