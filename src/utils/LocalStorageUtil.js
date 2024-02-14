export const setUserSelectedTours = (userId, name) => {
  const loc = localStorage.getItem("currentUser") === null;
  if(localStorage.getItem("currentUser") === null) {
    localStorage.setItem("currentUser", JSON.stringify({
      id: userId,
      name: name,
      boughtTours: 0
    }));
  }
}