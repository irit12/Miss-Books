
// import { Home } from "./cmps/Home.jsx"
// import { BookIndex } from "./pages/BookIndex.jsx"

//import { Team } from "./cmps/AboutCmps/Team.jsx"
//import { Vision } from "./cmps/AboutCmps/Vision.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./pages/bookDetails.jsx"
// import { NotFound } from "./cmps/NotFound.jsx"
// import { About } from "./pages/About.jsx"
// import { BookDetails } from "./pages/BookDetails.jsx"
// import { BookEdit } from "./pages/BookEdit.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

export function RootCmp() {
    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>
                        {/* <Route path="/" element={<Navigate to="/home" />} /> */}
                        <Route path="/" element={<Home />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}