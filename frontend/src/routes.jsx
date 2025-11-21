import './routes.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Authentication from "./components/view/auth/auth.view";

export default function MyRoutes(){
  return(
    <Router>
      <div className="main-body">
      <Routes>
        <Route path="/" element={<Authentication/>}/>
      </Routes>
      </div>
    </Router>
  )
}