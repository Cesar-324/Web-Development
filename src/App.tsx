import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "./components/layout/AppLayout";
import CatalogPage from "./components/pages/Catalog";
import BookDetailsPage from "./components/pages/BookDetails";
import Login from "./components/pages/Login";

const MyLoansPage = lazy(() => import("./components/pages/MyLoans"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/my-loans" element={<MyLoansPage />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
