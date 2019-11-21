export default {
    global: {
        title: 'Koalabeds',
        checkIn: 'Check In',
        checkOut: 'Check Out',
        search: 'Search',
        chooseCity: 'Choose City',
        total: 'Total',
        night: 'nights',
        search: 'Search',
        tabBars: ['Home', 'Ticket', 'My Booking'],
        loading: 'loading...',
        Map: 'Map',
        IN: 'IN',
        OUT: 'OUT',
        N: 'N',
        up: 'up',
        BOOK: 'BOOK',
        WeChat: 'WeChat',
        Booking: 'Booking Now',
        CancelBooking: 'Cancel Booking',
        PayNow: 'PAY NOW',
        PAY: 'PAY',
        bookLoading: 'Booking loading',
        Cancel: 'Cancel',
        Confirm: 'Confirm',
        Completed: 'Completed',
        Coupon: "Coupon",
        hotelGuest: '{adult} adults {child} child',
        selectCoupon: 'Select Coupon',
        noValidCoupon: 'no valid coupons',
        selectCouponIt: 'Select It',
        Agree: 'I Agree',
        systemerr: 'error',
        validDateStr: "Valid date: {dateStr}",
        lookDetail: 'Look Hotel Detail',
        notYet: 'Not Yet',
        noSelectCouponTip: "Please select the coupon",
        cancelOrderTip: 'Do you want to cancel the order?',
        termsAgreeTip: "Please read booking terms!",
        getUserError: "Failed to login, please retry.",
        getUserErrMsg: "reason: {errMsg}",
        Total: 'Total'
    },
    pages: {
        home: {
            title: 'Koalabeds',
            searchPlaceHolod: 'Search location or hotel name',
            couponTitle: 'Get your coupon',
            recommendTitle: 'Recommend',
            totalNights: 'Total {dayCount} nights',
            getAll: 'Get All',
            cityName: 'Choose City'
        },
        my: {
            wechat: 'Wechat Authorization',
            hotelBook: 'Hotel Booking',
            myTicket: 'My Ticket',
            myCoupon: 'My Coupon',
            language: 'Language',
        },
        search: {
            filter: 'Filter',
            sort: 'Sorting',
            location: 'Location',
            notdata: "No eligible hotels found",
            Price: 'Price',
            Rating: 'Rating',
            Any: 'Any',
            All: 'All',
            low2hight: 'from low to hight',
            hight2low: 'from hight to low',
            Ranking: 'Ranking',
            rating: 'rating'
        },
        hotelDetail: {
            Guest: 'Guest',
            nohotel: "Something Wrong,cann't find Hotel!",
            nodata: 'No room is available yet.',
            guestSetting: 'Guest Setting',
            Adult: 'Adult',
            Child: 'Child',
            Done: 'Done'
        },
        hotelBook: {
            roomInfo: 'Room Info',
            termsText: 'I have read an book terms',
            Name: 'Name',
            Phone: 'Phone',
            Email: 'Email',
            bookingTerms: 'Booking Terms',
            nameInputTip: "Please enter your name",
            phoneInputTip: "Please enter your phone",
            mailInputTip: "Please enter your email",
        },
        result: {
            payfail: 'Payment Fail',
            ordercancel: 'Order Cancel',
            paysuccess: 'Payment Success',
            details: 'Booking Detail',
            homepage: 'Back To Homepage'
        },
        ticketDetail: {
            chooseDate: 'Choose A Date',
            numTip: 'Please select num~',
            validDate: 'Valid Date'
        },
        ticketBook: {
            Hotel: 'Hotel',
            Name: 'Name',
            Passport: 'Passport',
            Email: 'Email',
            nameInputTip: "Please enter your Name",
            passportInputTip: "Please enter your Passport",
            mailInputTip: "Please enter your Email",
            hotelSelectTip: "Please select your hotel",
            Merchandise: 'Merchandise',
            Discount: 'Discount',
            Total: 'Total',
            payCancel: 'pay cancel'
        },
        mybooking: {
            tabBars: ['All', 'To be paid', 'Confirm', 'Complete', 'Cancel'],
            rateTips: "Please enter review!",
            rateSuccessTip: "Thank you!",
            nodata: "No qualified orders",
            reviewsTitle: "Share you review",
            rating: "Rating",
            ratePlaceholder: "Share your Reviews..."
        },
        mycoupon: {
            nodata: "No eligible coupons",
            tarBars: ["Valid", "Used", "Expired"]
        },
        myticket: {
            orderDate: 'Order date: ',
            nodata: 'No orders yet',
            UserInfo: "UserInfo",
            statusText: {
                0: "Wait",
                "-1": "Cancel",
                1: "Confirm",
                2: "Complete"
            }
        },
        myticketDetail: {
            orderDate: 'Order date: ',
            orderNumber: "Order Number"
        },
        mylanguage: {
            select: "Select"
        }
    },
    components: {
        loadmore: {
            contentText: {
                contentdown: "pull showmore",
                contentrefresh: "loading...",
                contentnomore: "no more data"
            }
        },
        cityselect: {
            placeholder: 'Enter Search City Name',
            selectedCity: 'Selected City',
            hotCity: 'HOT CITY'
        },
        ticket: {
            purchase: 'With purchase',
            valid: 'Valid {valid} days',
            footerText: {
                "-1": "GET IT",
                "0": "GOT",
                "1": "USED",
                "2": "EXPIRED"
            }
        },
        calendar: {
            chooseDate: 'Choose Date',
            chooseCheckOut: 'Choose CheckOut',
            done: 'Done It',
            toady: 'Toady',
            tomorrow: 'Tomorrow',
            dayCount2: '{dayCount} Night',
            weekNameArr: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
            monthNameArr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            date: '{date}'
        },
        searchbar: {
            cancel: 'Cancel',
            search: 'Search'
        },
        comments: {
            Reviews: "Reviews",
            More: 'More'
        },
        unicalendar: {
            backtoday: 'Back Today'
        }
    }

}