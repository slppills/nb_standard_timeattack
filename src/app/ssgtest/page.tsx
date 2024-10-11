import React from "react";

const SsgTest = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/10", {
    cache: "force-cache",
  });
  const data = await res.json();

  return (
    <div>
      <p>{data.title}</p>
      <p>{data.body}</p>
    </div>
  );
};

export default SsgTest;
