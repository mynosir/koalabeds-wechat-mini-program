const request = require('request')
const APPID = 'wx18cda3bfbb701cb7'
const APPSECRET = 'edd6975aa873da255d9dfc7d7e77b040'

// request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`,
//     (err, response, body) => {
//         console.log(body)
//     })

const ACCESS_TOKEN = '27_RUPnc38eIobs4jnrBWDGVxeIDNdhuQEup_mNd_ucN1_BcqFvAmvdP96jzxtI3slT3dQJDTHz2BzJEMH9fKhOwhhTtnro8HpwxCBtpOS3QebkAMSevkbQlrRzjvhJjlE9H4jqD9Gk3UXTp-eKYDGdAJAUZC'

const sendMsgUrl = `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/uniform_send?access_token=${ACCESS_TOKEN}`
const openid = 'oLq-f4iaG_zt3onbC8lzZ4ODht-c'
const weapp_template_msg = {
    template_id: 'tTwQ3yBghOuv-s5aBk1ckJHCPymQTPj46JwhxEJE0oc',
    page: '/pages/my/my-booking/my-booking',
    form_id: '',
    "data": {
        "keyword1": {
            "value": "339208499"
        },
        "keyword2": {
            "value": "2015年01月05日 12:30"
        },
        "keyword3": {
            "value": "腾讯微信总部"
        },
        "keyword4": {
            "value": "广州市海珠区新港中路397号"
        },
        "keyword5": {
            "value": "广州市海珠区新港中路397号"
        },
        "keyword6": {
            "value": "广州市海珠区新港中路397号"
        },
        "keyword7": {
            "value": "广州市海珠区新港中路397号"
        }
    },
    "emphasis_keyword": "keyword3.DATA"
}

request.post({
    url: sendMsgUrl,
    form: {
        touser: openid,
        weapp_template_msg,
    }
}, (err, response, body) => {
    console.log(body)
})