// Fetch events from the backend
window.onload = async () => {
    if (document.getElementById('event-list')) {
        const eventList = document.getElementById('event-list');
        
        try {
            const response = await fetch('http://localhost:5000/api/events');
            const events = await response.json();
            
            events.forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.classList.add('event');
                eventItem.innerHTML = `
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <p>${new Date(event.date).toLocaleDateString()}</p>
                    <p>${event.location}</p>
                `;
                eventList.appendChild(eventItem);
            });
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';  // Redirect to homepage after login
            } else {
                alert('Invalid login credentials');
            }
        });
    }

    // Handle register form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (data.message === 'User registered successfully') {
                alert('Registration successful');
                window.location.href = 'login.html';  // Redirect to login page
            } else {
                alert('Registration failed');
            }
        });
    }

    // Handle create event form submission
    const createEventForm = document.getElementById('create-event-form');
    if (createEventForm) {
        createEventForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const date = document.getElementById('date').value;
            const location = document.getElementById('location').value;

            const token = localStorage.getItem('token'); // Get JWT token from localStorage

            const response = await fetch('http://localhost:5000/api/events/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description, date, location }),
            });

            const data = await response.json();
            if (data._id) {
                alert('Event created successfully');
                window.location.href = 'index.html';  // Redirect to homepage after event creation
            } else {
                alert('Event creation failed');
            }
        });
    }
};
