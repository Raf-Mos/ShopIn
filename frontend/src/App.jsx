import {Outlet} from "react-router-dom"
import Navigation from "./pages/Auth/Navigation"
import Footer from "./pages/Auth/Footer"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
		<>
		<ToastContainer />
		<div className="h-[100%] flex flex-col justify-between">
		<Navigation />

		<main className="pt-3">
		<Outlet />
		
		</main>
		<Footer />
		</div>
		</>
	);
}

export default App
