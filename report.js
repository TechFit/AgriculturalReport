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
        this.createBalanceInput();
        this.createCurrencyInput();
        this.createPurchaseButton();
        this.createResultField();
    }
    Control.prototype.createBalanceInput = function () {
        var wrapper = document.createElement("div");
        wrapper.id = this.BALANCE_ID;
        wrapper.className = 'col-md-6';
        var label = document.createElement("span");
        label.innerText = 'Баланс(USD):';
        wrapper.appendChild(label);
        var input = document.createElement("input");
        input.type = 'number';
        input.id = this.BALANCE_INPUT;
        input.placeholder = "Введите баланс";
        wrapper.appendChild(input);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper);
    };
    Control.prototype.createCurrencyInput = function () {
        var wrapper = document.createElement("div");
        wrapper.id = this.CURRENCY_ID;
        wrapper.className = 'col-md-6';
        var label = document.createElement("span");
        label.innerText = 'Курс (USD):';
        wrapper.appendChild(label);
        var input = document.createElement("input");
        input.id = this.CURRENCY_INPUT;
        input.type = 'number';
        input.placeholder = "Введите курс(USD)";
        wrapper.appendChild(input);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper);
    };
    Control.prototype.createResultField = function () {
        var wrapper = document.createElement("div");
        wrapper.id = this.RESULT_ID;
        wrapper.className = 'col-md-12';
        var label = document.createElement("span");
        label.innerText = 'Результат:';
        wrapper.appendChild(label);
        var div = document.createElement("span");
        div.innerText = "0";
        wrapper.appendChild(div);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper);
    };
    Control.prototype.createPurchaseButton = function () {
        var wrapper = document.createElement("div");
        wrapper.id = this.PURCHASE;
        wrapper.className = 'col-md-12';
        var button = document.createElement("button");
        button.innerText = "Добавить запись.";
        button.id = this.PURCHASE_BUTTON_ID;
        button.disabled = true;
        button.className = "btn btn-large btn-info";
        wrapper.appendChild(button);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper);
    };
    Control.prototype.createPurchaseRow = function () {
        var wrapper = document.createElement("div");
        wrapper.className = "col-md-12 " + this.PURCHASE_ROW_CLASS;
        var description = document.createElement("input");
        description.placeholder = "Описание";
        description.className = "description";
        wrapper.appendChild(description);
        var usd = document.createElement("input");
        usd.placeholder = "Сумма(USD)";
        usd.className = "usd-total";
        usd.type = 'number';
        wrapper.appendChild(usd);
        var uah = document.createElement("input");
        uah.placeholder = "Сумма(UAH)";
        uah.className = "uah-total";
        uah.type = 'number';
        wrapper.appendChild(uah);
        var remove = document.createElement("i");
        remove.className = "fa fa-trash";
        wrapper.appendChild(remove);
        document.getElementById(this.CONTENT_ID).insertBefore(wrapper, document.getElementById(this.PURCHASE));
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
        purchaseBtn.addEventListener("click", function (e) { return control.createPurchaseRow(); });
    };
    Handler.prototype.eventListener = function () {
        var _this = this;
        document.addEventListener('click', function (e) {
            if (e.target && e.target.className === 'fa fa-trash') {
                e.path[1].remove();
                // Todo 
                // RECALCULATE
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
        if (balanceInput === null ||
            balanceInput === "" ||
            currencyInput === null ||
            currencyInput === "") {
            purchaseBtn.disabled = true;
        }
        else {
            purchaseBtn.disabled = false;
        }
    };
    return Handler;
}());
var control = new Control();
var handler = new Handler(control);
//# sourceMappingURL=report.js.map