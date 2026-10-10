import { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState({
    loading: false,
    checked: false,
    success: false,
    data: null,
    error: null,
  });

  const checkBackendHealth = async () => {
    setBackendStatus({ loading: true, checked: false, success: false, data: null, error: null });
    try {
      const response = await api.get('/health');
      setBackendStatus({
        loading: false,
        checked: true,
        success: true,
        data: response.data,
        error: null,
      });
    } catch (err) {
      setBackendStatus({
        loading: false,
        checked: true,
        success: false,
        data: null,
        error: err.response?.data?.message || err.message || 'Unable to reach backend server',
      });
    }
  };

  useEffect(() => {
    // Check backend health on initial load
    checkBackendHealth();
  }, []);

  return (
    <div className="setup-container">
      <header className="setup-header">
        <div className="badge">Phase 1: Planning & Setup</div>
        <h1>Full-Stack MERN E-Commerce</h1>
        <p className="subtitle">
          Architecture, Folder Structure & Full-Stack Environment Initialized
        </p>
      </header>

      <section className="status-grid">
        <div className="card">
          <div className="card-header">
            <span className="dot online"></span>
            <h3>Frontend Client</h3>
          </div>
          <p className="card-desc">React 19 + Vite + Axios + React Router</p>
          <div className="meta-tag">Port: 5173</div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className={`dot ${backendStatus.success ? 'online' : backendStatus.checked ? 'offline' : 'pending'}`}></span>
            <h3>Backend Server</h3>
          </div>
          <p className="card-desc">Node.js + Express + REST APIs</p>
          <div className="meta-tag">Port: 5001</div>

          <div className="action-row">
            <button
              className="test-btn"
              onClick={checkBackendHealth}
              disabled={backendStatus.loading}
            >
              {backendStatus.loading ? 'Pinging API...' : 'Ping /api/health'}
            </button>
          </div>

          {backendStatus.checked && (
            <div className={`status-box ${backendStatus.success ? 'status-ok' : 'status-err'}`}>
              {backendStatus.success ? (
                <>
                  <p><strong>Status:</strong> {backendStatus.data?.status}</p>
                  <p><strong>Message:</strong> {backendStatus.data?.message}</p>
                  <small>Time: {new Date(backendStatus.data?.timestamp).toLocaleTimeString()}</small>
                </>
              ) : (
                <>
                  <p><strong>Connection Failed:</strong></p>
                  <p>{backendStatus.error}</p>
                  <small>Make sure backend is running on port 5001 (`npm run dev` in server/)</small>
                </>
              )}
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-header">
            <span className={`dot ${backendStatus.data?.database === 'connected' ? 'online' : backendStatus.checked ? 'offline' : 'pending'}`}></span>
            <h3>MongoDB Database</h3>
          </div>
          <p className="card-desc">Mongoose ODM + Schema Models</p>
          <div className="meta-tag">
            {backendStatus.data?.database === 'connected' ? 'Atlas: Connected' : 'Checking...'}
          </div>
          <p className="hint-text">
            {backendStatus.data?.database === 'connected'
              ? '✅ MongoDB Atlas is connected and ready for Phase 2 data models.'
              : 'Configured in server/.env (will verify via /api/health).'}
          </p>
        </div>
      </section>

      <footer className="setup-footer">
        <h3>What's Ready in Phase 1:</h3>
        <ul>
          <li>✅ Monorepo split structure (<code>client/</code> and <code>server/</code>)</li>
          <li>✅ Root <code>.gitignore</code> protecting environment variables & dependencies</li>
          <li>✅ Express server with CORS, Helmet, JSON parsing & centralized error handling</li>
          <li>✅ Mongoose connection configured in <code>server/config/db.js</code></li>
          <li>✅ Centralized Axios instance with JWT interceptor configured in <code>client/src/services/api.js</code></li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
