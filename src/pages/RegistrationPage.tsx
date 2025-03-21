import React, {useCallback, useEffect, useState} from "react";
import {DataStore} from "@aws-amplify/datastore";
import {User, Vote} from "../models";
import {localStorageVotingIdKey} from "../pages/VotingPage";
import {v4 as generateGuid} from "uuid";
import {recordUse} from "../utils/analytics";
import "./RegistrationPage.scss";
import {VideoControl} from "../components/VideoControl";
import { TVideoThumbnail} from "../repositories/Common/types";
import {getRegistrationPage} from "../repositories/Registration/request";

export type TRegistrationPage =
{
    title:string,
    subtitle:string,
    commentsLabel: string,
    submit: string,
    emailLabel: string,
    nameLabel: string
    mainVideo: TVideoThumbnail,
    emailValidation: string
    thankYou: string
}
export type TRegistrationProps =
{
    locale:string
}

export const RegistrationPage = ({locale}: TRegistrationProps) => {
    const [emailExistsError, setEmailExists] = useState(false);
    const [thankYouForRegister, setThankYouRegister] = useState(false);

    const fetchData = useCallback(async () => {     
        let dataFetched = await getRegistrationPage(locale);
        setData(dataFetched);
    }, [locale])
    
    useEffect(() => {
        fetchData().catch(console.error);
    }, [fetchData]);

    const [data, setData] = useState<TRegistrationPage | undefined>(undefined);
        
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
        
        // Analytics
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
    
    if(!data)
    {
        return <></>
    }

    return (
        <div>
            <div className="hero">
                <h1>{data.title}</h1>
                <p>{data.subtitle}</p>
                <VideoControl datoVideo={data.mainVideo}
                              fullScreenOnClick={false}></VideoControl>
                
            </div>

            {emailExistsError ? <div>{data.emailValidation}</div> : null }

            {
                thankYouForRegister ? <div>{data.thankYou}</div> :

                <form className="register-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">{data.nameLabel}:</label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email">{data.emailLabel}:</label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="comments">{data.commentsLabel}</label>

                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <div>
                        <button className="btn" type="submit">{data.submit}</button>
                    </div>
                </form>
            }
        </div>
    );
}