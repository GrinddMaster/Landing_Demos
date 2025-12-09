# Matterport React Demo Landing — README

> A complete README / project blueprint for a React project that showcases Matterport demos: a Virtual Mall tour, a Restaurant Reservation tour (book tables from within a Matterport tour), and an in-tour Chat Bot helper.

---

## Summary

This repository is a template React application that provides a marketing-style landing page showcasing three interactive Matterport-powered demos:

1. **Virtual Mall** — an exhibit/demo page showing a Matterport virtual mall tour with hotspots for stores and product demos.
2. **Restaurant Reservation Tour** — a Matterport tour for a restaurant where users can pick a table (via an overlay or hotspot) and complete a reservation flow.
3. **Tour Chat Bot** — an in-tour chat assistant that can answer questions about the tour, suggest tour stops, and help with bookings.

The README below includes project structure, technologies, sample code snippets for integrating the Matterport Showcase SDK, a simple chatbot integration pattern, recommended UI, and deployment notes.

---

## Goals & UX

* Clean landing page with cards for each demo, each card opens a route with an embedded Matterport tour and demo UI overlays.
* Responsive design that works on desktop/tablet/mobile.
* Reusable `MatterportViewer` React component that initializes the Matterport Showcase SDK and exposes hooks/callbacks for hotspots, camera control, and events.
* Reservation flow using a lightweight API (mock server for demo) to create bookings.
* Chatbot with a message UI that can run off a simple server (or third-party conversational API) and optionally send commands to the tour (e.g., `go to second floor`).

---

## Tech Stack / Libraries

* React (v19.2.1)
* Vite or Create React App (template uses Vite recommended)
* React Router
* TailwindCSS for styling (or plain CSS if you prefer)
* Matterport Showcase SDK (client-side; loaded dynamically)
* Axios / fetch for HTTP
* React-query or SWR (optional) for async data
* Socket.IO (optional) for realtime chatbot / notifications
* A small Express/Node mock server for reservation and chatbot back-end in `./server` (optional)

---

## Folder Structure (recommended)

```
/ (repo root)
├─ README.md
├─ package.json
├─ vite.config.ts
├─ .env.local
├─ /public
│  └─ index.html
├─ /src
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ /pages
│  │  ├─ Landing.jsx
│  │  ├─ MallDemo.jsx
│  │  ├─ RestaurantDemo.jsx
│  │  └─ ChatbotDemo.jsx
│  ├─ /components
│  │  ├─ MatterportViewer.jsx
│  │  ├─ DemoCard.jsx
│  │  ├─ ReservationPanel.jsx
│  │  ├─ ChatbotWidget.jsx
│  │  └─ Navbar.jsx
│  ├─ /lib
│  │  ├─ matterport-sdk-loader.js
│  │  └─ api.js
│  └─ /styles
│     └─ index.css
└─ /server
   ├─ server.js
   └─ routes
      ├─ bookings.js
      └─ chat.js
```

---

## Setup (quick)

1. `git clone <repo>`
2. `cd repo && npm install` (or `yarn`)
3. Copy `.env.example` to `.env.local` and fill environment variables.
4. `npm run dev` (React) and optionally `node server/server.js` to run the mock backend.

### Example environment variables (`.env.local`)

```
VITE_MATTERPORT_PLAYER=your_showcase_url_or_id
VITE_API_BASE=http://localhost:4000
VITE_CHATBOT_ENDPOINT=http://localhost:4000/chat
```

> Note: The Matterport Showcase SDK expects you to embed a Showcase URL (or model id). The application loads the SDK script and mounts the viewer into a DOM node.

---

## Key Implementation Notes & Code Snippets

### 1) Loading the Matterport Showcase SDK dynamically

Create `src/lib/matterport-sdk-loader.js`:

```js
// src/lib/matterport-sdk-loader.js
export function loadMatterportSdk() {
  return new Promise((resolve, reject) => {
    if (window.MP_SDK) return resolve(window.MP_SDK);
    const s = document.createElement('script');
    s.src = 'https://static.matterport.com/showcase-sdk/latest.js';
    s.onload = () => {
      if (window.MP_SDK) resolve(window.MP_SDK);
      else reject(new Error('MP_SDK not available after script load'));
    };
    s.onerror = (err) => reject(err);
    document.head.appendChild(s);
  });
}
```

> This snippet attempts to load the public Showcase SDK script. If Matterport changes the URL you should update this path.

### 2) Generic `MatterportViewer` React component

```jsx
// src/components/MatterportViewer.jsx
import React, {useRef, useEffect, useState} from 'react';
import { loadMatterportSdk } from '../lib/matterport-sdk-loader';

export default function MatterportViewer({showcaseUrl, onReady, onHotspotClick, className}){
  const containerRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const MP_SDK = await loadMatterportSdk();
        if (!mounted) return;

        // Create player instance
        const playerInstance = new MP_SDK.Player(containerRef.current, showcaseUrl, {
          // options
        });

        setPlayer(playerInstance);

        playerInstance.on('ready', () => {
          onReady && onReady(playerInstance);
        });

        // Example: handle hotspot click events
        playerInstance.on('hotspot:click', (evt) => {
          onHotspotClick && onHotspotClick(evt);
        });

      } catch (err) {
        console.error('Error loading Matterport SDK', err);
      }
    }

    init();

    return () => {
      mounted = false;
      if (player && player.destroy) player.destroy();
    };
  }, [showcaseUrl]);

  return <div ref={containerRef} className={className || 'w-full h-full'} />;
}
```

Notes:

* `showcaseUrl` is the Showcase model URL or ID – you can pass different showcase IDs for mall / restaurant demos.
* The real Matterport SDK events and API might have slightly different names — treat event names here as illustrative; consult the official SDK docs for exact event names and methods.

### 3) Landing page `Landing.jsx` (card grid)

```jsx
// src/pages/Landing.jsx
import React from 'react';
import DemoCard from '../components/DemoCard';

export default function Landing(){
  const demos = [
    {key: 'mall', title: 'Virtual Mall', path: '/mall', desc: 'Explore shops and exhibits'},
    {key: 'restaurant', title: 'Reserve a Table', path: '/restaurant', desc: 'Book from inside the tour'},
    {key: 'chat', title: 'Tour Chat Bot', path: '/chat', desc: 'Ask the tour questions'},
  ];

  return (
    <main className="p-8">
      <h1 className="text-3xl mb-6">Matterport Demo Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {demos.map(d => <DemoCard key={d.key} {...d} />)}
      </div>
    </main>
  );
}
```

### 4) Restaurant Reservation flow (concept)

`ReservationPanel.jsx` will show available tables (or hotspots) and a form. When user selects a table, you POST to `/api/bookings` with `showcaseId`, `tableId`, `time`, `partySize`, and `contact`.

```js
// src/lib/api.js
import axios from 'axios';
const base = import.meta.env.VITE_API_BASE || '';
export const bookings = {
  create: (payload) => axios.post(`${base}/bookings`, payload).then(r => r.data),
};
```

The server side simply accepts bookings and saves them in memory (demo) or forwards to a real reservation system.

### 5) Chatbot widget pattern

`ChatbotWidget.jsx` can be a floating UI. For demo you can implement two modes:

* **Proxy to a remote conversational API** (OpenAI / Dialogflow / custom NLP) — server accepts user messages and forwards to the chosen model; server returns bot replies.
* **Rule-based assistant** — local JS rules that map queries to actions (e.g., `"take me to the food court"` triggers `player.moveTo(presetId)`).

Simple client code:

```jsx
// src/components/ChatbotWidget.jsx (abridged)
import React, {useState} from 'react';
import axios from 'axios';

export default function ChatbotWidget({playerRef}){
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  async function send(){
    const userMsg = {from: 'user', text};
    setMessages(m => [...m, userMsg]);

    const res = await axios.post(import.meta.env.VITE_CHATBOT_ENDPOINT || '/chat', {text});
    const botMsg = {from: 'bot', text: res.data.reply};
    setMessages(m => [...m, botMsg]);

    // optional: if bot returns an action, run it on the player
    if (res.data.action === 'goto' && playerRef?.moveTo) {
      playerRef.moveTo(res.data.presetId);
    }

    setText('');
  }

  return (
    <div className="chatbot-widget fixed bottom-6 right-6 w-80 bg-white shadow-lg rounded-lg p-3">
      <div className="messages h-48 overflow-auto">
        {messages.map((m,i) => <div key={i} className={m.from}>{m.text}</div>)}
      </div>
      <div className="flex gap-2 mt-2">
        <input value={text} onChange={e => setText(e.target.value)} className="flex-1" />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
```

### 6) Example server endpoints (mock)

A tiny Express `server/server.js` that demonstrates `POST /bookings` and `POST /chat`:

```js
// server/server.js
const express = require('express');
const app = express();
app.use(express.json());

let bookings = [];

app.post('/bookings', (req, res) => {
  const id = bookings.length + 1;
  const record = {...req.body, id, createdAt: new Date().toISOString()};
  bookings.push(record);
  res.json({success: true, booking: record});
});

app.post('/chat', (req, res) => {
  const {text} = req.body;

  // super simple rule-based demo
  if (/table/i.test(text)) return res.json({reply: 'To reserve a table, open the Reservation panel and select a table.'});
  if (/food court|mall/i.test(text)) return res.json({reply: 'Sure — would you like to jump to the Food Court area now?', action: 'offer',});

  res.json({reply: `Echo: ${text}`});
});

app.listen(4000, () => console.log('Mock server running on :4000'));
```

---

## Accessibility & Performance Tips

* Ensure the embedded player container has keyboard focus options and alt text for interactive UI components.
* Lazy-load each Matterport model only when the route is visited.
* Use `loading="lazy"` for images and optimize assets.

---

## Deployment suggestions

* Host static client on Netlify, Vercel, or GitHub Pages.
* If you use the demo server, deploy the small Express API on Heroku, Render, or Fly.
* Serve the Matterport SDK from the official CDN; embed your Production showcase IDs.

---

## Security & Privacy

* Never embed secret API keys into client-side code. Use a proxy server for any private keys (chat model keys, reservation provider keys).
* Validate and sanitize booking input server-side.

---

## Future Enhancements

* Add authenticated user accounts and a booking history view.
* Integrate payment for premium bookings.
* Add analytics for hotspot clicks and user flows inside tours.
* Add multi-language support for the chatbot.

---

## Appendix: Example routes (React Router)

```jsx
// App.jsx (abridged)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import MallDemo from './pages/MallDemo';
import RestaurantDemo from './pages/RestaurantDemo';
import ChatbotDemo from './pages/ChatbotDemo';

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/mall' element={<MallDemo/>} />
        <Route path='/restaurant' element={<RestaurantDemo/>} />
        <Route path='/chat' element={<ChatbotDemo/>} />
      </Routes>
    </Router>
  );
}

Tell me which of the above you'd like next and I will scaffold it for you.
