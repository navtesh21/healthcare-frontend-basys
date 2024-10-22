const Card = ({
  title,
  content,
  tags,
}: {
  title: string;
  content: string;
  tags: string[];
}) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="px-6 py-4">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-700 text-base">{content}</p>
    </div>
    {tags && (
      <div className="px-6 py-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            #{tag}
          </span>
        ))}
      </div>
    )}
  </div>
);
