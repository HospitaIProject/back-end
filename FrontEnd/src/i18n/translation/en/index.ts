import main from './main.json';
import mainModal from './mainModal.json';
import operationPage from './operationPage.json';
import header from './header.json';

export default {
    ...main,
    ...mainModal,
    ...operationPage,
    ...header,
};
// Compare this snippet from src/i18n/translation/ko/index.ts:
// import main from './main.json';
// import mainModal from './mainModal.json';
// import operationPage from './operationPage.json ';
