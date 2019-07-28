function randomF() {
    console.log('This is a random function which fired because the promise resolved');
}


function returnPromise() {
    return new Promise((resolve, reject) => {
        console.log('This is a promise');
        var promisePayload = 'payload';

        const error = false;

        if(!error) {
            resolve();
            console.log('... It resolved');
        } else {
            reject('Promise rejected as it didnt resolve');
        }
    });
}

returnPromise().then(randomF).catch(err => console.log(err));


// const promise4 = fetch('https://jsonplaceholder.typicode.com/users')
//     .then((res) => 
//         res.json()
//     );

//Messing around with fetch API
var fetchedInfo = fetch('https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch').then((res) => console.log(res));

