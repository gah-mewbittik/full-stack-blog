
    const createCommentFormHandler = async (event) => {
        event.preventDefault();

      
        console.log(document.querySelector('#postDescription'));

        const description = document.querySelector('#postDescription').value.trim();

        if (description.length < 5) {
            alert('Please enter more than 6 characters for comment.');
        } else {
            try {
                const response = await fetch('/api/comment/createComment', {
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

      // Attach event listener to the "Create Post" button to show the form
      document.querySelector('.createComment').addEventListener('click', createCommentFormHandler);
    

    