import { TVideoThumbnail} from "../Common/types";

export interface QueryResult {
    data: Data;
    errors: [];
}

export interface Data {
    registrationPage: TRegistrationItem
}

export type TRegistrationItem = {
    title:string,
    commentsLabel: string,
    emailLabel: string,
    nameLabel: string,
    subtitle:string,
    mainVideo: TVideoThumbnail,
    emailValidation: string,
    thankYou: string,
    submit: string,
    deregisterMessage: string,
}