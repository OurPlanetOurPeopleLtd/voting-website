import {Choice, Vote} from "../models";
import {DataStore} from "@aws-amplify/datastore";
import React, {useEffect, useState} from "react";
import {getCountryList} from "../repositories/utils/country";
import {Doughnut} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Tooltip} from 'chart.js';
import {Col, Row} from "react-bootstrap";
import {
    getCountryResultsTranslation,
    getNoTranslation,
    getYesTranslation
} from "../repositories/utils/extraTranslations";

import "./VoteResults.scss";

export const VoteResults = ({ locale}: {locale?: string }) => {
    const [yesVotes, setYesVotes] = useState(0);
    const [noVotes, setNoVotes] = useState(0);
    const yesText = getYesTranslation(locale ?? "en");
    const noText = getNoTranslation(locale ?? "en");
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(countries[event.target.value]);
    };

    useEffect(() => {
        async function fetchVotes(country: string | undefined) {
            const no = (await DataStore.query(Vote, (v) => v.and(v => [v.choice.eq(Choice.NO),  country ? v.country.eq(country) : v.country.notContains(null)]))).length;
            const yes = (await DataStore.query(Vote, (v) => v.and(v => [v.choice.eq(Choice.YES), country ? v.country.eq(country) : v.country.notContains(null)]))).length;
            setYesVotes(yes);
            setNoVotes(no);
        }

        if (selectedCountry === "All") {           
            //get all votes
            fetchVotes(undefined);
        } else {            
            fetchVotes(selectedCountry);
        }
    }, [selectedCountry]);

    ChartJS.register(ArcElement, Tooltip); // Register required elements

    const chartData = {
        datasets: [
            {
                data: [noVotes, yesVotes],
                backgroundColor: ['#6ea296', '#217293'],
                hoverBackgroundColor: ['#a4c5be', '#57b3d9'],

            },
        ],
        labels: [noText, yesText],

    };

    const chartOptions = {}
    interface Country {
        [code: string]: string;
    }

    const countries: Country = getCountryList();
    const [isHovered, setIsHovered] = useState(false);

    return (<div className={"vote-results"}>
        <Row style={{paddingBottom: 20}}>
            <Col>
                <div className="select-wrap">
                    <label htmlFor="results-country-list" className="visually-hidden">Select Country results to show</label>
                    <select id="results-country-list" value={""} onChange={handleCountryChange}>
                        {selectedCountry ?
                            <>
                                <option
                                    value={selectedCountry}> {`${selectedCountry} Results`}</option>
                                <option
                                    value={undefined} key={"All"}>All Countries
                                </option>
                            </> :
                            <option
                                value={undefined}> {getCountryResultsTranslation(locale ?? "en")}</option>}


                        {Object.entries(countries).map(([countryCode, countryName]) => {
                            if (selectedCountry !== countryCode) {
                                return (<option key={countryCode} value={countryCode}>
                                    {countryName}
                                </option>)
                            }
                        })}
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32" aria-hidden="true" fill="#fff"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
                </div>
            </Col>

        </Row>
        <Row>
            <Col>
                <label htmlFor="NoVotes">{yesText}</label>
                <div id="NoVotes">{yesVotes}</div>
            </Col>
            <Col>
                <label htmlFor="NoVotes">{noText}</label>
                <div id="NoVotes">{noVotes}</div>
            </Col>
        </Row>
        <Row>
            <Col>
                <div className={"chart-container"} data-hovered={isHovered.toString()}>
                    <Doughnut className={"chart"} data={chartData} options={chartOptions}
                              data-hovered={isHovered.toString()} onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}/>

                </div>

            </Col>
        </Row>


    </div>)
}