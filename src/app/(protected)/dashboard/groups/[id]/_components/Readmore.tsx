import { useState } from "react";
import { Button } from "~/components/ui/button";

interface ReadMoreProps {
  children: string;
  maxLength?: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ children, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const displayText = isExpanded ? children : children.slice(0, maxLength);
  const shouldTruncate = children.length > maxLength;

  return (
    <div>
      <p className="text-sm leading-relaxed text-foreground">
        {displayText}
        {!isExpanded && shouldTruncate && "..."}
      </p>
      {shouldTruncate && (
        <Button
          variant="link"
          onClick={toggleExpand}
          className="mt-2 h-auto p-0 font-semibold text-primary hover:underline"
        >
          {isExpanded ? "Show less" : "Read more"}
        </Button>
      )}
    </div>
  );
};

export default ReadMore;
