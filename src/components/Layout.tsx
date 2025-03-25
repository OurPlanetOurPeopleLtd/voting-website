import logo from "../logo.png";

import {Link, NavLink, Outlet} from "react-router-dom";
import '@aws-amplify/ui-react/styles.css';
import "./Layout.scss";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {footerComponentId, headerComponentId} from "../Routing";

import React, {PropsWithChildren, useEffect, useState} from "react";
import {CookieConsent, getCookieConsentValue} from "react-cookie-consent";

import {Analytics} from 'aws-amplify';

import {v4 as generateGuid} from "uuid";
import {DisableAnalytics, EnableAnalytics, recordUse} from "../utils/analytics";

import {localStorageVotingIdKey} from "../pages/VotingPage";
import {DynamicNavList} from "./DynamicNavList";
import {DynamicFooter} from "./DynamicFooter";
import {defaultLanguage} from "../languages";
import FlagSelect from "./FlagSelect";
import {Helmet} from "react-helmet-async";
import {getCookieBannerText} from "../repositories/utils/extraTranslations";


export interface ILayout extends PropsWithChildren
{
    locale:string;
    title:string;
}

export const LayoutTs = ({children, locale, title} : ILayout) => {
    
    
    const [expanded, setExpanded] = useState(false);
    const [analyticsEnabled, setAnalyticsEnabled] = useState(getCookieConsentValue("OurPeopleOurPlanetAnalyticsAcceptance") ?? false);
    
   
    const toggleExpanded = () => setExpanded(!expanded);

    const [cookieText, setCookieText] = useState(getCookieBannerText(locale));

    useEffect(() => {
            
        setCookieText(getCookieBannerText(locale));
    }, [locale])
  
    useEffect(() => {
        let userGuid = localStorage.getItem(localStorageVotingIdKey);
        if (!userGuid || userGuid.length < 1) {
            userGuid = generateGuid();
            localStorage.setItem(localStorageVotingIdKey, userGuid);
        }
        let trackingAttributes = {
            userId: userGuid
        }
           

        Analytics.autoTrack('pageView', {
            enable: analyticsEnabled,
            autoSessionRecord: analyticsEnabled,
            eventName: 'pageView',
            attributes: trackingAttributes,

            type: 'multiPageApp',
            provider: 'AWSPinpoint',

            getUrl: () => {
                // the default function
                return window.location.origin + window.location.pathname;
            }
        });


        recordUse({name: "Page_View", attributes: {page: window.location.pathname, userGuid}});
    }, [analyticsEnabled]);

    if (analyticsEnabled)
        EnableAnalytics()
    else
        DisableAnalytics();

    return (
        <>
            <Helmet>
                <title>{title ?? "Home"} - Our Planet Our People</title>
            </Helmet>

            <Navbar expanded={expanded} collapseOnSelect expand="lg" fixed="top">
                <Container style={{position: "relative"}}>
                    <Link to={`/${locale}`} className="navbar-brand">
                        <img
                            alt="Our Planet Our People"
                            src={logo}
                            onClick={() => {
                                setExpanded(false)
                            }}
                        />
                    </Link>

                    <Navbar.Toggle onClick={toggleExpanded} aria-controls="responsive-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="main-nav">
                            <DynamicNavList id={headerComponentId} locale={locale} onSelect={() => {
                                setExpanded(false)
                                return {}
                            }}></DynamicNavList>
                            
                            <div className="main-nav__language">
                                <FlagSelect currentLocale={locale ?? defaultLanguage}></FlagSelect>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <main>
                <Container>
                    {children}
                    <Outlet/>
                </Container>
            </main>

            <CookieConsent
                location="bottom"
                buttonText={cookieText.approveText}
                cookieName="OurPeopleOurPlanetAnalyticsAcceptance"
                declineButtonText={cookieText.declineText}
                expires={150}
                enableDeclineButton
                onDecline={() => {
                    setAnalyticsEnabled(false)
                }}
                onAccept={(acceptedByScrolling) => {
                    setAnalyticsEnabled(true)
                }}>
                <h2>{cookieText.headerText}</h2>           
                {cookieText.mainText}{" "}
                (<a style={{color:"grey"}} href={"Privacy"}>{cookieText.privacyLinkText}</a>)
            </CookieConsent>

            <DynamicFooter id={footerComponentId} locale={locale}></DynamicFooter>
        </>
    );
};


