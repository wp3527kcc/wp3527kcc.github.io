import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Sentry from "@sentry/react";
import BasicLayout from "./layouts/BasicLayout.tsx";
import App from "./pages/App.tsx";
import "./index.css";

Sentry.init({
  dsn: "https://55986661930ae0addd885905b7bf9c47@o4509445702090752.ingest.us.sentry.io/4509445705236480",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "/home",
        element: <div>Home</div>,
      },
      {
        path: "/",
        element: <App/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
