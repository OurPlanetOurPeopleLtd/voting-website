import React, {useEffect, useState} from "react";
import Donation from "../../components/Donation";
import {SharingControls} from "../../components/SharingControls";
import {TVotingPageExtended} from "../VotingPage";
import {Button, Container, Fade} from "react-bootstrap";
import {QuestionComponent} from "../../components/QuestionComponent";
import {Choice} from "../../models";
import {StructuredText} from "react-datocms";
import {TStagedFlowProps} from "./TStagedFlowProps";
import {VideoControl} from "../../components/VideoControl";
import {VideoWithReference} from "../VideoWithReference";
import {getReferences} from "../../repositories/References/request";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getNextTranslation, getTranslation} from "../../repositories/utils/extraTranslations";
import HubComponent from "../../components/HubComponent";

import cryingEarth from "../../crying-earth.png";
import "../VotingPage.scss";

export const StagedFlow = (props: TStagedFlowProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const stageAsString = props.forceStage ? props.forceStage : searchParams.get("stage");
    const stageFromUrl = stageAsString ? parseInt(stageAsString) : undefined;

    const [stage, setStage] = useState(stageFromUrl?? 0);

    useEffect(() => {
        if(props.forceStage)
            setStage(parseInt(props.forceStage))
    }, [props.forceStage]);
   
    const totalQuestions = 1;//(props.questions?.length ?? 0); (todo decide if we are making this dynamic)   
       
    const openingStage = 0;
    const hubStage = 1
    const questionStage = 2;    
    const videoStage = questionStage + totalQuestions;
    const shareStage = videoStage + 1;
    const detailStage = shareStage + 1;
    const donateStage = detailStage + 1;
    const totalStages = donateStage+1; // Number of steps in the flow
    
    const updateSearchParams = (newStage: number): number => {
        
        if(newStage == shareStage) //todo use the query to do this
        {
                
            navigate(`/${props.locale}/share`);
            return shareStage
        }
        if(newStage === questionStage) //todo use the query to do this
        {

            navigate(`/${props.locale}/voting`);
            return shareStage
        }
        searchParams.set("stage", newStage.toString());
        setSearchParams({  stage: newStage.toString() });
        return newStage;
    };
    
    const nextStage = () => setStage((prev) => updateSearchParams(Math.min(prev + 1, totalStages - 1)));
    const originalVoteCallback = props.voteChangedCallBack;
    
    const questionOne = props.questions && props.questions.length >= 1 ? props.questions[0] : null;

    //add additional call to the callback
    const extendedVoteCallback = (voted: Choice) => {
        originalVoteCallback?.(voted); // Call the original function if it exists
         nextStage(); // Call the additional function
    };

    if(!questionOne) {
        console.log("no questions")
        return ( <></>);
    }

    return (
        <Container className={`frame ${stage === hubStage ? 'hub-page' : ''}`} style={{ position: "relative" }}>
                <div>
                    <div className="frame-content vote-controls">
                        {/* Stage Video */}
                        <Fade in={stage === videoStage} unmountOnExit>
                            <div className="thank-you-content">
                                <div className="frame__intro">
                                    <h1>{props.thanksHeading}</h1>
                       
                                    <p>
                                        {getTranslation(props.locale, "videoPrompt")}{" "}
                                        <button onClick={nextStage}>
                                            {getTranslation(props.locale, "shareButton")}
                                        </button>
                                        .
                                    </p>
                                    
                                    <p>
                                        {getTranslation(props.locale, "orFindOutMore")}{" "}
                                        <a href="/in-depth">
                                            {getTranslation(props.locale, "inDepthLink")}
                                        </a>{"."}
                                    </p>
                                </div>

                                <div className={"verticalFrameCentre"}>
                                    <VideoControl locale={props.locale} fullScreenOnClick={true}
                                                  datoVideo={props.videos?.thankYouVideo?.video?.video}
                                                  onFinish={() => {
                                                      if (props.watchedCallBack) props.watchedCallBack();
                                                nextStage();
                                            }} 
                                            videoThumbnail={props.videos?.thankYouVideo.thumbnailImage?.responsiveImage.src}/>
                                </div>
                            </div>
                        </Fade>

                        <Fade in={stage === openingStage} unmountOnExit>
                            <div className="landing-content">
                                <div className={"verticalFrameCentre landing-content__text"}>
                                    <h1 className="frame__heading">{props.landingHeading}</h1>

                                    <div style={{fontSize:"1.2rem"}}>
                                        <StructuredText data={props.openingText}/>
                                    </div>
                                    
                                    <Button className="btn btn--white" onClick={nextStage}>{getNextTranslation(props.locale)}</Button>
                                </div>

                                <div className="landing-content__image">
                                    <img src={cryingEarth} alt="" />
                                </div>
                            </div>
                        </Fade>

                        <Fade in={stage === hubStage} unmountOnExit>
                            <div>
                                <HubComponent />
                            </div>
                        </Fade>

                        {/* Stage Questions */}
                        <Fade in={stage === questionStage } unmountOnExit>
                            <div className={"vote-controls question-controls"}>
                                <div className={"contentColumn"}>
                                    <h1 className="frame__heading" style={{paddingLeft: "1rem"}}>{props.votingHeading}</h1>
                                    <QuestionComponent {...props} {...questionOne} voteChangedCallBack={extendedVoteCallback}/>
                                </div>
        
                                <div className={"videoColumn voteVideo"}>
                                    <VideoControl locale={props.locale} fullScreenOnClick={true}
                                                datoVideo={ props.videos?.prop1?.video?.video  }
                                                leftShift={-50}
                                                videoThumbnail={ props.videos?.prop1.thumbnailImage?.responsiveImage.src} />
                               
                                </div>
                            </div>
                        </Fade>
                
                        {/* Stage: Sharing */}
                        <Fade in={stage === shareStage} unmountOnExit>
                            <div>
                                <div>
                                    <SharingControls voted={true} shareHeading={props.shareHeading} shareSubHeading={props.shareSubHeading} shareButtonText="Share Now" />
                                </div>
                            </div>
                        </Fade>

                        {/* Stage Details */}
                        <Fade in={stage === detailStage} unmountOnExit>
                            <div>
                                <div className={"verticalFrameCentre"}>
                                    <VideoWithReference
                                        references={getReferences( props.videos?.detailVideo?.video.id, "en")}
                                        locale={props.locale}
                                        fullScreenOnClick={true}
                                        datoVideo={props.videos?.detailVideo?.video?.video}
                                        onFinish={() => {
                                            if (props.watchedCallBack)
                                                props.watchedCallBack();
                                            nextStage();
                                        }}
                                        videoThumbnail={props.videos?.detailVideo.thumbnailImage?.responsiveImage.src}
                                        currentTimeStamp={0}/>
                                </div>
                            </div>
                        </Fade>
                        
                        {/* Stage: Donation */}
                        <Fade in={stage === donateStage} unmountOnExit>
                            <div>                           
                                <div className={"verticalFrameCentre"}>
                                    <div>
                                        <div style={{textAlign: "center" }}>
                                            <StructuredText data={props.donateText}/>
                                        </div>
                                        <Donation locale={props.locale}/>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
        </Container>
    );
};

export const VotingPageMainJourney = (props: TVotingPageExtended) => {


    return (
        <>
           <StagedFlow {...props}></StagedFlow>
        </>
    );
};
