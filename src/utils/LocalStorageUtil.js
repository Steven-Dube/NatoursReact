export const setStorageCurrentUser = (userId, name) => {
  if(localStorage.getItem("currentUser") === null) {
    localStorage.setItem("currentUser", JSON.stringify({
      id: userId,
      name: name,
      tours: []
    }));
  }
}

export const setStorageBoughtTour = (tourId) => {
  let storedCurrentUser = localStorage.getItem("currentUser");

  let currentUser = JSON.parse(storedCurrentUser);
  let tours = currentUser.tours;
  if(!tours.includes(tourId.toString())) {
    tours.push(tourId.toString());
  } else {
    tours = tours.filter(id => id !== tourId.toString());
  }

  currentUser.tours = tours;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

export const isTourBought = (tourId) => {
  let storedCurrentUser = localStorage.getItem("currentUser");
  let currentUser = JSON.parse(storedCurrentUser);
  let tours = currentUser.tours;

  return tours.includes(tourId);
}