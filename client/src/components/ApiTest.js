import React, { useEffect, useState } from "react";

export default function ApiTest() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1.0/test");
        const data = await res.json();
        setItems(data.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <ul>
        {items &&
          items.map((item) => (
            <li key={item.id}>
              {item.name} {item.price}
            </li>
          ))}
      </ul>
    </div>
  );
}
