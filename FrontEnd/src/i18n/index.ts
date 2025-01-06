// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './translation/en';
import translationKo from './translation/ko';

i18n.use(initReactI18next).init({
    // 언어별 사용될 리소스 설정 (default undefined)
    resources: {
        ko: {
            translation: translationKo,
        },
        en: {
            translation: translationEn,
        },
    },
    // default 언어 설정 (default undefined)
    lng: 'en',
    // react-i18next 처리 로그 콘솔 출력 설정 (default false)
    debug: true,
    // 동적인 데이터 값 할당 설정
    interpolation: {
        escapeValue: false, // react는 XSS에 안전하기 때문에 false로 설정
    },
});

export default i18n;
