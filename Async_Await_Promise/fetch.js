//Fetch using promises
function fetchUsersPromise() {
    const userData = fetch('https://jsonplaceholder.typicode.com/users')
       .then((res) => res.json())
       .then((res) => console.log(res))
}

//Fetch using Async/await
async function fetchUsersAsync() {
   const res = await fetch('https://jsonplaceholder.typicode.com/users');

   const data = await res.json();

   console.log(data);
}
  