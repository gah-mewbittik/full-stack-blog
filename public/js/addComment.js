
    const createCommentFormHandler = async (event) => {
        event.preventDefault();

        console.log(document.querySelector('.submitComment').dataset.postId);
       
        const postId = document.querySelector('.submitComment').dataset.postId;
        const comment_text = document.querySelector("#postDescription").value.trim();
      
        // remove element declaration
        const removeCommentContainer = document.querySelector('.addComment-container');
        //add saved container
        const container = document.querySelector('.savedComment-container');

        // console.log(document.querySelector('#postDescription'));
        // const description = document.querySelector('#postDescription').value.trim();

            try {
                const response = await fetch('/api/comment/createComment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ postId, comment_text})
                });

                if (response.ok) {
                    // Successful submission, redirect or display success message
                    //remove add comment form
                

                    //add save comment container TODO: how to get the Post Name
                    container.innerHTML = `
               <div class='savedComment'><h2 class='newCommentHeader'>Comment Saved</h2> <p>${comment_text}</p>
                <p> - ${postId}</p> 
                </div>
                `;
                removeCommentContainer.remove();
                   // document.location.replace('/dashboard');
                } else {
                    // Error handling if server responds with an error
                    console.error('Server responded with error:', response.statusText);
                    alert('An error occurred while creating the comment. Please try again later.');
                }
            } catch (error) {
                // Catch any network errors
                console.error('Network error occurred:', error);
                alert('A network error occurred while creating the comment. Please try again later.');
            }
        
    };

      // Attach event listener to the "Create Post" button to show the form
      document.querySelector('.submitComment').addEventListener('click', createCommentFormHandler);
    

 