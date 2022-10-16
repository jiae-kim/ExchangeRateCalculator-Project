// 1. 금앱 입력할 박스 2개 
// 2. 화폐단위 선택할 드랍다운 리스트 
// 3. 환율 정보 
// 4. 드랍다운 리스트에서 선택한 아이템으로 적용 방법
// 5. 금액 입력하면 환전 계산
// 6. 드랍다운 리스트에서 다른 아이템으로 선택하면 적용됨
// 7. 반대로 밑에 박스에서 숫자를 바꿔도 위에 박스에 적용이 된다 
// 8. 숫자를 글자로 표현함

let currencyRatio = {
    USD:{
        KRW:1441.69,
        USD:1,
        VND:24135.00,
        unit:"달러"
    },
    KRW:{
        KRW:1,
        USD:0.00069,
        VND:16.74,
        unit:"원"
    },
    VND:{
        VND:1,
        USD:0.000041,
        KRW:0.060,
        unit:"동"
    }
};

// 환율정보 불러오는 방법 3가지
//console.log(currencyRatio.VND.unit);
//console.log(currencyRatio['VND']['unit']);
//console.log(currencyRatio['VND'].unit);

let fromCurrency = 'USD';
let toCurrency = 'USD';

document.querySelectorAll("#from-currency-list a").forEach(menu=>menu.addEventListener("click", function(){
    document.getElementById("from-button").textContent = this.textContent;
    fromCurrency = this.textContent;
    // 드랍다운 리스트에 값이 바뀔때마다 환전을 다시한다 
    convert();
    })
);

document.querySelectorAll("#to-currency-list a").forEach(menu=>menu.addEventListener("click", function(){
    document.getElementById("to-button").textContent = this.textContent;
    toCurrency = this.textContent;
    convert();
    })
);

// 환전 로직
function convert(){
    // 1. 얼마를 환전, 가지고있는 돈과 바꾸고자하는 돈의 화폐단위
    let amount = document.getElementById("from-input").value;
    // 2. 돈 * 환율 = 환전금액
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
    // 3. 환전 금액 보여짐
    document.getElementById("to-input").value = convertedAmount;
};
