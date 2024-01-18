import { Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";

const App = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout children={<p>Welcome to Home Page</p>}></Layout>
                }
            ></Route>
            <Route
                path="/search"
                element={
                    <Layout children={<p>Welcome to Search Page</p>}></Layout>
                }
            ></Route>
        </Routes>
    );
};

export default App;
