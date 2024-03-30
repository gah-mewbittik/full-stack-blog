const createPostFormHandler = async (event) => {
    event.preventDefault();

        const title = document.querySelector('#postTitle').value.trim();
        const description = document.querySelector('#postDescription').value.trim();
        const postDate = new Date(year, month, day);

        if (title.length < 3 || description.length < 5) {
            alert('Please enter more than 3 characters for the title and more than 6 characters for the description.');
        } else {
            try {
                const response = await fetch('/api/dashboard/createPost', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, description, post_date: postDate, featured: false })
                });
    
                if (response.ok) {
                    // Successful submission, redirect or display success message
                    document.location.replace('/');
                } else {
                    // Error handling if server responds with an error
                    console.error('Server responded with error:', response.statusText);
                    alert('An error occurred while creating the post. Please try again later.');
                }
            } catch (error) {
                // Catch any network errors
                console.error('Network error occurred:', error);
                alert('A network error occurred while creating the post. Please try again later.');
            }
        }
    };
    
    // Function to show the create post form
    const showCreatePostForm = () => {
        const container = document.querySelector('.createPost-container');
    
        container.innerHTML = `
            <div class='newPost-container'>
                <h1 class='newPostHeader' >Create Post</h1>
                <form id='form-createPost'>
                    <input type='text' id='postTitle' placeholder='Title (required)' />
                    <textarea id='postDescription' placeholder='Description (required)'></textarea>
                    <button class='btn btn-primary' id='createPostButton' type='submit'>Submit Post</button>
                </form>
            </div>`;
    
        // Attach event listener to the form for submission
        const form = document.querySelector('#form-createPost');
        form.addEventListener('submit', createPostFormHandler);
    };
    
    
    // Attach event listener to the "Create Post" button to show the form
    document.querySelector('.createPost').addEventListener('click', showCreatePostForm);
