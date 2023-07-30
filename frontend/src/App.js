import "bootstrap/dist/css/bootstrap.min.css"

import './App.css';
import {Route, Routes} from "react-router-dom";
import Test from "./Test/Test";
import Login from "./Login/Login";
import {RequireAuth} from "react-auth-kit";

function App() {
    return (
        <>
            <Routes>
                <Route path="/test" element={<RequireAuth loginPath={"/login"}><Test/></RequireAuth>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
        </>
    );
}

export default App;
