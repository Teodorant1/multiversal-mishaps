import React from "react";

const BigList = () => {
  const items = Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`);

  return (
    <div className="min-h-screen bg-blue-600 text-white">
      <div className="mx-auto max-w-2xl py-10">
        <h1 className="mb-5 text-2xl font-bold">Big List</h1>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="rounded border border-gray-200 bg-white p-4 shadow"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BigList;
