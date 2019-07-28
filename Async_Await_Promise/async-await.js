const posts = [
    { title: 'Post 1', body: 'This is post 1' },
    { title: 'Post 2', body: 'This is post 2' }
];

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((posts) => {
            output += `<li>${posts.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPosts(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);

            const error = false;

            if(!error) {
                resolve();
            } else {
                reject('Error: Something went wrong');
            }
        }, 2000);
    });
}

// createPosts({ title: 'Promised post title', body: 'Promised post body' })
//     .then(getPosts)   
//     .catch(err => console.log('Reject message: ' + err));

//Async/ Await

//Function must be labelled async in order to use the await keyword
async function init(){
    //The await makes sure that createPosts is done before executing getPosts
    await createPosts({ title: 'Promised post title', body: 'Promised post body' });
    
    //getPosts executes after createPosts has finished
    getPosts();
}

//Using Async/Await with Fetch
async function fetchUsers() {
    //Fetch user data
    const res = await fetch('https://jsonplaceholder.typicode.com/users');

    //After above fetch has completed convert data to JSON
    const data = await res.json();

    console.log(data);
}
    