import React from "react";
import "./Donation.scss";
import {Button, Col, Row} from "react-bootstrap";


export interface TDonationProps {
    locale: string;
}

function GetWhyDonateLink(locale:string)
{
  
    const supportedLanguageCodesInWeDontate: string[] = [
        "en",
        "de",
        "bg",
        "el",
        "de",
        "es",
        "it",
        "hu",
        "da",
        "pl",
        "sv",
        "fi",
        "nl",
        "ro",
        "pt",
        "sk",
        "fr",
        "hr",
        "cz",
        "uk",
    ];
    //if not supported by WeDontate, fall back to english
    if(!supportedLanguageCodesInWeDontate.includes(locale))
    {
        locale = "en";
    }
    return `https://whydonate.com/${locale}/donate/save-our-planet`
    
}
const Donation= (props: TDonationProps) => {


    const whyDontate = true;
    return whyDontate ?
        (<>
            <Button id="donate-button" className="btn btn--dark" onClick={() => {
                const width = window.innerWidth * 0.9;
                const height = window.innerHeight * 0.9;

                // Calculate the left position
                const left = window.innerWidth * 0.05;
                // Calculate the top position
                const top = window.innerHeight * 0.10;

                window.open(GetWhyDonateLink(props.locale), "newWindow", `width=${width}, height=${height}, left=${left}, top=${top}`);

            }}>Donate</Button>
        </>)
        :
        (<>

            <iframe className="gfm-embed-iframe gofundme"
                    src="https://www.gofundme.com/f/nrtaab-we-need-to-know/widget/medium/#:~:tcm-regime=GDPR&tcm-prompt=Hidden"
                    title="W3Schools Free Online Web Tutorials"></iframe>

        </>)

};


export default Donation