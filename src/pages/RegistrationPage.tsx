import "./RegistrationPage.scss";
import React, {useState} from "react";
import {DataStore} from "@aws-amplify/datastore";
import {User, Vote} from "../models";
import {localStorageVotingIdKey} from "../pages/VotingPage";
import {v4 as generateGuid} from "uuid";
import {recordUse} from "../utils/analytics";
export const RegistrationPage = () => {

    const [emailExistsError, setEmailExists] = useState(false);
    const [thankYouForRegister, setThankYouRegister] = useState(false);
  
    const Deregister = async (email:string) => {
        const existingUser = await DataStore.query(User, (v) => v.and(v => [v.email?.eq(email)]))
        const aExistingUser = existingUser.shift();
        const idAlreadyExists = !!aExistingUser;
        if(!idAlreadyExists)
            return;
        await DataStore.delete(aExistingUser);
    }
    const SaveUserToDB = async (name:string, email:string, comment:string) => {
        let localGuid = localStorage.getItem(localStorageVotingIdKey);

        if (!localGuid) {
            localGuid = generateGuid();
            localStorage.setItem(localStorageVotingIdKey, localGuid);
        }

        
        const existingUser = await DataStore.query(User, (v) => v.and(v => [v.email?.eq(email)]))
        const aExistingUser = existingUser.shift();
        const idAlreadyExists = !!aExistingUser;
     

        if (idAlreadyExists) {
            setEmailExists(true);
            return;
        } 
        
        /// Analytics
        try {
            recordUse({
                name: 'Registered',
                immediate: true,
                // Attribute values must be strings
                attributes: {
                    email: email, voterId: localGuid.toString(), name: name
                }
            }, localGuid)
        } catch (e) {

            console.log(e);
        }
        
        // Save to database
        await DataStore.save(
            new User({email: email, voterId: localGuid, name: name, comment: comment})
        ).then((x) => {
            setThankYouRegister(true)
        });
        
    };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        SaveUserToDB(name,email,comment);
    };

    return (
        <div>
            {emailExistsError ? <div>email already exists </div> : null }
            {thankYouForRegister ? <div>Thank you for registering</div> :
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
            />
            <br />
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
            />
            <br />
            <button type="submit">Submit</button>
        </form>}
            
        </div>
    );
}