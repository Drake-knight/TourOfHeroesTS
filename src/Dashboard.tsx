import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import Hero from "./Hero";
import React from "react";

const BlogDetails: React.FC = (): JSX.Element => {
	const { error, isPending, data: heroes } = useFetch<Hero[]>("http://localhost:8000/heroes");
	const topFourHero: Hero[] | undefined = heroes?.slice(0, 4);

	return (
		<div className="hero-details">
			{isPending && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{topFourHero && (
				<div className="hero-list">
					<p>My top four Heroes</p>
					{topFourHero.map((hero) => (
						<Link className="link" to={`/change/${hero.id}`}>
							<div className="hero-preview" key={hero.id}>
								<h2>{hero.name}</h2>
							</div>
						</Link>
					))}
					;
				</div>
			)}
		</div>
	);
};

export default BlogDetails;
