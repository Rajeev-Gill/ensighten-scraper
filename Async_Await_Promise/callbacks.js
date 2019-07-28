const posts = [
    { title: 'Post 1', body: 'This is post 1' },
    { title: 'Post 2', body: 'This is post 2' }
];

// function getPosts() {
//     setTimeout(function(){

//     }, 1000);
// }

//Arrow function syntax
function getPosts() {
    setTimeout(() => {
        let output = '';
        //Loop through posts
        posts.forEach((posts) => {
            //For each post create an li element with the posts title
            output += `<li>${posts.title}</li>`;
        });
        //Append posts to body
        document.body.innerHTML = output;
    }, 1000);
}

function createPosts(post, callback) {
    //After 2s
    setTimeout(() => {
        //Add post to posts db (object)
        posts.push(post);
        //Run a function straight after posts are updated
        callback();
    }, 2000);
}

//When passing in a function to be used as a callback omit the brackets
createPosts({ title: 'CreatedPost', body: 'This is a createdPost' }, getPosts);