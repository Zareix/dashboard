import { useParams } from "react-router-dom";

import data from "data.json";

import PiHole from "./PiHole";

const App = () => {
  const params = useParams();
  const app =
    data.categories[parseInt(params.catIndex ?? "9999")].apps[
      parseInt(params.appIndex ?? "9999")
    ];

  if (!app) return <div>App not found</div>;

  switch (app.type?.toLowerCase()) {
    case "pi-hole":
      return <PiHole {...app} />;

    default:
      return (
        <>
          <h1 className="flex items-center">
            <img className="icon" src={`/assets/${app.image}`} />
            {app.name}
          </h1>
          <iframe
            src={app.url}
            className="h-[39rem] max-h-[80vh] w-[98%] rounded-md border-2 dark:border-slate-700"
          ></iframe>
        </>
      );
  }
};

export default App;
