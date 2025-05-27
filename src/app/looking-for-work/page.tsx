import Link from 'next/link';

const sampleListings = [
	{
		id: 1,
		name: 'John Doe',
		location: 'Portland, ME',
		sternmanExperience: 5,
		thirdManExperience: 2,
		preferredPosition: 'Sternman',
		previousBoats: [
			{ boatName: 'The Albatross', duration: '2 years' },
			{ boatName: 'The Sea Serpent', duration: '3 years' },
		],
		reliableTransportation: 'Yes',
		gearExperience: ['Trawls', 'Singles'],
		personalityType: 'Hardworking and reliable',
		goals: 'To find a long-term position on a reputable boat.',
		fishingType: 'Groundfishing',
	},
	{
		id: 2,
		name: 'Jane Smith',
		location: 'New Bedford, MA',
		sternmanExperience: 2,
		thirdManExperience: 7,
		preferredPosition: '3rd Man',
		previousBoats: [
			{ boatName: 'The Wanderer', duration: '4 years' },
			{ boatName: 'The Ocean Queen', duration: '3 years' },
		],
		reliableTransportation: 'Yes',
		gearExperience: ['5s', 'Pairs'],
		personalityType: 'Team player with a strong work ethic',
		goals: 'To advance my career and gain more experience in the fishing industry.',
		fishingType: 'Scalloping',
	},
	{
		id: 3,
		name: 'Robert Jones',
		location: 'Gloucester, MA',
		sternmanExperience: 8,
		thirdManExperience: 0,
		preferredPosition: 'Sternman',
		previousBoats: [
			{ boatName: 'The Northern Star', duration: '5 years' },
			{ boatName: 'The Sea Hunter', duration: '3 years' },
		],
		reliableTransportation: 'Yes',
		gearExperience: ['Trawls', 'Singles', 'Pairs'],
		personalityType: 'Experienced and dedicated',
		goals: 'To find a challenging and rewarding position.',
		fishingType: 'Lobstering',
	},
	{
		id: 4,
		name: 'Emily White',
		location: 'Boston, MA',
		sternmanExperience: 0,
		thirdManExperience: 3,
		preferredPosition: '3rd Man',
		previousBoats: [
			{ boatName: 'The Atlantic Rose', duration: '2 years' },
			{ boatName: 'The Ocean Spray', duration: '1 year' },
		],
		reliableTransportation: 'No',
		gearExperience: ['5s'],
		personalityType: 'Eager to learn and hardworking',
		goals: 'To gain experience and build a career in the fishing industry.',
		fishingType: 'Tuna Fishing',
	},
	{
		id: 5,
		name: 'Michael Brown',
		location: 'Providence, RI',
		sternmanExperience: 4,
		thirdManExperience: 4,
		preferredPosition: 'Either',
		previousBoats: [
			{ boatName: 'The Rhode Runner', duration: '3 years' },
			{ boatName: 'The Bay Queen', duration: '1 year' },
		],
		reliableTransportation: 'Yes',
		gearExperience: ['Trawls', '5s'],
		personalityType: 'Versatile and adaptable',
		goals: 'To find a stable and well-paying position.',
		fishingType: 'Groundfishing',
	},
	{
		id: 6,
		name: 'Jessica Davis',
		location: 'Newport, RI',
		sternmanExperience: 6,
		thirdManExperience: 1,
		preferredPosition: 'Sternman',
		previousBoats: [
			{ boatName: 'The Coastal Star', duration: '4 years' },
			{ boatName: 'The Sea Breeze', duration: '2 years' },
		],
		reliableTransportation: 'Yes',
		gearExperience: ['Singles', 'Pairs'],
		personalityType: 'Experienced and reliable',
		goals: 'To work on a boat with a good reputation.',
		fishingType: 'Scalloping',
	},
	{
		id: 7,
		name: 'Christopher Wilson',
		location: 'Portsmouth, NH',
		sternmanExperience: 1,
		thirdManExperience: 5,
		preferredPosition: '3rd Man',
		previousBoats: [
			{ boatName: 'The Granite State', duration: '3 years' },
			{ boatName: 'The Ocean Wind', duration: '2 years' },
		],
		reliableTransportation: 'Yes',
		gearExperience: ['5s', 'Pairs'],
		personalityType: 'Hardworking and dedicated',
		goals: 'To gain more experience and advance my career.',
		fishingType: 'Lobstering',
	},
	{
		id: 8,
		name: 'Ashley Garcia',
		location: 'Hartford, CT',
		sternmanExperience: 3,
		thirdManExperience: 3,
		preferredPosition: 'Either',
		previousBoats: [
			{ boatName: 'The Connecticut Clipper', duration: '2 years' },
			{ boatName: 'The River Queen', duration: '1 year' },
		],
		reliableTransportation: 'No',
		gearExperience: ['Trawls', '5s'],
		personalityType: 'Adaptable and eager to learn',
		goals: 'To find a position that offers stability and growth.',
		fishingType: 'Tuna Fishing',
	},
	{
		id: 9,
		name: 'Matthew Rodriguez',
		location: 'Bridgeport, CT',
		sternmanExperience: 7,
		thirdManExperience: 0,
		preferredPosition: 'Sternman',
		previousBoats: [
			{ boatName: 'The Sound Runner', duration: '5 years' },
			{ boatName: 'The Coastal Hunter', duration: '2 years' },
		],
		reliableTransportation: 'Yes',
		gearExperience: ['Singles', 'Pairs', 'Trawls'],
		personalityType: 'Experienced and reliable',
		goals: 'To work on a boat with a strong team.',
		fishingType: 'Groundfishing',
	},
	{
		id: 10,
		name: 'Brittany Williams',
		location: 'Provincetown, MA',
		sternmanExperience: 0,
		thirdManExperience: 6,
		preferredPosition: '3rd Man',
		previousBoats: [
			{ boatName: 'The Cape Codder', duration: '4 years' },
			{ boatName: 'The Bay Voyager', duration: '2 years' },
		],
		reliableTransportation: 'Yes',
		gearExperience: ['5s', 'Pairs'],
		personalityType: 'Hardworking and dedicated',
		goals: 'To gain more experience and advance my career.',
		fishingType: 'Scalloping',
	},
];

const LookingForWork = () => {
	return (
		<div>
			<h1>Looking For Work</h1>
			<ul>
				{sampleListings.map((listing) => (
					<li key={listing.id}>
						<Link href={`/profile/${listing.id}`}>
								<h2>{listing.name}</h2>
								<p>Location: {listing.location}</p>
								<p>Preferred Position: {listing.preferredPosition}</p>
								<p>Fishing Type: {listing.fishingType}</p>
								{/* Add more details here as needed */}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default LookingForWork;