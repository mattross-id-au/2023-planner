import Link from 'next/link';

function EventCardThin(props) {
	const e = props.event;
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
	return (
		<div id={"event-"+e.assetid} key={e.assetid} className="my-1 ml-[75px] -border-l-4 bg-[#f6f6f6] -border-[#cccccc]" >
			<div className="flex flex-row">
				<div className={"icon bg-[#006dae] text-white leading-1 flex items-center w-[60px] " + FacBg.get(e.faculty)}>
					{/* <svg className="w-6 h-6 mr-4 mb-1  ">
						<use xlinkHref={"/icon-spritesheet.svg#" + iconHash.get(e.activityCategory)}></use>
					</svg> */}
					{/* <span className="uppercase font-heading text-xs absolute bottom-3">{ e.activityCategory }</span> */}
					<div className="uppercase font-heading text-sm text-center flex-1">{ FacSm.get(e.faculty) || "MON" }</div>
				</div>
				<div className="p-3 flex-1">
					<div className="text">{e.name}</div>
					<div className="text-sm">{e.timespanText.replace(/\:00 ?/g,"").replace(/AM/g,"am").replace(/PM/g,"pm")}</div>
				</div>
				<div className="p-3 w-[250px] text-right">
					<Link href="#"><a className="px-5 py-2 border-1 border-[#006dae] underline mr-3 inline-block">More info</a></Link>
					<button className="px-5 py-2 bg-[#006dae] text-white text-bold inline-block">Register</button>
				</div>
			</div>
		</div>
	)
}

export default EventCardThin