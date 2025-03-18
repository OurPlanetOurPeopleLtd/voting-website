import {Col, Row} from "react-bootstrap";
import {VoteControls} from "../components/VoteControls";
import {VoteResults} from "../components/VoteResults";
import React from "react";
import {getResultTranslation} from "../repositories/utils/extraTranslations";

export const VotingResultsFrame = ({questionId, locale}: { questionId: string, locale?: string }) => {
    return (<Row key={questionId}>
        <div className="frame">
            <div className="frame-content">
                <h2 id="results-heading">{getResultTranslation(locale ?? "en")}</h2>
                {/*<VoteControls questionId={questionId} showStatistics={true} allowVoting={false}/>*/}
                <Row style={{paddingTop: 20}}>
                    <Col></Col>
                    <Col> <VoteResults questionId={questionId} locale={locale}/></Col>
                    <Col></Col>
                </Row>

            </div>
        </div>

    </Row>)
}