import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import LayoutCarrusel from "./components/Carrusel/LayoutCarrusel";
// import CarruselList from "./components/Carrusel/CarruselList.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import MyLibrary from "./views/MyLibrary.tsx";
import MyBookDetail from "./views/MyBookDetail.tsx";
import NotesDetail from "./views/NotesDetail.tsx";
import "./assets/styles.css";

function App() {
  return (
    <div className="app">
      <Sidebar />
      {/* <Header /> */}
      <main>
        <Routes>
          <Route path="/favorites" element={<h1>Contenido de Favoritos</h1>} />
          <Route path="/mylibrary" element={<MyLibrary />} />
          <Route path="/mybook/:bookId" element={<MyBookDetail />} />
          <Route path="/mynote/:id" element={<NotesDetail />} />
        </Routes>
        {/* <LayoutCarrusel title="En Progreso">
          <BookList items={[]} />
        </LayoutCarrusel>

        <LayoutCarrusel title="Favoritos">
          <BookList items={[1]} />
        </LayoutCarrusel> */}
      </main>
    </div>
  );
}

export default App;
