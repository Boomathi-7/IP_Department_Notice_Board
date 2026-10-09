interface NoticeCardProps {
  title: string;
  message: string;
}

function NoticeCard({ title, message }: NoticeCardProps) {
  return (
    <article className="notice-card">
      <h3>{title}</h3>
      <p>{message}</p>
    </article>
  );
}

export default NoticeCard;

