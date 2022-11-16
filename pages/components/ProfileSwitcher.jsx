import { useState } from 'react';
import ProfileSwitcherCheckbox from './ProfileSwitcherCheckbox';
import { getUser, getDispatchUser } from './UserContext';

const ProfileSwitcher = () => {
    let [toggleState, setToggleState] = useState("block");
	const toggle = () => setToggleState(toggleState === 'hidden' ? 'block' : 'hidden');

	const user = getUser();
	const dispatchUser = getDispatchUser();

	const updateStudentType = (event) => dispatchUser({'Citizenship__c':event.target.value});
	const updateStudentLocation = (event) => dispatchUser({'Location__c':event.target.value});
	const updateStudentStudyLevel = (event) => dispatchUser({'Course_Level__c':event.target.value});
	const updateManagingFaculty = (event) => dispatchUser({'Course_Faculty_Code__c':event.target.value});
	const updatePartnerFaculty = (event) => dispatchUser({'Partner_Faculty_Code__c':event.target.value});
	
    return (
        <div className="flex">
			<div className="flex items-center mr-4">
				<input id="default-checkbox" type="checkbox" value="" onChange={(event)=>dispatchUser({'showExplainers':event.target.checked})} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2" />
				<label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900">Show Explainers</label>
			</div>
			<div>
				<button data-dropdown-toggle="dropdownHelper" type="button" onClick={toggle} className="w-60 text-white bg-[#006dab] px-4 py-2.5 text-center inline-flex items-center">
						Show student profile
						<svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
				</button>
				
				<div id="dropdownHelper" className={toggleState + " z-10 w-60 bg-white divide-y divide-gray-100 shadow-lg absolute"}>
					{/* <pre>{ JSON.stringify(user,null,2) }</pre> */}

					<div className="p-3 space-y-1 text-sm text-gray-700">
						<div className="p-2 rounded hover:bg-gray-100">
							<label className="block mb-2 text-sm font-bold text-gray-900">Location</label>
							<select onChange={updateStudentLocation} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
								<option value="prof-st-none">-- select --</option>
								<option value="CAULFIELD">Caulfield</option>
								<option value="CLAYTON">Clayton</option>
								<option value="PARKVILLE">Parkville</option>
								<option value="PENINSULA">Peninsula</option>
							</select>
						</div>

						<div className="p-2 rounded hover:bg-gray-100">
							<label className="block mb-2 text-sm font-bold text-gray-900">Student type</label>
							<select onChange={updateStudentType} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
								<option value="">-- select --</option>
								<option value="DOMESTIC">Domestic</option>
								<option value="INTERNATIONAL">International</option>
							</select>
						</div>

						<div className="p-2 rounded hover:bg-gray-100">
							<label className="block mb-2 text-sm font-bold text-gray-900">Study Level</label>
							<select onChange={updateStudentStudyLevel} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
								<option value="">-- select --</option>
								<option value="UG">Undergraduate</option>
								<option value="OPG">Graduate</option>
								<option value="HDR">HDR</option>
							</select>
						</div>

						<div className="p-2 rounded hover:bg-gray-100">
							<label className="block mb-2 text-sm font-bold text-gray-900">Managing Faculty</label>
							<select onChange={updateManagingFaculty} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
								<option value="">-- select --</option>
								<option value="50000561">Art, Design and Architecture</option>
								<option value="50000562">Arts, Humanities and Social Sciences</option>
								<option value="50000563">Monash Business School</option>
								<option value="50000564">Education</option>
								<option value="50000565">Engineering</option>
								<option value="50000566">Information Technology</option>
								<option value="50000567">Law</option>
								<option value="50000568">Medicine, Nursing and Health Sciences</option>
								<option value="50000569">Pharmacy and Pharmaceutical Sciences</option>
								<option value="50000570">Science</option>
							</select>
						</div>

						<div className="p-2 rounded hover:bg-gray-100">
							<label className="block mb-2 text-sm font-bold text-gray-900">Partner Faculty</label>
							<select onChange={updatePartnerFaculty} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
								<option value="">-- select --</option>
								<option value="50000561">Art, Design and Architecture</option>
								<option value="50000562">Arts, Humanities and Social Sciences</option>
								<option value="50000563">Monash Business School</option>
								<option value="50000564">Education</option>
								<option value="50000565">Engineering</option>
								<option value="50000566">Information Technology</option>
								<option value="50000567">Law</option>
								<option value="50000568">Medicine, Nursing and Health Sciences</option>
								<option value="50000569">Pharmacy and Pharmaceutical Sciences</option>
								<option value="50000570">Science</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}

export default ProfileSwitcher;