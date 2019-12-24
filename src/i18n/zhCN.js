export default {
    global: {
        title: 'Koalabeds',
        checkIn: '入住',
        checkOut: '退房',
        search: '查找',
        chooseCity: '选择城市',
        total: '总共',
        night: ' 晚',
        tabBars: ['酒店', '门票', '我的'],
        loading: '加载中...',
        Map: '地图',
        IN: '入住',
        OUT: '退房',
        N: '晚',
        up: '起',
        BOOK: '预定',
        WeChat: 'WeChat',
        Booking: '立即购买',
        CancelBooking: '取消预定',
        PayNow: '立即支付',
        PAY: '支付',
        bookLoading: '预定中',
        Cancel: '取消',
        Confirm: '确认',
        Completed: '完成',
        hotelGuest: '{adult}成人 {child} 兒童', 
        Coupon: "优惠券",
        selectCoupon: '选择优惠券',
        selectCouponIt: '确认选择',
        noValidCoupon: '没有有效的优惠券',
        Agree: '我同意',
        systemerr: '系统错误',
        validDateStr: "有效时间: {dateStr}",
        lookDetail: '查看酒店资料',
        notYet: '未选择',
        noSelectCouponTip: "请选择一张优惠券",
        cancelOrderTip: '想要取消订单吗?',
        termsAgreeTip: "请阅读条件和规范!",
        getUserError: "登入失败，请重试",
        getUserErrMsg: "原因: {errMsg}",
        Total: '总共'
    },
    pages: {
        home: {
            title: 'Koalabeds',
            searchPlaceHolod: '输入地点 或 酒店名称',
            couponTitle: '优惠券',
            recommendTitle: '推荐酒店',
            totalNights: '总共 {dayCount} 晚',
            getAll: '全部获取',
            cityName: '选择城市',
            ticketWelcome: '登录领取优惠券'
        },
        my: {
            wechat: '微信授权登录',
            hotelBook: '酒店订单',
            myTicket: '门票订单',
            myCoupon: '我的优惠券',
            language: '语言'
        },
        search: {
            filter: '筛选',
            sort: '排序',
            location: '地点',
            notdata: "没找到符合条件的酒店",
            Price: '价钱',
            Rating: '评分',
            Any: '任何',
            All: '全部',
            low2hight: '由低至高',
            hight2low: '由高至低',
            Ranking: '评分',
            rating: '条评论'
        },
        hotelDetail: {
            Guest: '入住人数',
            nohotel: "系统错误，暂时找不到酒店！",
            nodata: '目前没有可用的房间',
            guestSetting: '入住人数',
            Adult: '成人',
            Child: '儿童',
            Done: '完成'
        },
        hotelBook: {
            roomInfo: '房间信息',
            termsText: '我已阅读条款与合同',
            Name: '姓名',
            Phone: '电话',
            Email: 'Email',
            bookingTerms: '条款与合同',
            nameInputTip: "请输入姓名",
            phoneInputTip: "请输入电话",
            mailInputTip: "请输入邮箱",
            mailErrorTip: "请输入正确的邮箱地址"
        },
        result: {
            payfail: '支付失败',
            ordercancel: '订单取消',
            paysuccess: '支付成功',
            details: '订单详情',
            homepage: '返回微信'
        },
        ticketDetail: {
            chooseDate: '选择时间',
            numTip: '请选择门票的个数',
            validDate: '选择时间'
        },
        ticketBook: {
            Hotel: '自取酒店',
            Name: '姓名',
            Passport: '国籍',
            Email: 'Email',
            nameInputTip: "请输入姓名",
            passportInputTip: "请选择您的国籍",
            mailInputTip: "请输入邮箱",
            hotelSelectTip: "请选择一家酒店",
            Merchandise: '门票原价',
            Discount: '优惠金额',
            Total: '总价',
            payCancel: '支付取消'
        },
        mybooking: {
            tabBars: ['全部', '待支付', '预定中', '已预订', '已取消'],
            rateTips: "请输入想要的评论的内容",
            rateSuccessTip: "谢谢您的支持",
            nodata: "没有符合条件的订单",
            reviewsTitle: "评论",
            rating: "评价",
            ratePlaceholder: "输入对订单的建议和评价..."
        },
        mycoupon: {
            nodata: "没有符合条件的优惠券",
            tarBars: ["有效", "已使用", "已过期"]
        },
        myticket: {
            orderDate: '订单时间: ',
            nodata: '还没有产生订单',
            UserInfo: "用户信息",
            statusText: {
                0: "Wait",
                "-1": "Cancel",
                1: "Confirm",
                2: "Complete"
            }
        },
        myticketDetail: {
            orderDate: '订单时间: ',
            orderNumber: "订单号"
        },
        mylanguage: {
            select: "确定"
        }
    },
    components: {
        loadmore: {
            contentText: {
                contentdown: "下拉加载更多",
                contentrefresh: "加载中...",
                contentnomore: "没有更多数据"
            }
        },
        cityselect: {
            placeholder: '请输入要查询城市名称',
            selectedCity: '已选择',
            hotCity: '热门城市'
        },
        ticket: {
            purchase: '消费满',
            valid: '有效期 {valid}天',
            footerText: {
                "-1": "获取",
                "0": "已获取",
                "1": "已使用",
                "2": "已过期"
            }
        },
        calendar: {
            chooseDate: '选择',
            chooseCheckOut: '选择离店',
            done: '确定',
            toady: '今天',
            tomorrow: '明天',
            dayCount2: '{dayCount} 晚',
            weekNameArr: ['日', '一', '二', '三', '四', '五', '六'],
            monthNameArr: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            date: '{date}号'
        },
        searchbar: {
            cancel: '取消',
            search: '查找'
        },
        comments: {
            Reviews: "评论",
            More: '更多'
        },
        unicalendar:{
            backtoday:'回到今天'
        }
    }

}