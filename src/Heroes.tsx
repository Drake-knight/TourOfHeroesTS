import HeroList from "./HeroList";
import useFetch from "./useFetch";
import Hero from "./Hero";

const Home: React.FC = (): JSX.Element => {
	const { error, isPending, data: heroes } = useFetch<Hero[]>("http://localhost:8000/heroes");

	return (
		<div className="home">
			{error && <div>{error}</div>}
			{isPending && <div>Loading...</div>}
			{heroes && <HeroList heroes={heroes} />}
		</div>
	);
};

export default Home;
