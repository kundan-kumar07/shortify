import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const Dashboard = () => {
  
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [urls, setUrls] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const { getToken } = useAuth();

  const copyToClipboard = async (shortCode) => {
    try {
      const shortUrl = `${BASE_URL}/${shortCode}`;
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Copied to clipboard!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const fetchUrls = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/api/url/my-urls`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUrls(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch URLs!");
    }
  };

  const deleteUrl = async (id) => {
    try {
      setDeletingId(id);
      const token = await getToken();
      await axios.delete(`${BASE_URL}/api/url/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUrls((prev) => prev.filter((url) => url._id !== id));
      toast.success("Link deleted.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete URL!");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
  const activeLinks = urls.filter((url) => url.isActive).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .dash-root {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          background: #f8f9fc;
          padding: 40px 24px;
          color: #111827;
        }

        .dash-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Header */
        .dash-header {
          margin-bottom: 36px;
        }
        .dash-title {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: #111827;
          margin: 0 0 4px;
        }
        .dash-sub {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        /* Stat cards */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr; }
        }

        .stat-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 22px 24px;
        }
        .stat-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #9ca3af;
          margin: 0 0 8px;
        }
        .stat-value {
          font-size: 36px;
          font-weight: 700;
          line-height: 1;
          margin: 0;
        }
        .stat-value.blue   { color: #2563eb; }
        .stat-value.green  { color: #16a34a; }
        .stat-value.violet { color: #7c3aed; }

        /* Table card */
        .table-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          overflow: hidden;
        }
        .table-header-bar {
          padding: 18px 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .table-header-bar h2 {
          font-size: 15px;
          font-weight: 600;
          margin: 0;
        }
        .link-count-badge {
          font-size: 12px;
          font-weight: 600;
          background: #eff6ff;
          color: #2563eb;
          border-radius: 20px;
          padding: 3px 10px;
        }

        .table-wrap { overflow-x: auto; }

        table {
          width: 100%;
          border-collapse: collapse;
        }
        thead th {
          text-align: left;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #9ca3af;
          padding: 12px 20px;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }
        thead th.center { text-align: center; }

        tbody tr {
          border-bottom: 1px solid #f3f4f6;
          transition: background 0.12s;
        }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: #fafafa; }

        td {
          padding: 14px 20px;
          font-size: 13.5px;
          color: #374151;
          vertical-align: middle;
        }
        td.center { text-align: center; }

        .original-url {
          max-width: 280px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #6b7280;
          font-size: 13px;
        }
        .short-link {
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          font-size: 13px;
        }
        .short-link:hover { text-decoration: underline; }

        .clicks-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          background: #eff6ff;
          color: #1d4ed8;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          padding: 3px 10px;
        }

        .date-text {
          font-size: 12px;
          color: #9ca3af;
        }

        .actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          padding: 7px 13px;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.1s;
          line-height: 1;
        }
        .btn:hover { opacity: 0.85; }
        .btn:active { transform: scale(0.96); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .btn-copy   { background: #eff6ff; color: #2563eb; }
        .btn-qr     { background: #f0fdf4; color: #16a34a; }
        .btn-delete { background: #fff1f2; color: #e11d48; }

        /* Empty state */
        .empty-state {
          padding: 60px 20px;
          text-align: center;
          color: #9ca3af;
        }
        .empty-icon {
          font-size: 40px;
          margin-bottom: 12px;
        }
        .empty-state p {
          margin: 0;
          font-size: 14px;
        }

        /* QR Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-box {
          background: #fff;
          border-radius: 20px;
          padding: 36px 32px 28px;
          width: 100%;
          max-width: 340px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: popIn 0.18s ease;
        }
        @keyframes popIn {
          from { transform: scale(0.92); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }

        .modal-title {
          font-size: 17px;
          font-weight: 700;
          margin: 0 0 6px;
          text-align: center;
        }
        .modal-url-label {
          font-size: 12px;
          color: #6b7280;
          margin: 0 0 24px;
          text-align: center;
          word-break: break-all;
        }

        .qr-wrapper {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          display: inline-flex;
        }

        .modal-code {
          margin: 16px 0 0;
          font-size: 13px;
          font-weight: 600;
          color: #2563eb;
          text-align: center;
        }

        .modal-actions {
          display: flex;
          gap: 10px;
          width: 100%;
          margin-top: 24px;
        }

        .btn-modal-copy {
          flex: 1;
          background: #eff6ff;
          color: #2563eb;
          padding: 11px;
          font-size: 13px;
          border-radius: 10px;
          text-align: center;
        }
        .btn-modal-close {
          flex: 1;
          background: #f3f4f6;
          color: #374151;
          padding: 11px;
          font-size: 13px;
          border-radius: 10px;
          text-align: center;
        }
      `}</style>

      <div className="dash-root">
        <div className="dash-inner">

          {/* Header */}
          <div className="dash-header">
            <h1 className="dash-title">My Links</h1>
            <p className="dash-sub">All your shortened URLs in one place.</p>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Total Links</p>
              <p className="stat-value blue">{urls.length}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Total Clicks</p>
              <p className="stat-value green">{totalClicks}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Active Links</p>
              <p className="stat-value violet">{activeLinks}</p>
            </div>
          </div>

          {/* Table */}
          <div className="table-card">
            <div className="table-header-bar">
              <h2>All Links</h2>
              <span className="link-count-badge">{urls.length} links</span>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Original URL</th>
                    <th>Short Link</th>
                    <th className="center">Clicks</th>
                    <th className="center">Created</th>
                    <th className="center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {urls.length === 0 ? (
                    <tr>
                      <td colSpan="5">
                        <div className="empty-state">
                          <div className="empty-icon">🔗</div>
                          <p>No links yet. Shorten your first URL to get started.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    urls.map((url) => (
                      <tr key={url._id}>
                        <td>
                          <span className="original-url" title={url.originalUrl}>
                            {url.originalUrl}
                          </span>
                        </td>
                        <td>
                          <a
                            href={`${BASE_URL}/api/url/${url.shortCode}`}
                            target="_blank"
                            rel="noreferrer"
                            className="short-link"
                          >
                            /{url.shortCode}
                          </a>
                        </td>
                        <td className="center">
                          <span className="clicks-badge">{url.clicks}</span>
                        </td>
                        <td className="center">
                          <span className="date-text">
                            {new Date(url.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </td>
                        <td>
                          <div className="actions">
                            <button
                              className="btn btn-copy"
                              onClick={() => copyToClipboard(url.shortCode)}
                            >
                              Copy
                            </button>
                            <button
                              className="btn btn-qr"
                              onClick={() => setSelectedUrl(url)}
                            >
                              QR
                            </button>
                            <button
                              className="btn btn-delete"
                              onClick={() => deleteUrl(url._id)}
                              disabled={deletingId === url._id}
                            >
                              {deletingId === url._id ? "…" : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal — rendered outside the table so it's always on top */}
      {selectedUrl && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedUrl(null);
          }}
        >
          <div className="modal-box">
            <p className="modal-title">QR Code</p>
            <p className="modal-url-label">
              {BASE_URL}/{selectedUrl.shortCode}
            </p>

            <div className="qr-wrapper">
              <QRCode
                value={`${BASE_URL}/api/url/${selectedUrl.shortCode}`}
                size={180}
                bgColor="#ffffff"
                fgColor="#111827"
                level="M"
              />
            </div>

            <p className="modal-code">/{selectedUrl.shortCode}</p>

            <div className="modal-actions">
              <button
                className="btn btn-modal-copy"
                onClick={() => {
                  copyToClipboard(selectedUrl.shortCode);
                }}
              >
                Copy link
              </button>
              <button
                className="btn btn-modal-close"
                onClick={() => setSelectedUrl(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;