import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./main/login";
import Register from "./main/register";

const App = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/portal/login" element={ <Login/> } />
                <Route path="/portal/record" element={<RecordList />} />
                <Route path="/portal/edit/:id" element={<Edit />} />
                <Route path="/portal/create" element={<Create />} />
                <Route path="/portal/register" element={<Register />} />
            </Routes>
        </div>
    );
};

export default App;