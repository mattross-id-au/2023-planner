import React, {useState} from 'react'; 
//import filterState from "../../data/filterState";

export default function FacetCheckbox(props) {
	let isChecked = !(props.checked == false || typeof props.checked == 'undefined');
	const [checked, setChecked] = useState(isChecked); 

	const handleChange = (event) => { 
		setChecked(event.target.checked);
		//console.log("handleChange", props.category, props.name, event.target.checked);
		//filterState.set(props.category, props.name, event.target.checked);
		if(props.onChange) {
		 	//console.log("rops.onchange", props.onChange);
		 	props.onChange(event);
		}
	};

	return(
        <li className="my-2">
			<label htmlFor={props.name} className="flex">
				<div className="flex items-center h-5 relative">
					<input id={props.name} aria-describedby={props.name + "-text"} type="checkbox" onChange={handleChange} checked={checked} className="absolute top-0 left-0 w-0 h-0 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 shadow" />
					<span className="checkmark"></span>
				</div>
				<div className="ml-2 text-sm pl-5">
					<span htmlFor={props.name} className="font-medium text-gray-900">{ props.label }</span>
					{props.helperText && 
						<p id={props.name + "-text"} className="text-xs font-normal text-gray-500">For orders shipped from $25 in books or $29 in other categories</p>
					}
				</div>
			</label>
        </li>
    )
}
