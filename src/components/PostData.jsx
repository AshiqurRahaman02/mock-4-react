import React, { useState } from "react";

const host = "https://plan-trip.onrender.com";

function PostData() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [destination, setDestination] = useState("");
	const [totalTravelers, setTotalTravelers] = useState(1);
	const [budget, setBudget] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const trip = {
				name,
				email,
				destination,
				totalTravelers,
				budget,
			};
			const response = await fetch(`${host}/trip/post`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(trip),
			});

			const data = await response.json();
			console.log(data);
			alert(data.message);

			setName("");
			setEmail("");
			setDestination("");
			setTotalTravelers(1);
			setBudget("");
		} catch (error) {
			console.error("Error posting trip:", error);
		}
	};

	return (
		<div className="div">
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="">Enter Trip Name</label><br />
					<input
						type="text"
						placeholder="Trip Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="">Enter Your Email</label><br />
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="">Choose Destination</label><br />
					<select
						value={destination}
						onChange={(e) => setDestination(e.target.value)}
					>
						<option value="">All</option>
						<option value="India">India</option>
						<option value="Africa">Africa</option>
						<option value="Europe">Europe</option>
						<option value="America">America</option>
					</select>
				</div>
				<div>
					<label htmlFor="">Enter Total Travelers</label><br />
					<input
						type="number"
						placeholder="Total Travelers"
						value={totalTravelers}
						onChange={(e) => setTotalTravelers(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="">Enter Budget Per Person</label><br />
					<input
						type="number"
						placeholder="Budget"
						value={budget}
						onChange={(e) => setBudget(e.target.value)}
					/>
				</div>
				<button type="submit">Post Trip</button>
			</form>
		</div>
	);
}

export default PostData;
