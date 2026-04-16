import { Routes, Route } from "react-router-dom";
// @ts-ignore
import "./assets/styles.css";
import { useAuth } from "./AuthContext";
import Sidebar from "./components/Sidebar/Sidebar";
import MyLibrary from "./views/MyLibrary";
import MyBookDetail from "./views/MyBookDetail";
import NotesDetail from "./views/NotesDetail";
import FavoriteBook from "./views/FavoriteBook";
import Home from "./views/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login/Login";
import Spinner from "./components/Spinner";
function App() {
  const { user, loading } = useAuth();

  if (loading && !user)
    return (
      <div>
        <Spinner />
      </div>
    );
  return (
    <div className="app">
      {/* <Header /> */}
      {user && <Sidebar />}

      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute isAuthenticated={!!user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<FavoriteBook />} />
            <Route path="/mylibrary" element={<MyLibrary />} />
            <Route path="/mybook/:bookId" element={<MyBookDetail />} />
            <Route path="/mynote/:id" element={<NotesDetail />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
