import { ArrowRight, Copy, ExternalLink, Check } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Hero = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.post(
        `${BASE_URL}/api/url/shorten`,
        { originalUrl: url },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      setShortUrl(`${BASE_URL}/api/url/${response.data.data.shortCode}`);
      setUrl("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success("Copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .hero-root {
          font-family: 'Inter', sans-serif;
          min-height: 90vh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        /* Subtle grid background */
        .hero-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        /* Radial fade over grid */
        .hero-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 40%, transparent 40%, #ffffff 100%);
          pointer-events: none;
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          max-width: 780px;
          width: 100%;
          margin: 0 auto;
        }

        /* Badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f0f7ff;
          border: 1px solid #bfdbfe;
          color: #2563eb;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 32px;
        }
        .hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2563eb;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Heading */
        .hero-h1 {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1.5px;
          color: #0f172a;
          margin: 0 0 20px;
        }
        .hero-h1 em {
          font-style: normal;
          color: #2563eb;
        }

        /* Subtext */
        .hero-sub {
          font-size: 17px;
          color: #64748b;
          line-height: 1.65;
          max-width: 480px;
          margin: 0 auto 44px;
          font-weight: 400;
        }

        /* Form */
        .hero-form {
          display: flex;
          gap: 10px;
          width: 100%;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          padding: 8px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .hero-form:focus-within {
          border-color: #93c5fd;
          box-shadow: 0 4px 24px rgba(37,99,235,0.1), 0 0 0 4px rgba(37,99,235,0.06);
        }

        .hero-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          color: #0f172a;
          padding: 12px 16px;
          background: transparent;
          min-width: 0;
        }
        .hero-input::placeholder {
          color: #94a3b8;
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #2563eb;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          padding: 12px 22px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s, opacity 0.15s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .hero-btn:hover { background: #1d4ed8; }
        .hero-btn:active { transform: scale(0.97); }
        .hero-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .hero-btn-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 540px) {
          .hero-form { flex-direction: column; }
          .hero-btn { width: 100%; justify-content: center; }
        }

        /* Result card */
        .hero-result {
          margin-top: 20px;
          background: #f8faff;
          border: 1.5px solid #dbeafe;
          border-radius: 14px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          animation: slideUp 0.22s ease;
          text-align: left;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .result-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .result-icon {
          width: 36px;
          height: 36px;
          background: #dbeafe;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #2563eb;
        }
        .result-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #94a3b8;
          margin: 0 0 3px;
        }
        .result-url {
          font-size: 14px;
          font-weight: 600;
          color: #2563eb;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 320px;
        }

        .result-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .result-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          padding: 8px 14px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.1s;
        }
        .result-btn:hover { opacity: 0.85; }
        .result-btn:active { transform: scale(0.96); }

        .result-btn-copy {
          background: #fff;
          color: #374151;
          border: 1.5px solid #e2e8f0 !important;
        }
        .result-btn-visit {
          background: #2563eb;
          color: #fff;
        }

        @media (max-width: 540px) {
          .hero-result { flex-direction: column; align-items: flex-start; }
          .result-url { max-width: 100%; }
          .result-actions { width: 100%; }
          .result-btn { flex: 1; justify-content: center; }
        }

        /* Pills row */
        .hero-pills {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 32px;
          flex-wrap: wrap;
        }
        .hero-pill {
          font-size: 12px;
          font-weight: 500;
          color: #94a3b8;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 100px;
          padding: 5px 12px;
        }
        .hero-pill-sep {
          width: 3px;
          height: 3px;
          background: #cbd5e1;
          border-radius: 50%;
        }
      `}</style>

      <section className="hero-root">
        <div className="hero-inner">

          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Free URL Shortener
          </div>

          {/* Heading */}
          <h1 className="hero-h1">
            Short links that work<br />
            <em>as hard as you do.</em>
          </h1>

          {/* Sub */}
          <p className="hero-sub">
            Paste any URL, get a clean short link instantly.
            Track clicks and manage everything from one dashboard.
          </p>

          {/* Form */}
          <form className="hero-form" onSubmit={handleSubmit}>
            <input
              type="url"
              required
              className="hero-input"
              placeholder="https://your-very-long-url.com/goes/here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button type="submit" className="hero-btn" disabled={loading}>
              {loading ? (
                <span className="hero-btn-spinner" />
              ) : (
                <>
                  Shorten
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Result */}
          {shortUrl && (
            <div className="hero-result">
              <div className="result-left">
                <div className="result-icon">
                  <Check size={16} />
                </div>
                <div>
                  <p className="result-label">Your short link</p>
                  <p className="result-url" title={shortUrl}>{shortUrl}</p>
                </div>
              </div>
              <div className="result-actions">
                <button className="result-btn result-btn-copy" onClick={handleCopy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="result-btn result-btn-visit"
                  style={{ textDecoration: "none" }}
                >
                  <ExternalLink size={14} />
                  Visit
                </a>
              </div>
            </div>
          )}

          {/* Pills */}
          <div className="hero-pills">
            <span className="hero-pill">No account needed to try</span>
            <span className="hero-pill-sep" />
            <span className="hero-pill">Links never expire</span>
            <span className="hero-pill-sep" />
            <span className="hero-pill">Click analytics included</span>
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;