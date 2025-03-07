import React, {useEffect, useState} from "react";
import { Col, Row } from "react-bootstrap";
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaShareAlt,
} from "react-icons/fa";
import {InlineShareButtons} from 'sharethis-reactjs';

import "./SharingControls.scss";

export interface ISharingControls {
    voted: boolean;
    shareHeading: string;
    shareSubHeading?: string;
    shareButtonText?: string;
    className?: string;
    mainQuestionText?: string;
}

export const SharingControls = ({shareHeading, shareSubHeading, mainQuestionText}: ISharingControls) => {
    const [linkAdded, setLinkAdded] = useState(false);
    const logoUrl = "https://ourplanetourpeople.com/logo.png";
    useEffect(() => {
        if (linkAdded)
            return;

        const copyLink = document.getElementById('copy-link') as HTMLLinkElement;
        if (!copyLink)
            return;

        copyLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Get the link's href attribute
            const link = copyLink.href;

            navigator.share({
                url: link,
                title: mainQuestionText,
                text: `Please vote! ${logoUrl}`
            })

        });
        setLinkAdded(true);
    })

    function record(text: string) {
    }

    const openSocialWindow = (url: string) => {
        const left = (window.screen.width - 570) / 2;
        const top = (window.screen.height - 570) / 2;
        const params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
        window.open(url, "NewWindow", params);
    };

    const handleShare = (platform: string) => {
        const pageUrl = encodeURIComponent(window.location.href);
        let url = "";

        switch (platform) {
            case "facebook":
                url = `https://www.facebook.com/sharer.php?u=${pageUrl}`;
                break;

            case "twitter":
                url = `https://twitter.com/intent/tweet?url=${pageUrl}&text=Check this out!`;
                break;

            case "linkedin":
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
                break;

            default:
                return;
        }

        openSocialWindow(url);
    };



    return (
        <>
            <Row className={"verticalFrameCentre justify-content-center"}>
                <h2>{shareHeading}</h2>
            </Row>

            <Row>
             
                        <InlineShareButtons
                            config={{
                                alignment: 'center',  // alignment of buttons (left, center, right)
                                color: 'social',      // set the color of buttons (social, white)
                                enabled: true,        // show/hide buttons (true, false)
                                font_size: 16,        // font size for the buttons
                                labels: 'cta',        // button labels (cta, counts, null)
                                language: 'en',       // which language to use (see LANGUAGES)
                                networks: [           // which networks to include (see SHARING NETWORKS)
                                    'whatsapp',                                    
                                    'facebook',
                                    'twitter',
                                    'linkedin',
                                    'messenger',
                                ],
                                padding: 12,          // padding within buttons (INTEGER)
                                radius: 4,            // the corner radius on each button (INTEGER)
                                show_total: true,
                                size: 40,             // the size of each button (INTEGER)

                                // OPTIONAL PARAMETERS
                              //  url: 'https://www.sharethis.com', // (defaults to current url)
                           //     image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
                            //    description: 'custom text',       // (defaults to og:description or twitter:description)
                            //    title: 'custom title',            // (defaults to og:title or twitter:title)
                                message: 'custom email text',     // (only for email sharing)
                                subject: 'custom email subject',  // (only for email sharing)
                                username: 'custom twitter handle' // (only for twitter sharing)
                            }}
                        />
            
            </Row>
        </>
    )
}