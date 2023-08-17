import React, { useState, useEffect } from "react";

const host = "https://plan-trip.onrender.com";

function RetrieveData() {
	const [displayData, setDisplayData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [sortOrder, setSortOrder] = useState("asc");

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch(`${host}/trip/retrieve`);
			const data = await response.json();
			setDisplayData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await fetch(`${host}/trip/delete/${id}`, { method: "DELETE" });
            alert("The trip has been deleted")
			fetchData();
		} catch (error) {
			console.error("Error deleting data:", error);
		}
	};

	const handleFilter = async (value) => {
		if (value === "") {
			fetchData();
		} else {
			try {
				const response = await fetch(
					`${host}/trip/filter?destination=${value}`
				);
				const data = await response.json();
				setDisplayData(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
	};

	const handleSort = async (value) => {
		if (value === "") {
			fetchData();
		} else {
			try {
				const response = await fetch(`${host}/trip/sort?sort=${value}`);
				const data = await response.json();
				setDisplayData(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
	};

	return (
		<div className="div">
			<h2>All Trips</h2>
			<div className="fs">
				<div>
					<label htmlFor="">Filter by Destination:</label>
					<select
						name=""
						id=""
						onChange={(e) => handleFilter(e.target.value)}
					>
						<option value="">All</option>
						<option value="India">India</option>
						<option value="Africa">Africa</option>
						<option value="Europe">Europe</option>
						<option value="America">America</option>
					</select>
				</div>
				<div>
					<label htmlFor="">Sort by Budget:</label>
					<select
						name=""
						id=""
						onChange={(e) => handleSort(e.target.value)}
					>
						<option value="">All</option>
						<option value="asc">Budget: Low to High</option>
						<option value="desc">Budget: High to Low</option>
					</select>
				</div>
			</div>
			<div className="main">
				{displayData.length ? (
					displayData.map((trip) => (
						<div key={trip._id}>
							<h3>{trip.name}</h3>
							<p>Email: {trip.email}</p>
							<p>Destination: {trip.destination}</p>
							<p>Total Travelers: {trip.totalTravelers}</p>
							<p>Budget: {trip.budget}</p>
							<button onClick={() => handleDelete(trip._id)}>
								Delete
							</button>
						</div>
					))
				) : (
					<h3>No Trip Available</h3>
				)}
			</div>
		</div>
	);
}

export default RetrieveData;
