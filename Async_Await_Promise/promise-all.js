//Executing a callback after multiple promises have been resolved
const promise1 = Promise.resolve('hello world');
const promise2 = 10;
const promise3 = new Promise((resolve, reject) => 
    setTimeout(resolve, 2000, 'Goodbye')
);

//Using the fetch api to return a promise
const promise4 = fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => 
        res.json()
    );

Promise.all([promise1, promise2, promise3, promise4])
    //Execute callback function only after multiple specified promises have resolved
    .then(values => console.log(values));