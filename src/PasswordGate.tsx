import React, { useState, useEffect, FormEvent } from "react";

import { recordUse } from "./utils/analytics";
import { getUserGuid } from "./repositories/utils/utilities";

import "./PasswordGate.scss";
interface PasswordGateProps {
	children: React.ReactNode;
}

const PASSWORDS = ["!1/#gn2qEm4.FVkSi33uM1>", "JamesBateson", "PatrickGardner", "DavidKing", "CarwynJones", "ChrisPepper"];
const STORAGE_KEY = "site_unlocked";

const PasswordGate: React.FC<PasswordGateProps> = ({ children }) => {
const [input, setInput] = useState("");
const [unlocked, setUnlocked] = useState<boolean>(false);

useEffect(() => {
	const isUnlocked = localStorage.getItem(STORAGE_KEY) === "true";
	setUnlocked(isUnlocked);
}, []);

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
	e.preventDefault();

	if (PASSWORDS.includes(input)) {
		localStorage.setItem(STORAGE_KEY, "true");
		setUnlocked(true);

		recordUse({
			name: "Password_Input",
			attributes: {
				enteredPassword: input,
				userGuid: getUserGuid()
			}
		},getUserGuid(),true)
	} else {
		alert("Incorrect password.");
	}
};

if (unlocked) {
	return <>{children}</>;
}

return (
	<div className="password-gate">
		<div>
			<h1>Our Planet Our People</h1>

			<form className="password-form" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						id="password"
					/>
				</div>

				<button  className="btn" type="submit">Enter</button>
			</form>
		</div>
	</div>
	);
};

export default PasswordGate;
