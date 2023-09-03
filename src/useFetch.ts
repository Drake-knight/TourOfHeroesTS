import { useState, useEffect } from "react";

const useFetch = <T>(url: string): { data: T | null; isPending: boolean; error: string | null } => {
	const [data, setData] = useState<T | null>(null);
	const [isPending, setIsPending] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const abortCont = new AbortController();

		setTimeout(() => {
			const getData = async () => {
				try {
					const response = await fetch(url);
					if (!response.ok) {
						throw new Error("Failed to fetch data");
					}
					const data = await response.json();
					setData(data);
					setIsPending(false);
					setError(null);
				} catch (err: any) {
					setError(err.message);
					setIsPending(false);
				}
			};

			getData();
		}, 500);

		return () => abortCont.abort();
	}, [url]);
	return { data, isPending, error };
};

export default useFetch;
