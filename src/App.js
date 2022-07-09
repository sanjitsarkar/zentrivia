import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components";
import { HomePage, LoginPage, PageNotFound, SignupPage } from "./pages";
import { callApi } from "./utils";
function App() {
  useEffect(() => {
    (async () => {
      try {
        const response = await callApi("/", "get", false);
        console.log("response", response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
