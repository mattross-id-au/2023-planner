import filterState from "../../data/filterState";
import FacetCategory from "./FacetCategory";

const FacetPanel = ({selectedFilters}) => {
	return (<>
		<form>
			<fieldset className="mt-3">
				<label className="block px-4">
					{/* <div className="text-lg font-bold uppercase my-2">Search</div> */}
					<div className="flex facetInput bg-white">
						<input type="text" className="flex-1 outline-none" placeholder="Search events" />
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 pt-1 inline">
							<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
						</svg>
					</div>
				</label>
			</fieldset>

			<fieldset className="px-4 my-7">
				<FacetCategory category="locations" label="Location" />
				<FacetCategory category="faculties" label="Faculty" />
				<FacetCategory category="interestAreas" label="Interest area" />
				<FacetCategory category="activityTypes" label="Activity type" />
			</fieldset>
		</form>
		</>
	)
};

export default FacetPanel;