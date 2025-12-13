const reservationHtml :string = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Table Status</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 15px;
      background: #f8f9fa;
      margin: 0;
    }
    .container {
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 280px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h3 {
      margin: 0 0 15px 0;
      color: #333;
      font-size: 18px;
      text-align: center;
    }
    .status {
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 15px;
      font-weight: 600;
      text-align: center;
      font-size: 14px;
    }
    .available {
      background: #d4edda;
      color: #155724;
      border: 2px solid #28a745;
    }
    .reserved {
      background: #f8d7da;
      color: #721c24;
      border: 2px solid #dc3545;
    }
    button {
      background: #007bff;
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      width: 100%;
      font-size: 14px;
      font-weight: 600;
      transition: background 0.2s;
    }
    button:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h3 id="tableTitle">Table Status</h3>
    <div id="status" class="status available">✓ Available</div>
    <button id="showTimesBtn">Show Available Times</button>
  </div>

  <script>
    let tableName ;
    let isReserved ;

    window.on('message', function(event) {
      if (event.data && event.data.type === 'tableStatus') {
        tableName = event.data.table;
        isReserved = event.data.reserved;
        updateUI();
      }
    });

    function updateUI() {
      document.getElementById('tableTitle').textContent = tableName;
      const statusEl = document.getElementById('status');
      
      if (isReserved) {
        statusEl.className = 'status reserved';
        statusEl.textContent = '✗ Reserved';
      } else {
        statusEl.className = 'status available';
        statusEl.textContent = '✓ Available';
      }
    }

    document.getElementById('showTimesBtn').addEventListener('click', function() {
      if (typeof window.send === 'function') {
        window.send('showAvailableTimes', { table: tableName });
      }
    });

    // Listen for reservation confirmations
    window.addEventListener('reservationConfirmed', function(event) {
      if (event.detail && event.detail.table === tableName) {
        if (typeof window.send === 'function') {
          window.send('reservationMade', {
            name: event.detail.name,
            guests: event.detail.guests,
            date: event.detail.date,
            times: event.detail.times,
          });
        }
      }
    });

    updateUI();
  </script>
</body>
</html>
`;

export default reservationHtml;