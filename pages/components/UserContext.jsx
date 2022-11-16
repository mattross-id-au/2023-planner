import { createContext, useContext, useReducer } from 'react';

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);
const initialState = {
	'Citizenship__c': "",
	'Course_Level__c': '',
	'Location__c': '',
	'Course_Code__c': 'B2001',
	'Course_Faculty_Code__c': '',// '50000563',
	'Commencement_Date__c': '4/01/2022 12:00:00 AM',
	'Partner_Faculty_Code__c': '',
	'showExplainers' : false
}

export function UserContextProvider({children}) {
	const [user, dispatchUser] = useReducer((newUser, action) => {
		return {...newUser, ...action};
	}, initialState);

	return (
		<UserContext.Provider value={user} >
			<UserDispatchContext.Provider value={dispatchUser}>
				{children}
			</UserDispatchContext.Provider>
		</UserContext.Provider>
	)
}

export const getUser = () => useContext(UserContext);
export const getDispatchUser = () => useContext(UserDispatchContext);
