import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import ComingSoonPage from "./ComingSoonPage";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error, "error");

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <ComingSoonPage />;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}
