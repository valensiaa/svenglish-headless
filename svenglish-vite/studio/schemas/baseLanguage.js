import {supportedLanguages} from './supportedLanguages'

const baseLanguage = supportedLanguages.find((l) => l.isDefault)

export default baseLanguage
