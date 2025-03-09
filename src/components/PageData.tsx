import {ReactNode} from "react";
import Donation from "./Donation";
import { SharingControls } from "./SharingControls";

export interface TPage {
    header: string;
    heroImageUrl?: string;
    heroImageAltText?: string;
    richText: ReactNode;
    includeDonateButton?: boolean;
}

export const PageData = (data: TPage) => {

    const includeDonateButton =data.includeDonateButton;
    const styleClass = data.heroImageUrl ? "heroWithImage" : "hero";
    return (
        <>
            <div className={includeDonateButton ? "donate-container" : ""}>
                <div className={includeDonateButton ? "donate-container__content" : ""}>
                    <div className={styleClass}>
                        <h1>{data.header}</h1>
                        {data.heroImageUrl ? (
                            <img src={data.heroImageUrl} alt={data.heroImageAltText}></img>
                        ) : null}
                    </div>

                    <div>{data.richText ? data.richText : <p>...</p>}</div>
                    {includeDonateButton ? <Donation></Donation> : null}
                </div>

                {includeDonateButton && (
                    <div className="donate-container__share">
                        <h2>And/or share via social media</h2>
                        <SharingControls />
                    </div>
                )}
            </div>
        </>
    );
}