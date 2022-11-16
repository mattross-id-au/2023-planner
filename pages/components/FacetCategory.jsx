import { useFilters, useFiltersDispatch } from './FiltersContext';
import FacetCheckbox from "./FacetCheckbox";
import { getUser } from './UserContext';

const FacetCategory = ({ category }) => {
	let filterState = useFilters();
	let filterStateDispatch = useFiltersDispatch();
	const user = getUser();

	return (
		<>
			<label className="font-bold block">
				{ (category === "locations") && (<div className="text-lg">Location</div>)}
				{ (category === "faculties") && (<div><div className="text-lg mt-7">Interest Areas</div><div className="mt-2  text-gray-500 ">Faculty events</div></div>) }
				{ (category === "interestAreas") && (<div className="mt-3  text-gray-500">Monash wide events</div>)}
				{ (category === "activityTypes") && (<div className="text-lg mt-7">Activiy type</div>)}
			</label>
			<ul className="">
				{ Object.keys(filterState[category]).map((option) => {
					let checked = filterState[category][option].value;
					// if(user.Location__c && category === "locations") {
					// 	if(option==="loc-caulfield" && user.Location__c !== "CAULFIELD") {
					// 		checked = true;
					// 	}
					// }
					if(user.Course_Faculty_Code__c && category === "faculties") {
						if(option==="fa-art-design-and-architecture" && user.Course_Faculty_Code__c !== "50000561" && user.Partner_Faculty_Code__c !== "50000561") return(<div key={option}></div>);
						if(option==="fa-arts" && user.Course_Faculty_Code__c !== "50000562" && user.Partner_Faculty_Code__c !== "50000562") return(<div key={option}></div>);
						if(option==="fa-business" && user.Course_Faculty_Code__c !== "50000563" && user.Partner_Faculty_Code__c !== "50000563") return(<div key={option}></div>);
						if(option==="fa-education" && user.Course_Faculty_Code__c !== "50000564" && user.Partner_Faculty_Code__c !== "50000564") return(<div key={option}></div>);
						if(option==="fa-engineering" && user.Course_Faculty_Code__c !== "50000565" && user.Partner_Faculty_Code__c !== "50000565") return(<div key={option}></div>);
						if(option==="fa-information-technology" && user.Course_Faculty_Code__c !== "50000566" && user.Partner_Faculty_Code__c !== "50000566") return(<div key={option}></div>);
						if(option==="fa-law" && user.Course_Faculty_Code__c !== "50000567" && user.Partner_Faculty_Code__c !== "50000567") return(<div key={option}></div>);
						if(option==="fa-medicine-nursing-and-health-sciences" && user.Course_Faculty_Code__c !== "50000568" && user.Partner_Faculty_Code__c !== "50000568") return(<div key={option}></div>);
						if(option==="fa-pharmacy-and-pharmaceutical-sciences" && user.Course_Faculty_Code__c !== "50000569" && user.Partner_Faculty_Code__c !== "50000569") return(<div key={option}></div>);
						if(option==="fa-science" && user.Course_Faculty_Code__c !== "50000570" && user.Partner_Faculty_Code__c !== "50000570") return(<div key={option}></div>);
					}
					return (
						<FacetCheckbox 
							key={option} 
							name={option} 
							label={filterState[category][option].label} 
							checked={checked}
							category={category} 
							onChange={ (event) => {
								const val = event.target.checked;
								filterStateDispatch({category, option, val}); 
							}}
						/>
					)
				}
					
				)}					
			</ul>
		</>
	)
}

export default FacetCategory;