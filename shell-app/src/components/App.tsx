import React, { Suspense } from "react";

const RemoteApp = React.lazy(() => import("remoteApp/App"));

const App = () => (
  <div>
    <h1>Shell App</h1>
    <Suspense fallback={<div>Loading Remote App...</div>}>
      <RemoteApp />
    </Suspense>
  </div>
);

export default App;
