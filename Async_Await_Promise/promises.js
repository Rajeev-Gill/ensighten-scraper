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

function createPosts(post, callback) {
    setTimeout(() => {
        posts.push(post);
        callback();
    }, 2000);
}

function createPosts(post) {
    //Return a new promise
    return new Promise((resolve, reject) => {
        //After 2s
        setTimeout(() => {
            //Add passed in post to posts object
            posts.push(post);

            //Initialise error variable
            const error = false;

            //If there is no error (false counts as no error)
            if(!error) {
                //Resolve promise
                resolve();
            } else {
                //If there is an error log it to the console
                reject('Error: Something went wrong');
            }
        }, 2000);
    });
}

//Create and add new post
createPosts({ title: 'Promised post title', body: 'Promised post body' })
    //When promise has been resolved then execute getPosts function
    //If there is an error the promise will reject and .then will not be called
    .then(getPosts)
    //If promise rejects execute an anonymous function which console logs the reject message    
    .catch(err => console.log('Reject message: ' + err))

    // .catch(function(err) {
    //     console.log(err);
    // });

