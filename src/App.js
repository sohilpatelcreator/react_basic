import React, {lazy,Suspense, useContext} from 'react'
import { BrowserRouter,Routes, Route } from "react-router-dom";
import CommonContext from "./context/CommonContext";

const BlankLayout = lazy(()=>import('./views/layout/BlankLayout'));
const MainLayout = lazy(()=>import('./views/layout/MainLayout'));
const FrontLayout = lazy(()=>import('./views/layout/FrontLayout'));

const Home = lazy(()=>import('./views/front/Home'));
const Login = lazy(()=>import('./views/site/Login'));
const Register = lazy(()=>import('./views/site/Register'));
const Dashboard = lazy(()=>import('./views/site/Dashboard'));
const NoteIndex = lazy(()=>import('./views/note/NoteIndex'));
const NoteCreate = lazy(()=>import('./views/note/NoteCreate'));
const NoteView = lazy(()=>import('./views/note/NoteView'));

function LoadingBlock(){
  return <div>Loading...</div>
}

function App() {
  const {isAuthenticated,loading}=useContext(CommonContext);
  console.log('App isAuthenticated',isAuthenticated);
  return (
    <BrowserRouter>
      {loading && <div>Loading...</div>}
        <Routes>
          <Route element={<Suspense fallback={<LoadingBlock/>}><FrontLayout/></Suspense>} >
            <Route exact path="/" element={<Suspense fallback={<LoadingBlock/>}><Home/></Suspense>}/>
            <Route exact path="/home" element={<Suspense fallback={<LoadingBlock/>}><Home/></Suspense>} />
          </Route>
          <Route element={<Suspense fallback={<LoadingBlock/>}><BlankLayout/></Suspense>} >
            {!isAuthenticated && <Route exact path="/register" element={<Suspense fallback={<LoadingBlock/>}><Register/></Suspense>} />}
            {!isAuthenticated && <Route exact path="/login" element={<Suspense fallback={<LoadingBlock/>}><Login/></Suspense>} />}
          </Route>
          <Route element={<Suspense fallback={<LoadingBlock/>}><MainLayout/></Suspense>} >
            {isAuthenticated && <Route exact path="/dashboard" element={<Suspense fallback={<LoadingBlock/>}><Dashboard/></Suspense>} />}
            {isAuthenticated && <Route exact path="/note/index" element={<Suspense fallback={<LoadingBlock/>}><NoteIndex/></Suspense>} />}
            {isAuthenticated && <Route exact path="/note/create" element={<Suspense fallback={<LoadingBlock/>}><NoteCreate/></Suspense>} />}
            {isAuthenticated && <Route exact path="/note/view" element={<Suspense fallback={<LoadingBlock/>}><NoteView/></Suspense>} />}
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
