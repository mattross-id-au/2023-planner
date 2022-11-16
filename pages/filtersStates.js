import React, {useState} from 'react'; 

const FACULTY_VALUES = [
	{ label:"Art, Design and Architecture", id: "fa-art-design-and-architecture" },
	{ label:"Arts", id:"fa-arts" },
	{ label:"Business", id:"fa-business" },
	{ label:"Education", id:"fa-education"},
	{ label:"Engineering", id:"fa-engineering" },
	{ label:"Information Technology", id:"fa-information-technology" },
	{ label:"Law", id:"fa-law" },
	{ label:"Medicine, Nursing and Health Sciences", id:"fa-medicine-nursing-and-health-sciences" },
	{ label:"Pharmacy and Pharmaceutical Sciences", id:"fa-pharmacy-and-pharmaceutical-sciences" },
	{ label:"Science", id:"fa-science" },
	{ label:"Non-faculty events", id:"fa-non-faculty" }	
];



function filterOption (id, label, initialValue) {
	this.id = id;
	this.label = label;

	let value = null;
	const onChangeCallbacks = [];
	
	this.onChange = function(fn) {
		onChangeCallbacks.push(fn);
	};

	const emitChange = function() {
		for(cb of onChangeCallbacks) {
			cb(value);
		}
	};

	Object.defineProperty(this, "value", {
		get() {
			return value;
		},
		set(val) {
			value = val;
			emitChange();
		}
	});
}


const filterCategory = function(label, optionsList) {
	this.label = label;
	this.options = [];
	
	const onChangeCallbacks = [];

	this.onChange = function(fn) {
		onChangeCallbacks.push(fn);
	};

	const emitChange = function() {
		for(cb of onChangeCallbacks) {
			cb(value);
		}
	};

	this.addOption = (id, label, initialValue) => {
		const fo = new filterOption(id, label, initialValue);
		fo.onChange(emitChange);
		this.options.push(fo);
	}

	this.addOptions = (optionsList) => {
		for(let option of optionsList) {
			this.addOption(option.id, option.label, option.intialValue);
		}
	}

	this.getOption = (id) => {
		for(x of this.options) {
			console.log({id,x});
			if(x.id === id) {
				return x;
			}
		}
	};

	if(optionsList && Array.isArray(optionsList)) {
		this.addOptions(optionsList)
	}
}

const filterState = function() {
	this.faculties = new filterCategory("Faculty", FACULTY_VALUES);
	console.log("Created new filterState");
}




export default new filterState();