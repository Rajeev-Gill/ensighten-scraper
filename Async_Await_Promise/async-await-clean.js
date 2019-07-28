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


//Promises
// function initP() {
//     createPosts({ title: 'Promised post title', body: 'Promised post body' })
//     .then(getPosts);
// } 

//Async/ Await
async function init(){
    await createPosts({ title: 'Promised post title', body: 'Promised post body' });
    
    getPosts();
}

