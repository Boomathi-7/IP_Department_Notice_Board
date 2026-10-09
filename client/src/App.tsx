import { FormEvent, useEffect, useState } from "react";
import NoticeCard from "./components/NoticeCard";

const NOTICES_API_URL = "http://localhost:5000/api/notices";

interface Notice {
  _id: string;
  title: string;
  message: string;
}

function App() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const response = await fetch(NOTICES_API_URL);
        if (!response.ok) {
          throw new Error("Unable to load notices.");
        }
        const data: Notice[] = await response.json();
        setNotices(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load notices.");
      } finally {
        setLoading(false);
      }
    };

    void loadNotices();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const trimmedTitle = title.trim();
    const trimmedMessage = message.trim();

    if (!trimmedTitle || !trimmedMessage) {
      setError("Please enter both a title and a message.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(NOTICES_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmedTitle, message: trimmedMessage })
      });
      const data: Notice | { error?: string } = await response.json();
      if (!response.ok) {
        throw new Error("error" in data && data.error ? data.error : "Unable to add notice.");
      }
      if (!("_id" in data)) {
        throw new Error("The server returned an invalid notice.");
      }
      setNotices((currentNotices) => [data, ...currentNotices]);
      setTitle("");
      setMessage("");
      setSuccess("Notice added successfully.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to add notice.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">Department Communication</p>
        <h1>Department Notice Board</h1>
        <p>Stay informed about the latest announcements and academic updates.</p>
      </header>

      <section className="content-grid">
        <form className="notice-form" onSubmit={handleSubmit}>
          <h2>Add a notice</h2>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter notice title"
            required
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write the notice message"
            rows={6}
            required
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add Notice"}
          </button>
        </form>

        <section className="notice-list" aria-labelledby="notices-heading">
          <div className="section-heading">
            <h2 id="notices-heading">Latest notices</h2>
            <span>{notices.length} total</span>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          {loading && <p className="status-message">Loading notices...</p>}
          {!loading && !error && notices.length === 0 && (
            <p className="status-message">No notices have been added yet.</p>
          )}
          {!loading &&
            notices.map((notice) => (
              <NoticeCard key={notice._id} title={notice.title} message={notice.message} />
            ))}
        </section>
      </section>
    </main>
  );
}

export default App;
