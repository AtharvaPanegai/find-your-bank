import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push("./all-banks");
    }, 2000);
  }, [history]);

  return (
    <div className="notFound">
      <h1>Page not Found | 404</h1>
      <pre>Redirecting to homepage...</pre>
    </div>
  );
}

export default NotFound;
