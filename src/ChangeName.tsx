import React, { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Hero from "./Hero";

const ChangeName: React.FC = (): JSX.Element => {
	const { id } = useParams();
	const { error, isPending, data: hero } = useFetch<Hero>(`http://localhost:8000/heroes/${id}`);

	const [name, setName] = useState<string>("");
	const history = useNavigate();
	const [putError, setPutError] = useState<string | null>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const updatedName = { name };

		try {
			const response = await fetch(`http://localhost:8000/heroes/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedName),
			});
			if (!response.ok) {
				throw new Error("Failed to update  name");
			}
			history(-1);
		} catch (err: any) {
			setPutError(err.message);
		}
	};

	if (isPending) {
		return <div>Loading......</div>;
	}

	if (putError) {
		return <div>{putError}</div>;
	}

	return (
		<div className="change-name">
			<h2>Change name of {hero?.name}</h2>
			{
				<form onSubmit={handleSubmit}>
					<label>New Name:</label>
					{error && <div>{error}</div>}
					<input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
					{!isPending && <button>Change Name</button>}
					{isPending && <button disabled>Changing</button>}
				</form>
			}
		</div>
	);
};

export default ChangeName;
