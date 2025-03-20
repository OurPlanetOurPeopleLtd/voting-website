import {Col, Row} from "react-bootstrap";
import {VoteResults} from "../components/VoteResults";
import React from "react";
import {getResultTranslation} from "../repositories/utils/extraTranslations";

export const VotingResultsFrame = ({ locale}: {  locale?: string }) => {
    return (<Row key={`results-${locale}`}>
        <div className="frame">
            <div className="frame-content">
                <h2 id="results-heading">{getResultTranslation(locale ?? "en")}</h2>
                {/*<VoteControls questionId={questionId} showStatistics={true} allowVoting={false}/>*/}
                <Row style={{paddingTop: 20}}>
                    <Col></Col>
                    <Col> <VoteResults locale={locale}/></Col>
                    <Col></Col>
                </Row>

            </div>
        </div>

    </Row>)
}