let currentPostId;

let postTitle = 'Hello World';
let postDescription = '';

const openPostHandler = async (postId) => {
    //event.preventDefault();

    //const postId = event.target.dataset.postId;

    try{

        //fetch teh post data
        const response =  await fetch(`/api/dashboard/posts/${postId}`);

        if(response.ok){
            const postData = await response.json();
            console.log('Post Data:', postData);

            //assign postData to variables
            postTitle = postData.title;
            postDescription = postData.description;

            //go to editPost
            //document.location.replace('/post/');
         // call function
            showUpdatePostForm();
        }else{
            console.error('Server response error', response.statusText);
            alert('Error, please try again');
        }

    }catch(err){
       // Catch any network errors
       console.error('Network error occurred:', error);
       alert('A network error occurred while creating the post. Please try again later.');
        
    }
};

//updatePostButton eventHandler
const updatePostHandler = async (event) => {
    event.preventDefault();

    //get post ID
   // const postId = event.target.dataset.postId;
   const postId = currentPostId;

    const updatedPost = {
        title: document.querySelector('#postTitle').value,
        description: document.querySelector('#postDescription').value
    };
    try{
        const response = await fetch(`/api/dashboard/posts/${postId}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(updatedPost)
        });

        if(response.ok){
            alert('Updated Post successfully');
            document.location.replace('/dashboard');
        }else{
            console.error('Error updating post:', response.statusText);
            alert('Error updating post. Please try again');
        }

    }catch(err){
        console.log(err);
        alert('Network error. Please try again later')
    }
};

//deletePostHandler
const deletePostHandler = async (event) => {
    event.preventDefault();

    const postId = currentPostId;
    if(!postId){
        console.error('No post selected for deletion');
        return;
    }

    try{
        // send a delete request for deletion
        const response = await fetch(`/api/dashboard/posts/${postId}`, {
            method: 'DELETE'
        });

        if(response.ok){
            //Post delete successfully
            alert('Deleted Post successfully');
            document.location.replace('/dashboard');
        }else{
            console.error('Error deleting post', response.statusText);
            alert('Error deleting post. Please try again');
        }
    }catch(err){
        console.log(err);
        alert('Network Error. Please try again later');
    }


};

// Function to show the update post form
const showUpdatePostForm = () => {
    const container = document.querySelector('.post-content-container');
    
    container.innerHTML = `
        <div class='newPost-container'>
            <h1 class='newPostHeader' >Update Post</h1>
            <form id='form-updatePost'>
                <input type='text' id='postTitle' placeholder='Title (required)' value='${postTitle}'/>
                <textarea id='postDescription' placeholder='Description (required)'>${postDescription}</textarea>
                <button class='btn btn-primary' id='updatePostButton' type='submit'>Update Post</button>
                <button class='btn btn-primary' id='deletePostButton' type='submit'>Delete Post</button>
            </form>
        </div>`;

    // Attach event listener to the form for submission
    // const form = document.querySelector('#form-updatePost');
    // form.addEventListener('submit', handlePostButtonClick);

    //event listener for delete button
    const deletePostButton = document.querySelector('#deletePostButton');
    deletePostButton.addEventListener('click', deletePostHandler);

    //event listener for update button
    const updatePostButton = document.querySelector('#updatePostButton');
    updatePostButton.addEventListener('click', updatePostHandler)


};



//event listener
const postButtons = document.querySelectorAll('.userPostList');
postButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        currentPostId = event.target.closest('.userPostList').dataset.postId;
        console.log(currentPostId);
        openPostHandler(currentPostId);
        //display update post form
        //showUpdatePostForm();
        //call open Post handler
        
    });
});