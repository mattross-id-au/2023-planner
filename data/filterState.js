let callbacks = [];

export default {
	"categories" : [
		{ id: "faculty", label: "Faculty" }
	],
	"faculties" : {
		"fa-art-design-and-architecture" : { "label" : "Art, Design and Architecture", "value": false },
		"fa-arts" : { "label" : "Arts", "value": false },
		"fa-business" : { "label" : "Business", "value": false },
		"fa-education" : { "label" : "Education", "value": false },
		"fa-engineering" : { "label" : "Engineering", "value": false },
		"fa-information-technology" : { "label" : "Information Technology", "value": false },
		"fa-law" : { "label" : "Law", "value": false },
		"fa-medicine-nursing-and-health-sciences" : { "label" : "Medicine, Nursing and Health Sciences", "value": false },
		"fa-pharmacy-and-pharmaceutical-sciences" : { "label" : "Pharmacy and Pharmaceutical Sciences", "value": false },
		"fa-science" : { "label" : "Science", "value": false },
		"fa-non-faculty" : { "label" : "Non-faculty events", "value": false }
	},
	"locations" : {
		"loc-caulfield" : { "label" : "Caulfield", "value" : false },
		"loc-clayton" : { "label" : "Clayton", "value" : false },
		"loc-parkville" : { "label" : "Parkville", "value" : false },
		"loc-peninsula" : { "label" : "Peninsula", "value" : false },
		"loc-online" : { "label" : "Online", "value" : false }
	},
	"interestAreas" : {
		"ia-student-support" : { "label" : "Student support", "value" : false },
		"ia-libraries" : { "label" : "Libraries", "value" : false },
		"ia-campus-activities" : { "label" : "Campus activities", "value" : false }
	},
	"activityTypes" : {
		"at-academic" : { "label" : "Academic", "value" : false },
		"at-social" : { "label" : "Social", "value" : false },
		"at-study-skills" : { "label" : "Study skills", "value" : false },
		"at-support" : { "label" : "Support", "value" : false }
	},

	// set("faculties","fa-education",true);
	// will run all functions from onChange callback saved in callbacks[]
	set: function(category, option, value) {
		for(let cb of callbacks) {
			cb({category, option, value});
		}
		this[category][option].value = value;
	},

	onChange: function(fn) {
		callbacks.push(fn);
	},

	
	// Returns an array of entries from filterState
	// getSelected("faculties");
	// > [0]: {label: 'Business', value: true}
	// > [1]: {label: 'Law', value: true}
	getSelected : function(category) {
		let result = [];
		for(let option of Object.keys(this[category])) {
			if(this[category][option].value === true) {
				result.push(this[category][option]);
			}
		}
		return result;
	},

	getSelectedKeys : function(category) {
		let result = [];
		for(let option of Object.keys(this[category])) {
			if(this[category][option].value === true) {
				result.push(option);
			}
		}
		return result;
	},

	getSelectedLabels : function(category) {
		let result = [];
		for(let option of Object.keys(this[category])) {
			if(this[category][option].value === true) {
				result.push(this[category][option].label);
			}
		}
		return result;
	}
}


	
