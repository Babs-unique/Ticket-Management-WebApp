import { useEffect, useState } from "react";

export function useTimeAgo(dateString) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    function calculateTimeAgo() {
      const now = new Date();
      const past = new Date(dateString);

      const diffInSeconds = Math.floor((now - past) / 1000);

      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

      const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
      ];

      for (let i of intervals) {
        const count = Math.floor(diffInSeconds / i.seconds);
        if (count >= 1) {
          return rtf.format(-count, i.label);
        }
      }

      return "just now";
    }

    // Set initial value
    setTimeAgo(calculateTimeAgo());

    // Update every 30 seconds
    const interval = setInterval(() => {
      setTimeAgo(calculateTimeAgo());
    }, 30000);

    return () => clearInterval(interval);
  }, [dateString]);

  return timeAgo;
}