import { useEffect, useState } from 'react';

export function useTipFormCount() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const res = await fetch('http://localhost:3000/rumpkeai/count');
      const data = await res.json();
      setTotal(data.totalSubmissions);
    };

    fetchCount();
    const interval = setInterval(fetchCount, 5000);
    return () => clearInterval(interval);
  }, []);

  return { total };
}
