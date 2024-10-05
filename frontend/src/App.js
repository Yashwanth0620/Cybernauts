import logo from './logo.svg';
import './App.css';
import Form from './Form';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {isAuthenticated ? (
          <div className="d-flex h-100">
            <Routes>
              {/* for admin routes */}
            </Routes>
          </div>
        ) : (
          <div className="">
            <Routes>
              {/* for user routes */}
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
