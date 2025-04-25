window.addEventListener('DOMContentLoaded', async () => {
    const list = document.getElementById('matched-cars-list');
    if (!list) return;
  
    try {
      const res = await fetch('/alert/all');
      const alerts = await res.json();
  
      if (alerts.length > 0) {
        alerts.forEach(car => {
          const li = document.createElement('li');
          li.className = 'list-group-item d-flex justify-content-between align-items-center';
          li.innerHTML = `
            <strong>
              <a href="/car/${car.CarId}" style="text-decoration: none; color: inherit;">
                ${car.Make} ${car.Model}
              </a>
            </strong> ${car.CarTitle}
            <span class="badge bg-primary rounded-pill">$${car.CarPrice}</span>
          `;
          list.appendChild(li);
        });
      } else {
        list.innerHTML = '<li class="list-group-item">No new matches at the moment.</li>';
      }
    } catch (err) {
      console.error('Failed to fetch alerts:', err);
    }
  });
  