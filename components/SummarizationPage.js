"use client";
import React, { useState } from "react";
import axios from "axios";

const SummarizationPage = () => {
	const [value, setValue] = useState("");
	const [data, setData] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handlesubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const response = await axios.post("/api/summarize", { text: value });
			setSubmitting(false);
			setData(response.data.summary);
		} catch (error) {
			setSubmitting(false);
			console.error("Error:", error);
		}
	};

	return (
		<div className="w-full bg-[#0f172a] h-full min-h-[100vh] py-4 px-4 md:px-20">
			<div className="w-full">
				<div className="flex flex-col items-center justify-center mt-4 p-4">
					<h1 className="text-3xl text-white text-center leading-10 font-semibold">
						Summarize Text with
						<br />
						<span className="text-5xl font-bold text-cyan-500">eSum</span>
					</h1>
					<p className="mt-5 text-lg text-gray-500 sm:text-xl text-center max-w-2xl">
						Paste your text below!
					</p>
				</div>

				<div className="flex flex-col w-full items-center justify-center mt-5">
					<textarea
						placeholder="Paste doc content here ..."
						rows={6}
						className="block w-full md:w-[650px] rounded-md border border-slate-700 bg-slate-800 p-2 text-sm shadow-lg font-medium text-white focus:border-gray-500 focus:outline-none focus:ring-0"
						onChange={(e) => setValue(e.target.value)}
					></textarea>

					{value.length > 0 &&
						(submitting ? (
							<p className="text-md text-cyan-500 mt-5">Please wait ....</p>
						) : (
							<button
								className="mt-5 bg-blue-500 px-5 py-2 text-white text-md font-medium cursor-pointer rounded-md"
								onClick={handlesubmit}
							>
								Submit
							</button>
						))}
				</div>

				<div className="mt-10 text-center flex flex-col w-full items-center justify-center">
					<h1 className="text-3xl text-white text-center leading-10 font-semibold">
						Summarized Text
					</h1>
					<p className="mt-5 text-lg text-gray-500 sm:text-xl text-center max-w-2xl">
						{data}
					</p>
				</div>
			</div>
		</div>
	);
};

export default SummarizationPage;
