import React, { useEffect, useRef, useState } from 'react';
import Donation from '../../components/Donation';
import { SharingControls } from '../../components/SharingControls';
import { Container, Fade } from 'react-bootstrap';
import { QuestionComponent } from '../../components/QuestionComponent';
import { Choice } from '../../models';
import { StructuredText } from 'react-datocms';
import { TStagedFlowProps } from './TStagedFlowProps';
import { VideoControl } from '../../components/VideoControl';
import { VideoWithReference } from '../VideoWithReference';
import { DialogModal, DialogModalRef } from '../../components/DialogModal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
	getNextTranslation,
	getSummaryTranslation,
	getDetailTranslation,
	getTranslation, getLandingSummaryTranslation,
} from '../../repositories/utils/extraTranslations';
import { TVotingPageExtended } from '../../repositories/VotingPage/model';

import cryingEarth from '../../crying-earth.webp';
import '../VotingPage.scss';

export const StagedFlow = (props: TStagedFlowProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const stageAsString = props.forceStage
		? props.forceStage
		: searchParams.get('stage');
	const stageFromUrl = stageAsString ? parseInt(stageAsString) : undefined;

	const [stage, setStage] = useState(stageFromUrl ?? 0);

	useEffect(() => {
		if (props.forceStage) setStage(parseInt(props.forceStage));
	}, [props.forceStage]);

	// State to track which modal/dialog is open or none
	const [openDialog, setOpenDialog] = useState<null | 'summary' | 'members'>(
		null
	);

	// Create refs for each DialogModal instance
	const summaryModalRef = useRef<DialogModalRef>(null);
	const membersModalRef = useRef<DialogModalRef>(null);

	// When modal closes, call pause() on all videos for safety
	useEffect(() => {
		if (openDialog === null) {
			// Only reset modal videos
			if (summaryModalRef.current?.resetVideo)
				summaryModalRef.current.resetVideo();
			if (membersModalRef.current?.resetVideo)
				membersModalRef.current.resetVideo();
		}
	}, [openDialog]);

	const totalQuestions = 1; //(props.questions?.length ?? 0); (todo decide if we are making this dynamic)

	const openingStage = 0;
	const questionStage = 1;
	const videoStage = questionStage + totalQuestions;
	const shareStage = videoStage + 1;
	const detailStage = shareStage + 1;
	const donateStage = detailStage + 1;
	const totalStages = donateStage + 1; // Number of steps in the flow

	const updateSearchParams = (newStage: number): number => {
		if (newStage === shareStage) {
			//todo use the query to do this
			navigate(`/${props.locale}/share`);
			return shareStage;
		}

		if (newStage === questionStage) {
			//todo use the query to do this
			navigate(`/${props.locale}/voting`);
			return shareStage;
		}

		searchParams.set('stage', newStage.toString());
		setSearchParams({ stage: newStage.toString() });
		return newStage;
	};

	const nextStage = () =>
		setStage((prev) =>
			updateSearchParams(Math.min(prev + 1, totalStages - 1))
		);
	const originalVoteCallback = props.voteChangedCallBack;

	const questionOne =
		props.questions && props.questions.length >= 1
			? props.questions[0]
			: null;

	//add additional call to the callback
	const extendedVoteCallback = (voted: Choice) => {
		originalVoteCallback?.(voted); // Call the original function if it exists
		nextStage(); // Call the additional function
	};

	if (!questionOne) {
		console.log('no questions');
		return <></>;
	}

	return (
		<Container className='frame' style={{ position: 'relative' }}>
			<div>
				<div className='frame-content vote-controls'>
					{/* Stage Video */}
					<Fade in={stage === videoStage} unmountOnExit>
						<div className='thank-you-content'>
							<div className='frame__intro'>
								<h1>{props.thanksHeading}</h1>

								<p>
									{getTranslation(
										props.locale,
										'videoPrompt'
									)}{' '}
									<button onClick={nextStage}>
										{getTranslation(
											props.locale,
											'shareButton'
										)}
									</button>
									.
								</p>
							</div>
						</div>
					</Fade>

					<Fade in={stage === openingStage} unmountOnExit>
						<div className='landing-content'>
							<div
								className={
									'verticalFrameCentre landing-content__text'
								}
							>
								<h1 className='frame__heading'>
									{props.landingHeading}
								</h1>

								<div style={{ fontSize: '0.95rem' }}>
									<StructuredText data={props.openingText} />
								</div>

								<div className='landing-content__buttons'>
									{props.videos?.summaryVideo && (
										<div>
											<button
												onClick={() =>
													setOpenDialog('summary')
												}
												className='btn btn--white'
											>
												{getLandingSummaryTranslation(
													props.locale, "videoSummary"
												)}
											</button>
											
	

											<DialogModal
												ref={summaryModalRef}
												open={openDialog === 'summary'}
												onClose={() =>
													setOpenDialog(null)
												}
											>
												<VideoControl
													isOpen={
														openDialog === 'summary'
													}
													fullScreenOnClick={true}
													datoVideo={
														props.videos
															?.summaryVideo
															?.video?.video
													}
													videoThumbnail={
														props.videos
															?.summaryVideo
															?.thumbnailImage
															?.responsiveImage
															.src
													}
													locale={props.locale}
													onFinish={() =>
														setOpenDialog(null)
													}
												/>
											</DialogModal>
										</div>
									)}


									{props.videos?.membersVideo && (
										<div>


											<DialogModal
												ref={membersModalRef}
												open={openDialog === 'members'}
												onClose={() =>
													setOpenDialog(null)
												}
											>
												<VideoControl
													isOpen={
														openDialog === 'members'
													}
													fullScreenOnClick={true}
													datoVideo={
														props.videos
															?.membersVideo
															?.video?.video
													}
													videoThumbnail={
														props.videos
															?.membersVideo
															?.thumbnailImage
															?.responsiveImage
															.src
													}
													locale={props.locale}
													onFinish={() =>
														setOpenDialog(null)
													}
												/>
											</DialogModal>
										</div>
									)}
								</div>
							</div>

							<div className='landing-content__image'>
								<img
									src={cryingEarth}
									alt=''
									width='528'
									height='528'
									fetchPriority='high'
								/>
							</div>
						</div>
					</Fade>

					{/* Stage Questions */}
					<Fade in={stage === questionStage} unmountOnExit>
						<div className={'vote-controls question-controls'}>
							<div className={'contentColumn'}>
								<h1
									className='frame__heading'
									style={{ paddingLeft: '1rem' }}
								>
									{props.votingHeading}
								</h1>
								<QuestionComponent
									{...props}
									{...questionOne}
									voteChangedCallBack={extendedVoteCallback}
								/>
							</div>

							<div className={'videoColumn voteVideo'}>
								<VideoControl
									locale={props.locale}
									fullScreenOnClick={true}
									datoVideo={
										props.videos?.prop1?.video?.video
									}
									leftShift={-50}
									videoThumbnail={
										props.videos?.prop1.thumbnailImage
											?.responsiveImage.src
									}
								/>
							</div>
						</div>
					</Fade>

					{/* Stage: Sharing */}
					<Fade in={stage === shareStage} unmountOnExit>
						<div>
							<div>
								<SharingControls
									voted={true}
									shareHeading={props.shareHeading}
									shareSubHeading={props.shareSubHeading}
									shareButtonText='Share Now'
								/>
							</div>
						</div>
					</Fade>

					{/* Stage Details */}
					<Fade in={stage === detailStage} unmountOnExit>
						<div>
							<div className={'verticalFrameCentre'}>
								<VideoWithReference
									references={[]}
									locale={props.locale}
									fullScreenOnClick={true}
									datoVideo={
										props.videos?.detailVideo?.video?.video
									}
									onFinish={() => {
										if (props.watchedCallBack)
											props.watchedCallBack();
										nextStage();
									}}
									videoThumbnail={
										props.videos?.detailVideo.thumbnailImage
											?.responsiveImage.src
									}
									currentTimeStamp={0}
								/>
							</div>
						</div>
					</Fade>

					{/* Stage: Donation */}
					<Fade in={stage === donateStage} unmountOnExit>
						<div>
							<div className={'verticalFrameCentre'}>
								<div>
									<div style={{ textAlign: 'center' }}>
										<StructuredText
											data={props.donateText}
										/>
									</div>
									<Donation locale={props.locale} />
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
