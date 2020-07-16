var Control = /** @class */ (function () {
    function Control() {
        this.CONTENT_ID = 'content';
        this.BALANCE_ID = 'balance';
        this.BALANCE_INPUT = 'balanceInput';
        this.CURRENCY_ID = 'currency';
        this.CURRENCY_INPUT = 'currencyInput';
        this.RESULT_ID = 'result';
        this.PURCHASE = 'purchase';
        this.PURCHASE_BUTTON_ID = 'purchaseBtn';
        this.PURCHASE_ROW_CLASS = 'purchaseRow';
        this.createDateInput();
        this.createBalanceInput();
        this.createCurrencyInput();
        this.createRefillButton();
        this.createPurchaseButton();
        this.createSendToTelegramButton();
        this.createResultField();
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.tooltipped');
            var instances = M.Tooltip.init(elems, {});
        });
    }
    Control.prototype.createDateInput = function () {
        var wrapper = document.createElement("div");
        wrapper.id = 'dateWrapper';
        wrapper.className = 'col s4 input-field';
        var label = document.createElement("span");
        label.innerText = 'Дата звіту:';
        wrapper.appendChild(label);
        var input = document.createElement("input");
        input.id = 'dateInput';
        input.placeholder = "Введіть дату ";
        wrapper.appendChild(input);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper);
    };
    Control.prototype.createBalanceInput = function () {
        var wrapper = document.createElement("div");
        wrapper.id = this.BALANCE_ID;
        wrapper.className = 'col s4 input-field';
        var label = document.createElement("span");
        label.innerText = 'Баланс(USD):*';
        wrapper.appendChild(label);
        var input = document.createElement("input");
        input.type = 'number';
        input.id = this.BALANCE_INPUT;
        input.placeholder = "Введіть баланс (USD) ";
        wrapper.appendChild(input);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper);
    };
    Control.prototype.createCurrencyInput = function () {
        var wrapper = document.createElement("div");
        wrapper.id = this.CURRENCY_ID;
        wrapper.className = 'col s4 input-field';
        var label = document.createElement("span");
        label.innerText = 'Курс (USD):* ';
        wrapper.appendChild(label);
        var input = document.createElement("input");
        input.id = this.CURRENCY_INPUT;
        input.type = 'number';
        input.placeholder = "Введіть курс (USD)";
        wrapper.appendChild(input);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper);
    };
    Control.prototype.createResultField = function () {
        var wrapper = document.createElement("div");
        wrapper.id = this.RESULT_ID;
        wrapper.className = 'col s12';
        var label = document.createElement("span");
        label.innerText = 'Витрати: ';
        wrapper.appendChild(label);
        var span = document.createElement("span");
        span.id = 'total-purchase';
        span.innerText = "0";
        wrapper.appendChild(span);
        var labelTotal = document.createElement("span");
        labelTotal.innerText = 'Залишок: ';
        wrapper.appendChild(labelTotal);
        var spanTotal = document.createElement("span");
        spanTotal.id = 'total-amount';
        spanTotal.innerText = "0";
        wrapper.appendChild(spanTotal);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper);
    };
    Control.prototype.createPurchaseButton = function () {
        var wrapper = document.createElement("div");
        wrapper.id = this.PURCHASE;
        wrapper.className = 'col s1';
        var button = document.createElement("button");
        button.id = this.PURCHASE_BUTTON_ID;
        button.disabled = true;
        button.className = "btn-floating waves-effect waves-light btn-large red tooltipped";
        button.setAttribute('data-position', "bottom");
        button.setAttribute('data-tooltip', "Витрата коштів");
        wrapper.appendChild(button);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper);
        $("#purchaseBtn").append("<i class='material-icons'>remove</i>");
    };
    Control.prototype.createRefillButton = function () {
        var wrapper = document.createElement("div");
        wrapper.id = 'refill';
        wrapper.className = 'col s1';
        var button = document.createElement("button");
        button.id = 'refill-button';
        button.disabled = true;
        button.className = "btn-floating waves-effect waves-light btn-large green tooltipped";
        button.setAttribute('data-position', "left");
        button.setAttribute('data-tooltip', "Поповнення коштів");
        wrapper.appendChild(button);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper);
        $("#refill-button").append("<i class='material-icons'>add</i>");
    };
    Control.prototype.createPurchaseRow = function (type) {
        var wrapper = document.createElement("div");
        wrapper.className = "row " + this.PURCHASE_ROW_CLASS + " " + type;
        wrapper.setAttribute('data-type', type);
        var descriptionWrapper = document.createElement("div");
        descriptionWrapper.className = 'col s7 input-field';
        var description = document.createElement("input");
        var descriptionId = Math.floor(Math.random() * 100);
        description.id = descriptionId;
        description.className = "description";
        description.type = 'text';
        var labelDescription = document.createElement("label");
        labelDescription.htmlFor = descriptionId;
        if (type === 'refill') {
            labelDescription.textContent = "Опис поповнення";
        }
        else {
            labelDescription.textContent = "Опис витрати";
        }
        descriptionWrapper.appendChild(description);
        descriptionWrapper.appendChild(labelDescription);
        wrapper.appendChild(descriptionWrapper);
        var usdWrapper = document.createElement("div");
        usdWrapper.className = 'col s2 input-field';
        var usd = document.createElement("input");
        usd.className = "usd-total";
        usd.placeholder = "Сума(USD)";
        usd.type = 'number';
        usdWrapper.appendChild(usd);
        wrapper.appendChild(usdWrapper);
        var uahWrapper = document.createElement("div");
        uahWrapper.className = 'col s2 input-field';
        var uah = document.createElement("input");
        uah.className = "uah-total";
        uah.type = 'number';
        uah.placeholder = "Сума(UAH)";
        uahWrapper.appendChild(uah);
        wrapper.appendChild(uahWrapper);
        var removeWrapper = document.createElement("div");
        removeWrapper.className = 'col s1 input-field';
        var remove = document.createElement("i");
        remove.className = "material-icons remove";
        remove.textContent = 'clear';
        removeWrapper.appendChild(remove);
        wrapper.appendChild(removeWrapper);
        document.getElementById(this.CONTENT_ID).insertBefore(wrapper, document.getElementById('refill'));
    };
    Control.prototype.createSendToTelegramButton = function () {
        var wrapper = document.createElement("div");
        wrapper.id = 'telegram';
        wrapper.className = 'col s1';
        var button = document.createElement("button");
        button.id = 'sendToTelegram';
        button.className = "btn-floating btn btn-large btn-success tooltipped";
        button.setAttribute('data-position', "right");
        button.setAttribute('data-tooltip', "Надіслати звіт в Telegram.");
        wrapper.appendChild(button);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper);
        $("#sendToTelegram").append("<i class='material-icons'>send</i>");
    };
    return Control;
}());
var Handler = /** @class */ (function () {
    function Handler(control) {
        this.control = control;
        this.purchaseButtonOnClick();
        this.eventListener();
        this.purchaseButtonState();
    }
    Handler.prototype.purchaseButtonOnClick = function () {
        var purchaseBtn = document.getElementById(control.PURCHASE_BUTTON_ID);
        purchaseBtn.addEventListener("click", function (e) { return control.createPurchaseRow('purchase'); });
        var refillBtn = document.getElementById('refill-button');
        refillBtn.addEventListener("click", function (e) { return control.createPurchaseRow('refill'); });
    };
    Handler.prototype.eventListener = function () {
        var _this = this;
        document.addEventListener('click', function (e) {
            if (e.target && e.target.className === 'material-icons remove') {
                e.path[2].remove();
            }
        });
        document.addEventListener('input', function (e) {
            _this.purchaseButtonState();
        });
    };
    Handler.prototype.purchaseButtonState = function () {
        var balanceInput = document.getElementById(control.BALANCE_INPUT).value;
        var currencyInput = document.getElementById(control.CURRENCY_INPUT).value;
        var purchaseBtn = document.getElementById(control.PURCHASE_BUTTON_ID);
        var refillBtn = document.getElementById('refill-button');
        if (balanceInput === null ||
            balanceInput === "" ||
            currencyInput === null ||
            currencyInput === "") {
            purchaseBtn.disabled = true;
            refillBtn.disabled = true;
        }
        else {
            purchaseBtn.disabled = false;
            refillBtn.disabled = false;
        }
    };
    return Handler;
}());
var Calculator = /** @class */ (function () {
    function Calculator() {
        this.eventListener();
    }
    Calculator.prototype.eventListener = function () {
        var _this = this;
        document.addEventListener('input', function (e) {
            if (e.target && e.target.className === 'usd-total') {
                _this.totalAmount();
                e.path[2].childNodes[2].value = "";
            }
            if (e.target && e.target.className === 'uah-total') {
                _this.convertMoney(e);
                _this.totalAmount();
            }
            if (e.target && e.target.id === 'currencyInput' && e.target.value !== "") {
                _this.recalculateContertation();
            }
            if (e.target && e.target.id === 'balanceInput') {
                document.getElementById('total-amount').textContent = document.getElementById('balanceInput').value;
            }
        });
        document.addEventListener('click', function (e) {
            _this.totalAmount();
        });
    };
    Calculator.prototype.totalAmount = function () {
        var total = 0;
        var purchaseValue = 0;
        var refillValue = 0;
        var purchaseRows = document.getElementsByClassName('usd-total');
        for (var i = 0; i < purchaseRows.length; i++) {
            var type = purchaseRows[i].parentElement.parentElement.getAttribute('data-type');
            var value = parseFloat(purchaseRows[i].value) || 0;
            if (type === 'refill') {
                refillValue = Math.round(((value + refillValue) + Number.EPSILON) * 100) / 100;
            }
            else {
                purchaseValue = Math.round(((value + purchaseValue) + Number.EPSILON) * 100) / 100;
            }
        }
        var balanceInput = document.getElementById('balanceInput').value;
        document.getElementById('total-purchase').textContent = purchaseValue;
        var totalAmount = 0;
        totalAmount = Math.round(((balanceInput - purchaseValue) + Number.EPSILON) * 100) / 100;
        totalAmount = Math.round(((totalAmount + refillValue) + Number.EPSILON) * 100) / 100;
        document.getElementById('total-amount').textContent = totalAmount;
    };
    Calculator.prototype.convertMoney = function (e) {
        var usdInput = e.path[2].childNodes[1].childNodes[0];
        var total = 0;
        var num = 0;
        var uahTotal = parseInt(e.target.value) || 0;
        var currentyRate = parseFloat(document.getElementById('currencyInput').value) || 0;
        num = uahTotal / currentyRate;
        total = Math.round(((num) + Number.EPSILON) * 100) / 100;
        usdInput.value = total;
    };
    Calculator.prototype.recalculateContertation = function () {
        $.each($(document).find('.purchaseRow'), function (index, element) {
            var uahVal = parseInt($(element).find('.uah-total').val()) || 0;
            var usdVal = $(element).find('.usd-total');
            var currentyRate = parseFloat(document.getElementById('currencyInput').value) || 0;
            var num = uahVal / currentyRate;
            var total = Math.round(((num) + Number.EPSILON) * 100) / 100;
            if (uahVal !== "" && uahVal !== 0) {
                usdVal.val(total);
            }
        });
    };
    return Calculator;
}());
var Telegram = /** @class */ (function () {
    function Telegram() {
        this.telegramButtonOnClick();
    }
    Telegram.prototype.telegramButtonOnClick = function () {
        var _this_1 = this;
        var button = document.getElementById('sendToTelegram');
        button.addEventListener('click', function () {
            var confirm = window.confirm('Надіслати в Telegram?');
            if (confirm) {
                _this_1.send();
            }
        });
    };
    Telegram.prototype.collectMessage = function () {
        var message = "";
        message += "\u0417\u0432\u0456\u0442 " + document.getElementById('dateInput').value + " \n";
        var startBalance = document.getElementById('balanceInput').value;
        message += "Попередній залишок " + startBalance + "$ \n\n";
        var rows = document.querySelectorAll('div.purchaseRow');
        for (var i = 0; i < rows.length; i++) {
            var type = rows[i].getAttribute('data-type');
            if (type === 'refill') {
                message += '+ ';
            }
            else {
                message += '- ';
            }
            var description = rows[i].querySelector('input.description').value;
            var usdTotal = rows[i].querySelector('input.usd-total').value + "$";
            if (description !== "" && usdTotal !== "") {
                message += description + ' - ' + usdTotal + " \n\n";
            }
        }
        var totalAmount = document.getElementById('total-amount').textContent;
        message += "Поточний залишок: " + totalAmount + "$";
        return message;
    };
    Telegram.prototype.send = function () {
        var preloader = document.getElementById('preloader');
        var content = document.getElementById('content');
        preloader.className = 'preloader-wrapper big preloader-center active';
        content.className = 'hide';
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.telegram.org/" + "" + "/sendMessage",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "cache-control": "no-cache"
            },
            "data": JSON.stringify({
                "chat_id": '',
                "text": this.collectMessage()
            })
        };
        $.ajax(settings).done(function (response) {
            preloader.className = 'preloader-wrapper big';
            content.className = 'row';
            M.toast({ html: 'Відправлено!', classes: 'green', inDuration: 500 });
        });
    };
    return Telegram;
}());
var control = new Control();
var handler = new Handler(control);
var calculator = new Calculator();
var telegram = new Telegram();
//# sourceMappingURL=report.js.map