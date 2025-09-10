// Initial mock data
const initialPlayers = [
  { id: '1', name: 'John Smith', averageRating: 4.5 },
  { id: '2', name: 'Sarah Johnson', averageRating: 5.2 },
  { id: '3', name: 'Michael Brown', averageRating: 3.8 },
  { id: '4', name: 'Emily Davis', averageRating: 6.1 },
  { id: '5', name: 'David Wilson', averageRating: 4.0 },
];

// Initialize localStorage with mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem('players')) {
    localStorage.setItem('players', JSON.stringify(initialPlayers));
  }
  
  if (!localStorage.getItem('ratings')) {
    localStorage.setItem('ratings', JSON.stringify({}));
  }
};

// Fetch all players
export const fetchPlayers = async () => {
  initializeStorage();
  return JSON.parse(localStorage.getItem('players') || '[]');
};

// Update players in storage
export const updatePlayers = async (players) => {
  localStorage.setItem('players', JSON.stringify(players));
  return players;
}; 