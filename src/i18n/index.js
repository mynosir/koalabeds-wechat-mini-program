
import Vue from 'vue'
import VueI18n from 'vue-i18n'  

import enUS from './enUS'
import zhCN from './zhCN'
import zhHK from './zhHK'

Vue.use(VueI18n) 

export default new VueI18n({
    locale: 'en', 
    messages:{
        'en': enUS,
        'zh-cn': zhCN,
        'zh-hk': zhHK
    }
})