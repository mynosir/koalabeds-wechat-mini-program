export default {
    global: {
        title: 'Koalabeds',
        checkIn: '入住',
        checkOut: '退房',
        search: '查找',
        chooseCity: '選擇城市',
        total: '總共',
        night: ' 晚',
        tabBars: ['酒店', '門票', '我的'],
        loading: '加載中...',
        Map: '地圖',
        IN: '入住',
        OUT: '退房',
        N: '晚',
        up: '起',
        BOOK: '預定',
        WeChat: 'WeChat',
        Booking: '立即購買',
        CancelBooking: '取消預定',
        PayNow: '立即支付',
        bookLoading: '預定中',
        Cancel: '取消',
        Completed: '完成',
        selectCoupon: '選擇優惠券',
        noValidCoupon: '沒有有效的優惠券',
        selectCoupon: '選擇它',
        Agree: '我同意',
        systemerr: '系統錯誤',
        validDateStr: "有效時間: {dateStr}",
        lookDetail: '查看酒店資料',
        notYet: '未選擇',
        noSelectCouponTip: "請選擇一張優惠券",
        cancelOrderTip: '想要取消訂單嗎?',
        termsAgreeTip: "請閱讀條件和規範!",
        getUserError: "登入失敗，請重試",
        getUserErrMsg: "原因: {errMsg}",
        Total: '總共'
    },
    pages: {
        home: {
            title: 'Koalabeds',
            searchPlaceHolod: '輸入地點 或 酒店名稱',
            couponTitle: '優惠券',
            recommendTitle: '推薦酒店',
            totalNights: '總共 {dayCount} 晚',
            getAll: '全部獲取',
            cityName: '選擇城市'
        },
        my: {
            wechat: '微信授權登錄',
            hotelBook: '酒店訂單',
            myTicket: '門票訂單',
            myCoupon: '我的優惠券',
            language: '語言'
        },
        search: {
            filter: '篩選',
            sort: '排序',
            location: '地點',
            notdata: "沒找到符合條件的酒店",
            Price: '價錢',
            Rating: '評分',
            Any: '任何',
            All: '全部',
            low2hight: '由低至高',
            hight2low: '由高至低',
            Ranking: '評分',
            rating: '条評论'
        },
        hotelDetail: {
            Guest: '入住人數',
            nohotel: "系統錯誤，暫時找不到酒店！",
            nodata: '沒有符合條件的房間，請修改入住時間或人數',
            guestSetting: '人數設置',
            Adult: '成人',
            Child: '小孩',
            Done: '確定'
        },
        hotelBook: {
            roomInfo: '房間信息',
            termsText: '我已閱讀條款與合同',
            Name: '姓名',
            Phone: '電話',
            Email: 'Email',
            bookingTerms: '條款與合同',
            nameInputTip: "請輸入姓名",
            phoneInputTip: "請輸入電話",
            mailInputTip: "請輸入郵箱",
        },
        result: {
            payfail: '支付失敗',
            ordercancel: '訂單取消',
            paysuccess: '支付成功',
            details: '訂單詳情',
            homepage: '返回微信'
        },
        ticketDetail: {
            chooseDate: '選擇時間',
            numTip: '請選擇門票的個數'
        },
        ticketBook: {
            Hotel: '自取酒店',
            Name: '姓名',
            Passport: '护照ID',
            Email: 'Email',
            nameInputTip: "請輸入姓名",
            passportInputTip: "請輸入護照",
            mailInputTip: "請輸入郵箱",
            hotelSelectTip: "請選擇一家酒店",
            Merchandise: '門票原價',
            Discount: '優惠金額',
            Total: '總價',
            payCancel: '支付取消'
        },
        mybooking: {
            tabBars: ['全部', '待支付', '預定中', '完成', '取消'],
            rateTips: "請輸入想要的評論的內容",
            rateSuccessTip: "謝謝您的支持",
            nodata: "沒有符合條件的訂單",
            reviewsTitle: "評論",
            rating: "評價",
            ratePlaceholder: "輸入對訂單的建議和評價..."
        },
        mycoupon: {
            nodata: "沒有符合條件的優惠券",
            tarBars: ["有效", "已使用", "已過期"]
        },
        myticket: {
            orderDate: '訂單時間: ',
            nodata: '還沒有產生訂單',
            UserInfo: "用戶信息",
            statusText: {
                0: "Wait",
                "-1": "Cancel",
                1: "Confirm",
                2: "Complete"
            }
        },
        myticketDetail: {
            orderDate: '訂單時間: ',
            orderNumber: "訂單號"
        },
        mylanguage: {
            select: "確定"
        }
    },
    components: {
        loadmore: {
            contentText: {
                contentdown: "下拉加載更多",
                contentrefresh: "加載中...",
                contentnomore: "沒有更多數據"
            }
        },
        cityselect: {
            placeholder: '請輸入要查詢城市名稱',
            selectedCity: '已選擇',
            hotCity: '熱門城市'
        },
        ticket: {
            purchase: '消費滿',
            valid: '有效期 {valid}天',
            footerText: {
                "-1": "獲取",
                "0": "已獲取",
                "1": "已使用",
                "2": "已過期"
            }
        },
        calendar: {
            chooseDate: '選擇',
            chooseCheckOut: '選擇離店',
            done: '確定',
            toady: '今天',
            tomorrow: '明天',
            dayCount2: '{dayCount} 晚',
            weekNameArr: ['日', '一', '二', '三', '四', '五', '六'],
            monthNameArr: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            date: '{date}號'
        },
        searchbar: {
            cancel: '取消',
            search: '查找'
        },
        comments: {
            Reviews: "評論",
            More: '更多'
        }
    }

}