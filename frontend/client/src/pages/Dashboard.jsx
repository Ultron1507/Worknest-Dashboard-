import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const res = await API.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}