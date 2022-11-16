
import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import EventCardThin from './EventCardThin';
import { useFilters, getSelectedLabels } from './FiltersContext';
import { getUser } from './UserContext';
//import filterState from "../../data/filterState";
import { facIdToText } from "../../data/data-helpers.js"
import events from "../../data/events-s1-2021.js";
//import events from "../../data/events-s2-2022.js";
//import events from "../../data/events-sm7.js";
//import events from "../../data/events-november2022.js";




let selectedFaculties = [];
let selectedInterestAreas = [];
let selectedLocations = [];
let selectedActivityTypes = [];

let dateFormat = new Intl.DateTimeFormat('en-AU', {weekday:'long', month: 'short',day: 'numeric', timeZone: 'Australia/Melbourne', year:'numeric'});
let timeFormat = new Intl.DateTimeFormat('en-AU', {hour: 'numeric', minute:'2-digit'});
let timeFormatTZ = new Intl.DateTimeFormat('en-AU', {hour: 'numeric', minute:'2-digit', timeZoneName: 'short', timeZone: 'Australia/Melbourne'});

events.hits.hits.forEach((event) => {
	event._source.startDateTimeInt = Date.parse(event._source.session[0].start_iso8061);
	event._source.endDateTimeInt = Date.parse(event._source.session[0].end_iso8061);
	event._source.startDateText = dateFormat.format(event._source.startDateTimeInt);
	event._source.startTimeText = timeFormat.format(event._source.startDateTimeInt).split(" ").join("");
	event._source.timespanText = event._source.session[0].time;
});

// Sorting events by date
events.hits.hits.sort((a,b) => {
	// const akey = a._source.faculty + a._source.isoStartDateStr + a._source.session[0].start_time + a._source.name;
	// const bkey = b._source.faculty + b._source.isoStartDateStr + b._source.session[0].start_time + b._source.name;
	const akey = a._source.startDateTimeInt + a._source.session[0].start_time + a._source.name;
	const bkey = b._source.startDateTimeInt + b._source.session[0].start_time + b._source.name;
	return (akey > bkey) ? 1 : -1
});

export default function EventTimeline() {
	selectedFaculties = getSelectedLabels("faculties"); // Refresh data on render
	selectedInterestAreas = getSelectedLabels("interestAreas"); // Refresh data on render
	selectedLocations = getSelectedLabels("locations"); // Refresh data on render
	selectedActivityTypes = getSelectedLabels("activityTypes"); // Refresh data on render
	let selectedFacsAndAreas = [...selectedFaculties, ...selectedInterestAreas];
	let previousDay = "";
	let previousTime = "";

	const user = getUser();
	
	// Checking filters

	events.hits.hits.forEach((event) => {
		event._source.hideBecauseProfile = [];
		event._source.okayBecauseProfile = [];
		event._source.hideBecauseFilter = [];
		event._source.okayBecauseFilter = [];
		

		// if(user.Citizenship__c) {
		// 	if(user.Citizenship__c)
		// }

		// Location user filter
		if(selectedLocations.length !== 0) { // Location filters are active
			if(selectedLocations.indexOf(event._source.campus) == -1) {
				event._source.hideBecauseFilter.push("Location: selected=" + selectedLocations.join(", ") + " ----- event=" + event._source.campus);
			} else {
				event._source.okayBecauseFilter.push("Location: selected=" + selectedLocations.join(", ") + " ----- event=" + event._source.campus);
			}
		}

		
		// Faculty user filter
		if(selectedFacsAndAreas.length !== 0) {
			if(selectedFacsAndAreas.indexOf(event._source.faculty) == -1) {
				event._source.hideBecauseFilter.push("Areas: selected=" + selectedFacsAndAreas.join(", ") + " ----- event=" + event._source.faculty);
			} else {
				event._source.okayBecauseFilter.push("Areas: selected=" + selectedFacsAndAreas.join(", ") + " ----- event=" + event._source.faculty);
			}
		}
		// Faculty profile filter
		if(user.Course_Faculty_Code__c) {
			facIdToText.forEach((facText,facCode)=> {
				if(facText) {
					if(event._source.faculty === facText && user.Course_Faculty_Code__c !== facCode && user.Partner_Faculty_Code__c !==  facCode) {
						event._source.hideBecauseProfile.push(
							"Managing or Partner faculty: profile=" + 
							facIdToText.get(user.Course_Faculty_Code__c) + ' ' + 
							facIdToText.get(user.Partner_Faculty_Code__c)  + 
							" ----- event=" + event._source.faculty
						);		
					}
				}
			})
		}
		// Faculty profile filter
		if(selectedActivityTypes.length !== 0) {
			if(selectedActivityTypes.indexOf(event._source.activityCategory) == -1) {
				event._source.hideBecauseFilter.push("Activity type: selected=" + selectedActivityTypes.join(", ") + " ----- event=" + event._source.activityCategory);
			}
		}

		event._source.hasTriggeredFilters = event._source.hideBecauseFilter.length > 0 || event._source.hideBecauseProfile.length > 0;
		event._source.hideEvent = event._source.hasTriggeredFilters && !user.showExplainers;

	});

	

	return (
		events.hits.hits.map((event) => {
			//if(showEventBecauseFilters(event)) {
			if(!event._source.hideEvent) {
				
				
				let showDayHeading = false;
				let showTimeHeading = false;

				if(!event._source.hideEvent) {
					if(event._source.startDateText !== previousDay) {
						showDayHeading = true;
						previousTime = null;
					}
					if(event._source.startTimeText !== previousTime) {
						showTimeHeading= true;
					}
					previousDay = event._source.startDateText;
					previousTime = event._source.startTimeText;
				}
				return (
					<div key={event._source.assetid}>
						{ showDayHeading && ( <h2 className="text-2xl font-heading mb-5 mt-20">{ event._source.startDateText }</h2>) }
						{ showTimeHeading && ( <>
							<div style={{borderBottom:'1px solid #cccccc', position: 'relative', top: '25px'}}></div>
							<h3 style={{position:'relative', backgroundColor: '#ffffff',display:'inline-block',width:'75px',padding:'0 0px 0 0'}} className="timeline-time mt-3"> { event._source.startTimeText  } </h3>
							
						</>)}
						<EventCard event={event._source} key={event._source.assetid}  />
						{/* <EventCardThin event={event._source} key={event._source.assetid}  /> */}
						
					</div>
				)
			}
		})
	)
}

function showEventBecauseFilters(event) {
	let show = true;
	//let nfes = ["Student organisations","Scholarships, Admissions and Student Services","Libraries","Campus activities","Monash Performing Arts Centre"]
	let selectedFacsAndAreas = [...selectedFaculties, ...selectedInterestAreas];

	// if(selectedFacsAndAreas.length !== 0) {
	// 	if(selectedFacsAndAreas.indexOf(event._source.faculty) == -1) {
	// 		show = false;
	// 	}
	// }

	// if(selectedLocations.length !== 0) {
	// 	if(selectedLocations.indexOf(event._source.campus) == -1) {
	// 		show = false;
	// 	}
	// }


	if(selectedActivityTypes.length !== 0) {
		if(selectedActivityTypes.indexOf(event._source.activityCategory) == -1) {
			show = false;
		}
	}
	// if(selectedFaculties.length !== 0) {
	// 	if(selectedFaculties.indexOf(event._source.faculty) == -1) {
	// 		show = false;
	// 	}
	// }

	// if(selectedInterestAreas.length !== 0) {
	// 	if(selectedInterestAreas.indexOf(event._source.faculty) == -1) {
	// 		show = false;
	// 	}
	// }

	// if(selectedFaculties.indexOf("Non-faculty events") !== -1 && nfes.indexOf(event._source.faculty) !== -1) {
	// 	show = true;
	// }

	return show;
}