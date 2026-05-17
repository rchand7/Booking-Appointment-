import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get("/api/crm").then(res => setClients(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {clients.map(c => (
        <div className="border p-3 my-2">
          {c.name} - {c.status}
        </div>
      ))}
    </div>
  );
}
