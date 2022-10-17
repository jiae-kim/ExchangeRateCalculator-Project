let currencyRatio = {
    KRW:{
        KRW:1,
        USD:0.00069,
        VND:16.74,
        CHF:0.00070,
        SGD:0.00099,
        INR:0.057,
        JPY:0.10,
        CNY:0.0050,
        CAD:0.00096,
        AUD:0.0011,
        unit: "원",
        img : "/flag/KR.png"
    },
    USD:{
        KRW:1441.69,
        USD:1,
        VND:24135.00,
        CHF:1.01,
        SGD:1.43,
        INR:82.42,
        JPY:148.78,
        CNY:7.19,
        CAD:1.39,
        AUD:1.61,
        unit: "달러",
        img: "/flag/US.gif"
    },
    VND:{
        KRW:0.060,
        USD:0.000041,
        VND:1,
        CHF:0.000042,
        SGD:0.000059,
        INR:0.0034,
        JPY:0.0062,
        CNY:0.00030,
        CAD:0.000058,
        AUD:0.000067,
        unit: "동",
        img: "/flag/VN.gif"
    },
    CHF:{
        KRW:1432.60,
        USD:0.99,
        VND:23982.90,        
        CHF:1,
        SGD:1.42,
        INR:81.90,
        JPY:147.85,
        CNY:7.15,
        CAD:1.38,
        AUD:1.60,
        unit: "프랑",
        img: "/flag/CH.gif"
    },
    SGD:{
        KRW:1009.59,
        USD:0.70,
        VND:16901.32,
        CHF:0.70,
        SGD:1,
        INR:57.72,
        JPY:104.19,
        CNY:5.04,
        CAD:0.97,
        AUD:1.13,
        unit: "달러",
        img: "/flag/SG.gif"
    },
    INR:{
        KRW:17.49,
        USD:0.012,
        VND:292.84,
        CHF:0.012,
        SGD:0.017,
        INR:1,
        JPY:1.81,
        CNY:0.087,
        CAD:0.017,
        AUD:0.020,
        unit: "루피",
        img: "/flag/IN.gif"
    },
    JPY:{
        KRW:9.69,
        USD:0.0067,
        VND:162.25,
        CHF:0.0068,
        SGD:0.0096,
        INR:0.55,
        JPY:1,
        CNY:0.048,
        CAD:0.0093,
        AUD:0.011,
        unit: "엔",
        img: "/flag/JP.gif"
    },
    CNY:{
        KRW:200.50,
        USD:0.14,
        VND:3356.28,
        CHF:0.14,
        SGD:0.20,
        INR:11.46,
        JPY:20.69,
        CNY:1,
        CAD:0.19,
        AUD:0.22,
        unit: "위안화",
        img: "/flag/CN.gif"
    },
    CAD:{
        KRW:1038.35,
        USD:0.72,
        VND:17382.80,
        CHF:0.72,
        SGD:1.03,
        INR:59.36,
        JPY:107.14,
        CNY:5.18,
        CAD:1,
        AUD:1.16,
        unit: "달러",
        img: "/flag/CA.gif"
    },
    AUD:{
        KRW:893.70,
        USD:0.62,
        VND:14955.86,
        CHF:0.62,
        SGD:0.88,
        INR:51.07,
        JPY:92.27,
        CNY:4.46,
        CAD:0.86,
        AUD:1,
        unit: "달러",
        img: "/flag/AU.gif"
    }
};

// 환율정보 불러오는 방법 3가지
//console.log(currencyRatio.VND.unit);
//console.log(currencyRatio['VND']['unit']);
//console.log(currencyRatio['VND'].unit);

var unitWords = ["", "만", "억", "조", "경"];
var splitUnit = 10000;
let fromBtn = document.getElementById("from-btn");
let toBtn = document.getElementById("to-btn");
let fromCurrency = 'USD';
let toCurrency = 'USD';

document.querySelectorAll("#from-currency-list li").forEach(function(item) {
    item.addEventListener("click", function(){
        fromCurrency = this.id;
        fromBtn.innerHTML = `<img class="flag-img"src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`;
        // 드랍다운 리스트에 값이 바뀔때마다 환전을 다시한다 
        convert("from");
    });
});

document.querySelectorAll("#to-currency-list li").forEach(function (item) {
    item.addEventListener("click", function () {
        toCurrency = this.id;
        toBtn.innerHTML = `<img class="flag-img"src="${currencyRatio[toCurrency].img}"/>${toCurrency}`;
        convert("from");
    });
});

// 환전 로직
function convert(type) {
    // 1. 얼마를 환전, 가지고있는 돈과 바꾸고자하는 돈의 화폐단위 입력값 받기
    let amount = 0;
    if (type == "from") {
        amount = document.getElementById("fromAmount").value;
        // 2. 돈 * 환율 = 환전금액
        let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
        // 3. 환전 금액 보여짐
        document.getElementById("toAmount").value = convertedAmount;
        // 4. 숫자를 문자로 보여짐
        renderKoreanNumber(amount, convertedAmount);
    } else {
        amount = document.getElementById("toAmount").value;
        let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
        document.getElementById("fromAmount").value = convertedAmount;
        renderKoreanNumber(convertedAmount, amount);
    }
}

// 숫자 한글로 읽어줌
function renderKoreanNumber(from, to) {
    document.getElementById("fromNumToKorea").textContent = readNum(from) + currencyRatio[fromCurrency].unit;
    document.getElementById("toNumToKorea").textContent = readNum(to) + currencyRatio[toCurrency].unit;
}

function readNum(num) {
    let resultString = "";
    let resultArray = [];

    for (let i = 0; i < unitWords.length; i++) {
        let unitResult = (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);

        if (unitResult > 0) {
            resultArray[i] = unitResult;
        }
    }

    for (let i = 0; i < resultArray.length; i++) {
        if (!resultArray[i]) continue;
        resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }

    return resultString;
}
