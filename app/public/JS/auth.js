async function checkSessionAndRenderAuth() {
    const authSection = document.getElementById('authSection');
    try {
      const res = await fetch('/session');
      const result = await res.json();
  
      if (result.loggedIn) {
        authSection.innerHTML = `
          <a href="/user/logout" class="btn btn-danger">Sign Out</a>`;
      } else {
        authSection.innerHTML = `
          <a href="/user/login" class="login-button">Login/Register</a>`;
      }
    } catch (err) {
      console.error('Error checking session:', err);
      authSection.innerHTML = `
        <a href="/user/login" class="login-button">Login/Register</a>`;
    }
  }
  
  // Call it on page load
  window.addEventListener('DOMContentLoaded', checkSessionAndRenderAuth);
  