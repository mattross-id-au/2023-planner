import Link from 'next/link';
import { getUser, getDispatchUser } from './UserContext';

function EventCard(props) {
	const e = props.event;
	const user = getUser();
	
	const hideThisEvent = e.hideBecauseFilter.length > 0 || e.hideBecauseProfile.length > 0;

	let iconHash = new Map([
		["Academic","mortarboard"],
		["Social","user-crowd"],
		["Support","hands"],
		["Tours","australia"],
		["Study skills","books"],
		["Student Support","circle-of-trust"]
	]);
	
	let FacBg = new Map([
		["Art, Design and Architecture","icon-mada"],
		["Arts, Humanities and Social Sciences","icon-arts"],
		["Monash Business School","icon-mbus"],
		["Engineering","icon-eng"],
		["Education","icon-edu"],
		["Information Technology","icon-it"],
		["Law","icon-law"],
		["Medicine, Nursing and Health Sciences","icon-med"],
		["Pharmacy and Pharmaceutical Sciences","icon-pharm"],
		["Science","icon-science"]
	]);

	let FacSm = new Map([
		["Art, Design and Architecture","MADA"],
		["Arts, Humanities and Social Sciences","AHSS"],
		["Monash Business School","BUS"],
		["Engineering","ENG"],
		["Education","EDU"],
		["Information Technology","IT"],
		["Law","LAW"],
		["Medicine, Nursing and Health Sciences","MNHS"],
		["Pharmacy and Pharmaceutical Sciences","PHA"],
		["Science","SCI"]
	]);


	if(hideThisEvent && !user.showExplainers) {
		return (<></>);
	}

    return (
		<div id={"event-"+e.assetid} key={e.assetid} className="monash-shadow relative my-2 ml-[75px]">
			{/* <div className="h-0">
				<div className="pl-32  py-0.5 uppercase bg--[#e6e6e6]">
					<span className="px-5 text-xs">{ e.faculty }</span>
				</div>
			</div> */}
			<div className={((hideThisEvent && user.showExplainers) ? "opacity-30 " : "") + " flex flex-row"}>
				<div className={"icon bg-[#006dae] text-white w-[90px] flex flex-col items-center justify-center " + FacBg.get(e.faculty)}>

						<svg className="w-14 h-14">
							<use xlinkHref={"/icon-spritesheet.svg#" + iconHash.get(e.activityCategory)}></use>
						</svg>
						<div className="uppercase font-heading text-xs text-center mt-2" style={{fontWeight:300}}>{ e.activityCategory }</div>
						{/* <div className="uppercase font-heading text-xs text-center mt-2" style={{fontWeight:300}}>{ FacSm.get(e.faculty) }</div> */}

				</div>
				<div className="details py-3 px-5 flex-grow">
					<h2 className="text-xl font-heading mt-1 mb-0 text-[#006dae]">{e.name}</h2>
					<div className="flex flex-row">
						<div className="w-20">{e.campus}</div>
						<div className="">{e.timespanText.replace(/\:00 ?/g,"").replace(/AM/g,"am").replace(/PM/g,"pm")}</div>
						{/* <div className="">{e.studyArea}</div> */}
						{/* <div className="">{e.studyLevels}</div> */}
						{/* <div className="">{e.location}</div> */}

						
					</div>
					
					<div className="uppercase text-xs pt-3 text-[#505050]">{ e.faculty }</div>
					
					
				</div>
				<div className="actions relative w-64">
					<div className="absolute bottom-9 right-5 flex flex-row">
						<Link href="#"><a className="px-5 py-2 border-1 border-[#006dae] underline mr-5">More info</a></Link>
						<button className="px-5 py-2 bg-[#006dae] text-white text-bold">Register</button>
						
					</div>
				</div>
			</div>
			{/* <div className="absolute top-0 right-0 bg-[#e6e6e6] px-8 py-2 uppercase font-heading text-xs">{e.faculty}</div> */}
			{/* <pre>{ JSON.stringify(event,null,2)}</pre> */}
			{ (user.showExplainers) && (
				<div className={(hideThisEvent ? " bg-red-100" : " bg-green-100") + "  py-1 px-5 text-xs"}>
					<p className="py-1">Profile filters triggered (if any trigger, the user will never see this event):</p>
					<ul className="list-disc">
					{ (e.hideBecauseProfile.length == 0 && e.okayBecauseProfile.length == 0) && (<li className="ml-5 text-green-800"><em>none</em></li>) }
					{ (e.hideBecauseProfile.length > 0) && e.hideBecauseProfile.map((reason) => <li className="ml-5 text-red-800">{ reason }</li>)}	
					{ (e.okayBecauseProfile.length > 0) && e.okayBecauseProfile.map((reason) => <li className="ml-5 text-green-800">{ reason }</li>)}	
					</ul>
					<p className="pt-3 pb-1">User filters triggered (filtered out of view based on user's selections):</p>
					<ul className="list-disc">
					{ (e.hideBecauseFilter.length == 0 && e.okayBecauseFilter.length == 0) && (<li className="ml-5 text-green-800"><em>none</em></li>) }
					{ (e.hideBecauseFilter.length > 0) && e.hideBecauseFilter.map((reason) => <li className="ml-5 text-red-800">{ reason }</li>)}
					{ (e.okayBecauseFilter.length > 0) && e.okayBecauseFilter.map((reason) => <li className="ml-5 text-green-800">{ reason }</li>)}
					</ul>
				</div>
			)}
			
		</div>
    )
}

export default EventCard;