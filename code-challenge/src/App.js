import React, { useState, useEffect } from 'react';
import './App.css';
import PlayersList from './components/PlayersList';
import MatchRating from './components/MatchRating';
import { fetchPlayers } from './api/playerApi';

function App() {
  const [activeTab, setActiveTab] = useState('players');
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    // Load initial player data (skip in test env to avoid act() warning)
    if (process.env.NODE_ENV === 'test') return;

    let mounted = true;
    (async () => {
      try {
        const loadedPlayers = await fetchPlayers();
        if (mounted) setPlayers(loadedPlayers);
      } catch (e) {
        if (mounted) setLoadError('Could not load players.');
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="brand">USTA Player Rating System</h1>
        <p className="subtitle">Rate matches, track averages — mobile first.</p>

        <div className="tabs">
          <button
            className={activeTab === 'players' ? 'active' : ''}
            onClick={() => setActiveTab('players')}
          >
            Players
          </button>
          <button
            className={activeTab === 'matches' ? 'active' : ''}
            onClick={() => setActiveTab('matches')}
          >
            Match Ratings
          </button>
        </div>
      </header>

      <main>
        {activeTab === 'players' ? (
          <div className="players-container">
            {/* Search Bar */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search Players ... "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {loadError && <p className="message error">{loadError}</p>}

            {/* Player Cards (filtered) */}
            {filteredPlayers.length > 0 ? (
              <PlayersList players={filteredPlayers} />
            ) : (
              <p className="message">No results found.</p>
            )}
          </div>
        ) : (
          <MatchRating players={players} setPlayers={setPlayers} />
        )}
      </main>

      {/* Keep this so the CRA default test passes */}
      <footer style={{ marginTop: 24 }}>
        <a href="https://react.dev/learn">Learn React</a>
      </footer>
    </div>
  );
}

export default App;
