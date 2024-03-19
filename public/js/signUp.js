document.addEventListener('DOMContentLoaded', function(){
  const signupFormHandler = async (event) => {
      event.preventDefault();
    
      const name = document.querySelector('#name-signup').value.trim();
      const email = document.querySelector('#email-signup').value.trim();
      const password = document.querySelector('#password-signup').value.trim();

      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
    
      let container = document.querySelector('#alert-container');

      if (name && email && password) {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        
        console.log('Response:', response);

        if (response.ok) {
          document.location.replace('/dashboard');

          container.innerHTML = 
          `<div class="alert alert-success alert-dismissible fade show" role="alert" data-bs-autohide="false">
          Signed Up! You can now login!
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                  
              </button>
          </div>`;
          // $(container).on('closed.bs.alert', function () {
          //     console.log('Alert is closed');
          // })
          const closeBtn = container.querySelector('.btn-close');

          closeBtn.addEventListener('click', function(){
            console.log('Close button clicked');
              const alert = this.closest('.alert');
              if(alert){
                  alert.style.display = 'none';
                  console.log('Alert is closed');
              }
          });

        } else {
          console.log('Response Error: ', response.statusText);
          alert(response.statusText);
        }
      }
    };

    document
      .querySelector('.signup-form')
      .addEventListener('submit', signupFormHandler);
});
