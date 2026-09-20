import React, { useState, useEffect, FormEvent } from 'react';

import { recordUse } from './utils/analytics';
import { getUserGuid } from './repositories/utils/utilities';
import {fetchDataDato} from "./repositories/utils/graphQLfetch";

import {QueryResult} from "./repositories/utils/types";
import './PasswordGate.scss';

interface PasswordGateProps {
	children: React.ReactNode;
}


const STORAGE_KEY = 'site_unlocked';
const MAGIC_GUID = '43722bdd-325b-46e4-8c95-1fb95a784b5f'; 



const generatePassQuery = (pwd:string) =>
{
	const query = `query passwordQuery
					{
						passwordEntry(filter: { password: { eq: "${pwd}" } }) {
							password
						}					
					}
					`

	return query;
}


const datoPassword = async (pwd:string) =>
{

	const query = generatePassQuery( pwd);
	const result = await fetchDataDato<QueryResult<{passwordEntry:string}>>(query)

	return result?.data?.passwordEntry ?? false;
}

const PasswordGate: React.FC<PasswordGateProps> = ({ children }) => {
	const [input, setInput] = useState('');
	const [unlocked, setUnlocked] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	useEffect(() => {
		
		// Then, check the URL for the magic GUID
		const params = new URLSearchParams(window.location.search);
		const magicGuidInUrl = params.get('guid');

		if (magicGuidInUrl === MAGIC_GUID) {
			setUnlocked(true);
			localStorage.setItem(STORAGE_KEY, 'true');
		}
		else
		{
			const isUnlocked = localStorage.getItem(STORAGE_KEY) === 'true';
			setUnlocked(isUnlocked);
		}

	}, []);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		
		
		if (await datoPassword(input)) {
			localStorage.setItem(STORAGE_KEY, 'true');
			setUnlocked(true);

			if(input === "ChrisPepper")
			{
				return;
			}
			recordUse(
				{
					name: 'Password_Input',
					attributes: {
						enteredPassword: input,
						userGuid: getUserGuid(),
					},
				},
				getUserGuid(),
				true
			);
		} else {
			alert('Incorrect password.');
		}
	};

	if (unlocked) {
		return <>{children}</>;
	}

	return (
		<div className='password-gate'>
			<div>
				<h1>Our Planet Our People</h1>

				<form className='password-form' onSubmit={handleSubmit}>
					<div className='password-input-wrapper'>
						<label htmlFor='password'>Your password:</label>
						<div style={{ position: 'relative' }}>
							<input
								type={showPassword ? 'text' : 'password'}
								value={input}
								onChange={(e) => setInput(e.target.value)}
								id='password'
							/>
							<button
								type='button'
								onClick={() => setShowPassword(!showPassword)}
								style={{
									position: 'absolute',
									right: '8px',
									top: '50%',
									transform: 'translateY(-50%)',
									background: 'none',
									border: 'none',
									cursor: 'pointer',
									fontSize: '0.9rem',
								}}
								aria-label={
									showPassword
										? 'Hide password'
										: 'Show password'
								}
							>
								{showPassword ? 'Hide' : 'Show'}
							</button>
						</div>
					</div>

					<button className='btn' type='submit'>
						Enter
					</button>
				</form>
			</div>
		</div>
	);
};

export default PasswordGate;
