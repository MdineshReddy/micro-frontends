import React, { Suspense } from "react";

const Button = React.lazy(() => import("remoteApp/Button"));

const App = () => (
  <div>
    <h1>Host App</h1>
    <Suspense fallback={<div>Loading Button...</div>}>
      <Button label="Click Me" onClick={() => alert("Button Clicked!")} />
    </Suspense>
  </div>
);

export default App;
