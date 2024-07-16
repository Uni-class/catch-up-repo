import { OAuth2DataType } from "@/app/login/_type/OAuth2DataType";
import { ProviderEnum } from "@/app/login/_type/ProviderEnum";


export const ProviderData: {
    [key in ProviderEnum]: OAuth2DataType
} = {
    "GOOGLE": {
        pathname: "https://accounts.google.com/o/oauth2/v2/auth",
        query: {
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
            redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL || "",
            scope: "email profile openid"
        },
        display: {
            text: "Google 로그인",
            iconURL: "/icon/icon-google.svg"
        }
    },
    "NAVER": {
        pathname: "https://nid.naver.com/oauth2.0/authorize",
        query: {
            client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "",
            redirect_uri: process.env.NEXT_PUBLIC_NAVER_CALLBACK_URL || "",
            state: "HASH"
        },
        display: {
            text: "Naver 로그인",
            iconURL: "/icon/icon-naver.svg"
        }
    },
    "KAKAO": {
        pathname: "https://kauth.kakao.com/oauth/authorize",
        query: {
            client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "",
            redirect_uri: process.env.NEXT_PUBLIC_KAKAO_CALLBACK_URL || ""
        },
        display: {
            text: "Kakao 로그인",
            iconURL: "/icon/icon-kakao.svg"
        }
    },
};