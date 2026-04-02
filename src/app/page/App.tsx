import Sidebar from '../component/layout/Sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminHomePage from './AdminHomePage'
import DriversList from './DriverListPage'
import SignInPage from './SigIn'
import { ProtectedRoute } from '../utils/ProtectedRoute'
import { AuthProvider } from '../shared/context/auth.context'

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/login" element={<SignInPage />} />

        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-slate-50 min-h-screen">
                  <Routes>
                    <Route path="/" element={<AdminHomePage />} />
                    <Route path="/motoristas" element={<DriversList />} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
    </Router>
  );
}

export default App;