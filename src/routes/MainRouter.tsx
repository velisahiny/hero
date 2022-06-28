import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "../App";
import {HeroPage} from "../heroes/HeroPage";

export const MainRouter = () => {

    return <BrowserRouter>

        <Routes>
            <Route path={"/"} element={<App/>}></Route>
            <Route path={"hero"}>
                <Route path={":heroID"} element={<HeroPage/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
}