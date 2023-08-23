import { useEffect } from "react";
import { Link, redirect, useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  useEffect(() => {
   navigate('/')
  });
  const error:any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Link to="/">Back to Login</Link>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}