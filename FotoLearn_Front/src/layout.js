import {BrowserRouter, Route, Routes} from "react-router-dom";
import injectContext from './store/context';

const Layout = () => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<h1>Hola</h1>}></Route>
                    <Route path="/login" element={<div>NOT FOUND</div>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default injectContext(Layout);