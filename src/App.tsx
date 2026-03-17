import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header";

import Sidebar from "./components/Sidebar/Sidebar.tsx";
import MyLibrary from "./views/MyLibrary.tsx";
import MyBookDetail from "./views/MyBookDetail.tsx";
import NotesDetail from "./views/NotesDetail.tsx";
import FavoriteBook from "./views/FavoriteBook.tsx";
import Home from "./views/Home.tsx";
import "./assets/styles.css";

function App() {
  return (
    <div className="app">
      <Sidebar />
      {/* <Header /> */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<FavoriteBook />} />
          <Route path="/mylibrary" element={<MyLibrary />} />
          <Route path="/mybook/:bookId" element={<MyBookDetail />} />
          <Route path="/mynote/:id" element={<NotesDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
