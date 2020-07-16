class Control 
{
    readonly CONTENT_ID              = 'content';
    readonly BALANCE_ID              = 'balance';
    readonly BALANCE_INPUT           = 'balanceInput';
    readonly CURRENCY_ID             = 'currency';
    readonly CURRENCY_INPUT          = 'currencyInput';
    readonly RESULT_ID               = 'result';
    readonly PURCHASE                = 'purchase';
    readonly PURCHASE_BUTTON_ID      = 'purchaseBtn';
    readonly PURCHASE_ROW_CLASS      = 'purchaseRow';

    constructor()
    {
        this.createDateInput();
        this.createBalanceInput();
        this.createCurrencyInput();
        this.createPurchaseButton();
        this.createSendToTelegramButton();
        this.createResultField();
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.tooltipped');
            var instances = M.Tooltip.init(elems, {});
          });
        
          // Or with jQuery
        
          $(document).ready(function(){
            $('.tooltipped').tooltip();
          });
                
    }

    createDateInput(): void
    {
        const wrapper = document.createElement("div");
        wrapper.id = 'dateWrapper';
        wrapper.className = 'col s4 input-field';
        
        const label = document.createElement("span");
        label.innerText = 'Дата звіту:';
        wrapper.appendChild(label);

        const input = document.createElement("input");
        input.id = 'dateInput';
        input.placeholder = "Введіть дату ";

        wrapper.appendChild(input);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper); 
    }

    createBalanceInput(): void
    {
        const wrapper = document.createElement("div");
        wrapper.id = this.BALANCE_ID;
        wrapper.className = 'col s4 input-field';
        
        const label = document.createElement("span");
        label.innerText = 'Баланс(USD):*';
        wrapper.appendChild(label);

        const input = document.createElement("input");
        input.type = 'number';
        input.id = this.BALANCE_INPUT;
        input.placeholder = "Введіть баланс (USD) ";

        wrapper.appendChild(input);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper); 
    }

    createCurrencyInput(): void
    {
        const wrapper = document.createElement("div");
        wrapper.id = this.CURRENCY_ID;
        wrapper.className = 'col s4 input-field';

        const label = document.createElement("span");
        label.innerText = 'Курс (USD):* ';
        wrapper.appendChild(label);

        const input = document.createElement("input");
        input.id = this.CURRENCY_INPUT;
        input.type = 'number';
        input.placeholder = "Введіть курс (USD)";

        wrapper.appendChild(input);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper); 
    }

    createResultField(): void
    {
        const wrapper = document.createElement("div");
        wrapper.id = this.RESULT_ID;
        wrapper.className = 'col s12';

        const label = document.createElement("span");
        label.innerText = 'Витрати: ';
        wrapper.appendChild(label);

        const span = document.createElement("span");
        span.id = 'total-purchase'
        span.innerText = "0";

        wrapper.appendChild(span);
        
        const labelTotal = document.createElement("span");
        labelTotal.innerText = 'Залишок: ';
        wrapper.appendChild(labelTotal);

        const spanTotal = document.createElement("span");
        spanTotal.id = 'total-amount'
        spanTotal.innerText = "0";

        wrapper.appendChild(spanTotal);

        document.getElementById(this.CONTENT_ID).appendChild(wrapper); 
    }

    createPurchaseButton()
    {
        const wrapper = document.createElement("div");
        wrapper.id = this.PURCHASE;
        wrapper.className = 'col s4';

        const button = document.createElement("button");
        button.id = this.PURCHASE_BUTTON_ID;
        button.innerText = "Додати запис"
        button.disabled = true;
        button.className = "waves-effect waves-light btn-large green"

        wrapper.appendChild(button);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper); 
    }

    createPurchaseRow()
    {
        const wrapper = document.createElement("div");
        wrapper.className = `row ${this.PURCHASE_ROW_CLASS}`;

        const descriptionWrapper = document.createElement("div");
        descriptionWrapper.className = 'col s7 input-field';

        const description = document.createElement("input");
        const descriptionId = Math.floor(Math.random() * 100);
        description.id = descriptionId;
        description.className = "description"
        description.type = 'text';
        const labelDescription = document.createElement("label");
        labelDescription.htmlFor = descriptionId;
        labelDescription.textContent = "Опис витрати";
        descriptionWrapper.appendChild(description);
        descriptionWrapper.appendChild(labelDescription);
        wrapper.appendChild(descriptionWrapper);

        const usdWrapper = document.createElement("div");
        usdWrapper.className = 'col s2 input-field';
        const usd = document.createElement("input");
        usd.className = "usd-total"
        usd.placeholder = "Сума(USD)";
        usd.type = 'number';
        usdWrapper.appendChild(usd);
        wrapper.appendChild(usdWrapper);

        const uahWrapper = document.createElement("div");
        uahWrapper.className = 'col s2 input-field';
        const uah = document.createElement("input");
        uah.className = "uah-total"
        uah.type = 'number';
        uah.placeholder = "Сума(UAH)";
        uahWrapper.appendChild(uah);
        wrapper.appendChild(uahWrapper);

        const removeWrapper = document.createElement("div");
        removeWrapper.className = 'col s1 input-field';
        const remove = document.createElement("i");
        remove.className = "material-icons remove"
        remove.textContent = 'clear';
        removeWrapper.appendChild(remove);
        wrapper.appendChild(removeWrapper);

        document.getElementById(this.CONTENT_ID).insertBefore(wrapper, document.getElementById(this.PURCHASE)); 
    }

    createSendToTelegramButton()
    {
        const wrapper = document.createElement("div");
        wrapper.id = 'telegram';
        wrapper.className = 'col s5';

        const button = document.createElement("button");
        button.innerText = "Надіслати в Telegram";
        button.id = 'sendToTelegram';
        button.className = "btn btn-large btn-success tooltipped"
        button.setAttribute('data-position', "right");
        button.setAttribute('data-tooltip', "Звіт буде відправлено в телеграм.");
        wrapper.appendChild(button);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper); 
    }
}

class Handler
{
    private control: Control;

    constructor(control: Control)
    {
        this.control = control;
        this.purchaseButtonOnClick();
        this.eventListener();
        this.purchaseButtonState();
    }

    purchaseButtonOnClick(): void
    {
        const purchaseBtn = document.getElementById(control.PURCHASE_BUTTON_ID);
        purchaseBtn.addEventListener("click", (e:Event) => control.createPurchaseRow());
    }

    eventListener(): void
    {
        const _this: Handler = this;
        document.addEventListener('click',function(e){
            if (e.target && e.target.className === 'material-icons remove') {
                  e.path[2].remove();
             }
         });

         document.addEventListener('input',function(e){
            _this.purchaseButtonState();
         });
    }

    purchaseButtonState(): void
    { 
        const balanceInput = document.getElementById(control.BALANCE_INPUT).value;
        const currencyInput = document.getElementById(control.CURRENCY_INPUT).value;
        const purchaseBtn = document.getElementById(control.PURCHASE_BUTTON_ID);

        if (balanceInput === null || 
            balanceInput === "" || 
            currencyInput === null || 
            currencyInput === "") {
            purchaseBtn.disabled = true;
        } else {
            purchaseBtn.disabled = false;
        }
    }
}

class Calculator
{
    constructor()
    {
        this.eventListener();
    }

    eventListener(): void
    {
        const _this: Calculator = this;

        document.addEventListener('input',function(e){
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

        document.addEventListener('click',function(e){
            _this.totalAmount();
        });
    }

    totalAmount()
    {
        let total = 0;
        let purchaseRows = document.getElementsByClassName('usd-total');
        for (let i = 0; i < purchaseRows.length; i++) {       
            let purchase = parseFloat(purchaseRows[i].value) || 0;
            total =  Math.round(((purchase + total) + Number.EPSILON) * 100) / 100;
        }

        let totalAmout = 0;
        let balanceInput = document.getElementById('balanceInput').value;

        document.getElementById('total-purchase').textContent = total;
        document.getElementById('total-amount').textContent = Math.round(((balanceInput - total) + Number.EPSILON) * 100) / 100;
    }

    convertMoney(e: Event)
    {
        let usdInput = e.path[2].childNodes[1].childNodes[0];
        let total = 0;
        let num = 0;
        let uahTotal = parseInt(e.target.value) || 0;
        const currentyRate = parseFloat(document.getElementById('currencyInput').value) || 0;
        num = uahTotal / currentyRate;
        total = Math.round(((num) + Number.EPSILON) * 100) / 100
        usdInput.value = total;
    }

    recalculateContertation()
    {
        $.each($(document).find('.purchaseRow'), (index, element) => {
            let uahVal = parseInt($(element).find('.uah-total').val()) || 0;
            let usdVal = $(element).find('.usd-total');
            const currentyRate = parseFloat(document.getElementById('currencyInput').value) || 0;
            let num = uahVal / currentyRate;
            let total = Math.round(((num) + Number.EPSILON) * 100) / 100
            if (uahVal !== "" && uahVal !== 0) {
                usdVal.val(total);
            }
        })
    }
}

class Telegram
{
    constructor()
    {
        this.telegramButtonOnClick();
    }

    telegramButtonOnClick()
    {
        const button = document.getElementById('sendToTelegram');
        button.addEventListener('click', () => {
            let confirm = window.confirm('Надіслати в Telegram?');
            if (confirm) {
                this.send();
            }
        });
    }

    collectMessage(): string
    {
        let message = "";
        message += `Звіт ${document.getElementById('dateInput').value} \n`;
        let startBalance = document.getElementById('balanceInput').value;
        message += "Попередній залишок " + startBalance + "$ \n\n";
        let rows = document.querySelectorAll('div.purchaseRow');
        for (let i = 0; i < rows.length; i++) {     
            const description = rows[i].querySelector('input.description').value;  
            const usdTotal = rows[i].querySelector('input.usd-total').value + "$";
            if (description !== "" && usdTotal !== "") {
                message += description + ' - ' + usdTotal + " \n\n";
            }
        }

        let totalAmount = document.getElementById('total-amount').textContent;
        message += "Поточний залишок: " + totalAmount + "$"

        return message;
    }

    send() {
        let preloader = document.getElementById('preloader');
        let content = document.getElementById('content');
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
          }
          
          $.ajax(settings).done(function (response) {
            preloader.className = 'preloader-wrapper big';
            content.className = 'row';
            M.toast({html: 'Відправлено!', classes: 'green', inDuration: 500})
          }); 
    }
}

const control: Control = new Control();
const handler: Handler = new Handler(control);
const calculator: Calculator = new Calculator();
const telegram: Telegram = new Telegram();
