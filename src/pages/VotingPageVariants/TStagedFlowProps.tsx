
import {Video} from "react-datocms/dist/types/VideoPlayer";
import {Choice} from "../../models";
import {TQuestionBlock} from "../../repositories/Navigation/types";
import {StructuredTextDocument} from "react-datocms";
import {TVideos, TVotingPage } from "../../repositories/VotingPage/model";

export interface TStagedFlowProps extends TVotingPage {
    locale: string;
    
    videos?: TVideos;
    watchedCallBack?: () => void,
    mainVideo: { id: string, video: Video };
    shareHeading: string;
    landingHeading?: string;
    votingHeading?: string;
    thanksHeading?: string;
    resultsHeading?: string;
    shareSubHeading: string;

    voteResultCallBack?: (voted: boolean) => void,
    voteChangedCallBack?: (choice: Choice) => void,

    questions?: TQuestionBlock[];
    donateText?: { value: StructuredTextDocument };
    openingText?: { value: StructuredTextDocument };
    
    
    forceStage?: string;
}