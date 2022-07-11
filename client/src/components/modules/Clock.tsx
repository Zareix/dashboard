import { useEffect, useState } from "react";

import data from "data.json";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="text-right">
      <div className="w-[120] text-2xl font-bold">
        {time.toLocaleTimeString(data.modules.clock.is24h ? "fr-FR" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: data.modules.clock.showSeconds ? "2-digit" : undefined,
        })}
      </div>
      <div>
        {time.toLocaleDateString(undefined, {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </div>
    </div>
  );
};

export default Clock;
