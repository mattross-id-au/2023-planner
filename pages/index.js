import { FiltersContextProvider } from './components/FiltersContext.jsx';
import { UserContextProvider } from './components/UserContext.jsx';
import EventTimeline from "./components/EventTimeline";
import FacetPanel from "./components/FacetPanel";
import ProfileSwitcher from "./components/ProfileSwitcher";

export default function Home(props) {
    return (
		<UserContextProvider>
			<FiltersContextProvider>
				<header className="bg-slate-100 shadow">
					<div className="container mx-auto px-2 py-5 mb-10 flex">
						<h1 className="font-sans text-4xl font-bold flex-1">Events planner</h1>
						<ProfileSwitcher />
					</div>
				</header>
				<div className="container mx-auto flex">
					<nav className="w-64">
						<FacetPanel />
					</nav>
					<div className="mx-10 flex-1">
						<EventTimeline />
					</div>
				</div>
			</FiltersContextProvider>
		</UserContextProvider>
    )
}