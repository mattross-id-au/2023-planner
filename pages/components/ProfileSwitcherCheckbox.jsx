const ProfileSwitcherCheckbox = (props) => {
    return (
        <div className="flex py-1">
            <div className="flex items-center h-5">
                <input id={props.id} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 " />
            </div>
            <div className="ml-2 text-sm">
                <label htmlFor={props.id} className="font-medium text-gray-900">
                    <div>{props.label}</div>
                    {/* <p id="helper-checkbox-text-1" className="text-xs font-normal text-gray-500 dark:text-gray-300">Some helpful instruction goes over here.</p> */}
                </label>
            </div>
        </div>
    )
}

export default ProfileSwitcherCheckbox;
