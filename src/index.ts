fetch("http://localhost:8000/users")
  .then((res) => res.json())
  .then((data) => console.table(data));
