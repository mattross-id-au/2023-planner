import { createContext, useContext, useReducer } from 'react';

const FiltersContext = createContext(null);
const FiltersDispatchContext = createContext(null);

export function FiltersContextProvider({children}) {
	const [filters, dispatch] = useReducer(filtersReducer, initialState);
	//console.log("FiltersProvider::FiltersContextProvider--re-render()")
	return (
		<FiltersContext.Provider value={filters}>
			<FiltersDispatchContext.Provider value={dispatch}>
				{children}
			</FiltersDispatchContext.Provider>
		</FiltersContext.Provider>
	)
}

export function useFilters() {
	return useContext(FiltersContext);
}

export function useFiltersDispatch() {
	//console.log("FiltersProvider::useFiltersDispatch(filters, action)");
	return useContext(FiltersDispatchContext);
}

function filtersReducer(filters, {category, option, val}) {
	//console.log("FiltersProvider::filtersReducer(filters, action)", {category, option, val});
	filters[category][option].value = val;
	
	return {... filters};
	//return filters;
}

export function getSelectedLabels(category) {
	const filters = useFilters();
	//console.log("getSelectedLabels::(category)" , category, filters);
	const result = [];
	for(let option of Object.keys(filters[category])) {
		if(filters[category][option].value === true) {
			result.push(filters[category][option].label);
		}
	}
	return result;
}

const initialState = {
	"locations" : {
		"loc-caulfield" : { "label" : "Caulfield", "value" : false },
		"loc-clayton" : { "label" : "Clayton", "value" : false },
		"loc-parkville" : { "label" : "Parkville", "value" : false },
		"loc-peninsula" : { "label" : "Peninsula", "value" : false },
		"loc-online" : { "label" : "Online", "value" : false }
	},
	"faculties" : {
		"fa-art-design-and-architecture" : { "label" : "Art, Design and Architecture", "value" : false },
		"fa-arts" : { "label" : "Arts, Humanities and Social Sciences", "value" : false },
		"fa-business" : { "label" : "Monash Business School", "value" : false },
		"fa-education" : { "label" : "Education", "value" : false },
		"fa-engineering" : { "label" : "Engineering", "value" : false },
		"fa-information-technology" : { "label" : "Information Technology", "value" : false },
		"fa-law" : { "label" : "Law", "value" : false },
		"fa-medicine-nursing-and-health-sciences" : { "label" : "Medicine, Nursing and Health Sciences", "value" : false },
		"fa-pharmacy-and-pharmaceutical-sciences" : { "label" : "Pharmacy and Pharmaceutical Sciences", "value" : false },
		"fa-science" : { "label" : "Science", "value" : false },
		//"fa-non-faculty" : { "label" : "Non-faculty events", "value" : false }
	},
	"interestAreas" : {
		"ia-student-organisations" : { "label" : "Student organisations", "value" : false },
		"ia-libraries" : { "label" : "Libraries", "value" : false },
		"ia-campus-activities" : { "label" : "Campus activities", "value" : false },
		"ia-campus-scholarships" : { "label" : "Scholarships, Admissions and Student Services", "value" : false },
		"ia-mpac" : { "label" : "Monash Performing Arts Centre", "value" : false }
	},
	"activityTypes" : {
		"at-academic" : { "label" : "Academic", "value" : false },
		"at-social" : { "label" : "Social", "value" : false },
		"at-study-skills" : { "label" : "Study skills", "value" : false },
		"at-support" : { "label" : "Support", "value" : false }
	}
};

