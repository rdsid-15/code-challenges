import { updatePlayers } from './playerApi';

// Store a new rating
export const storeRating = async (playerId, rating) => {
  const ratingsStr = localStorage.getItem('ratings') || '{}';
  const ratings = JSON.parse(ratingsStr);
  
  if (!ratings[playerId]) {
    ratings[playerId] = [];
  }
  
  ratings[playerId].push(rating);
  localStorage.setItem('ratings', JSON.stringify(ratings));
  
  return ratings[playerId];
};

// Calculate average rating
export const calculateAverageRating = async (playerId) => {
  const ratingsStr = localStorage.getItem('ratings') || '{}';
  const ratings = JSON.parse(ratingsStr);
  const playerRatings = ratings[playerId] || [];
  
  await new Promise(resolve => setTimeout(resolve, 10000));
  
  if (playerRatings.length === 0) return 0;
  
  const sum = playerRatings.reduce((acc, rating) => acc + rating, 0);
  return sum / playerRatings.length;
};

// Submit a rating and update player's average
export const submitRating = async (playerId, rating, allPlayers) => {
  // Store the new rating
  await storeRating(playerId, rating);
  
  // Calculate new average
  const newAverage = await calculateAverageRating(playerId);
  
  // Update player's average rating
  const updatedPlayers = allPlayers.map(player => 
    player.id === playerId 
      ? { ...player, averageRating: newAverage }
      : player
  );
  
  // Save updated players
  return await updatePlayers(updatedPlayers);
}; 