import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./pages/BookList";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BookList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
