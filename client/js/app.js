// client/js/app.js

const API_URL = 'http://localhost:5001/api';

function isLoggedIn() {
  return localStorage.getItem('token') !== null;
}

function getToken() {
  return localStorage.getItem('token');
}

// Handle page-specific logic
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.getAttribute('data-page');

  if (page === 'register') {
    handleRegister();
  } else if (page === 'login') {
    handleLogin();
  } else if (page === 'compounds') {
    if (!isLoggedIn()) {
      window.location.href = 'login.html';
    } else {
      displayCompoundList();
    }
  } else if (page === 'compound') {
    if (!isLoggedIn()) {
      window.location.href = 'login.html';
    } else {
      displayCompoundDetails();
    }
  }
});

// Handle User Registration
function handleRegister() {
  const registerForm = document.getElementById('registerForm');
  const registerError = document.getElementById('registerError');

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (response.ok) {
        alert('Registration successful! You can now log in.');
        window.location.href = 'login.html';
      } else {
        registerError.textContent = data.message || 'Registration failed.';
      }
    } catch (error) {
      registerError.textContent = 'An error occurred. Please try again.';
    }
  });
}

// Handle User Login
function handleLogin() {
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = 'compounds.html';
      } else {
        loginError.textContent = data.message || 'Login failed.';
      }
    } catch (error) {
      loginError.textContent = 'An error occurred. Please try again.';
    }
  });
}

// Logout User
if (document.getElementById('logoutBtn')) {
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  });
}

// Display Compound List
async function displayCompoundList() {
  const compoundList = document.getElementById('compoundList');
  const searchInput = document.getElementById('searchInput');
  const addCompoundForm = document.getElementById('addCompoundForm');
  const addCompoundError = document.getElementById('addCompoundError');

  // Fetch and display compounds
  let allCompounds = [];

  async function fetchCompounds() {
    try {
      const response = await fetch(`${API_URL}/compounds`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (response.ok) {
        allCompounds = await response.json();
        renderCompounds();
      } else {
        console.error('Failed to fetch compounds.');
      }
    } catch (error) {
      console.error('Error fetching compounds:', error);
    }
  }

  // Render compounds
  function renderCompounds(filter = '') {
    compoundList.innerHTML = ''; // Clear existing content
    const filteredCompounds = allCompounds.filter(compound =>
      compound.name.toLowerCase().includes(filter.toLowerCase()) ||
      compound.formula.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredCompounds.length === 0) {
      compoundList.innerHTML = '<p class="mt-4">No compounds found.</p>';
      return;
    }

    filteredCompounds.forEach(compound => {
      const compoundCard = document.createElement('div');
      compoundCard.className = 'col-md-4';
      compoundCard.innerHTML = `
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">${compound.name}</h5>
            <p class="card-text"><strong>Formula:</strong> ${compound.formula}</p>
            <p class="card-text"><strong>Molecular Weight:</strong> ${compound.molecularWeight}</p>
            <a href="compound.html?id=${compound._id}" class="btn btn-primary">View Details</a>
          </div>
        </div>
      `;
      compoundList.appendChild(compoundCard);
    });
  }

  // Event listener for search input
  searchInput.addEventListener('input', () => {
    renderCompounds(searchInput.value);
  });

  // Event listener for form submission
  addCompoundForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    addCompoundError.textContent = '';

    const name = document.getElementById('compoundName').value.trim();
    const formula = document.getElementById('compoundFormula').value.trim();
    const molecularWeight = parseFloat(document.getElementById('compoundWeight').value);
    const details = document.getElementById('compoundDetails').value.trim();
    const applicationsInput = document.getElementById('compoundApplications').value.trim();
    const applications = applicationsInput.split(';').map(app => app.trim()).filter(app => app);

    if (name && formula && molecularWeight && details && applications.length > 0) {
      try {
        const response = await fetch(`${API_URL}/compounds`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify({ name, formula, molecularWeight, details, applications })
        });
        const data = await response.json();

        if (response.ok) {
          // Clear the form
          addCompoundForm.reset();
          // Fetch and display updated compounds
          fetchCompounds();
        } else {
          addCompoundError.textContent = data.message || 'Failed to add compound.';
        }
      } catch (error) {
        addCompoundError.textContent = 'An error occurred. Please try again.';
      }
    } else {
      addCompoundError.textContent = 'Please fill in all fields.';
    }
  });

  // Initial fetch
  fetchCompounds();
}

// Display Compound Details
async function displayCompoundDetails() {
  const params = new URLSearchParams(window.location.search);
  const compoundId = params.get('id');
  const compoundDetails = document.getElementById('compoundDetails');

  try {
    const response = await fetch(`${API_URL}/compounds/${compoundId}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (response.ok) {
      const compound = await response.json();

      // Generate applications list
      const applicationsList = compound.applications && compound.applications.length > 0
        ? `<ul>${compound.applications.map(app => `<li>${app}</li>`).join('')}</ul>`
        : '<p>Not specified.</p>';

      compoundDetails.innerHTML = `
        <h1>${compound.name}</h1>
        <p><strong>Formula:</strong> ${compound.formula}</p>
        <p><strong>Molecular Weight:</strong> ${compound.molecularWeight}</p>
        <p><strong>Description:</strong> ${compound.details}</p>
        <p><strong>Applications:</strong></p>
        ${applicationsList}
        <a href="compounds.html" class="btn btn-secondary mt-3">Back to List</a>
      `;
    } else {
      compoundDetails.innerHTML = '<p>Compound not found or access denied.</p>';
    }
  } catch (error) {
    compoundDetails.innerHTML = '<p>An error occurred. Please try again.</p>';
  }
}
