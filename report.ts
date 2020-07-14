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
        this.createBalanceInput();
        this.createCurrencyInput();
        this.createPurchaseButton();
        this.createResultField();
    }

    createBalanceInput(): void
    {
        const wrapper = document.createElement("div");
        wrapper.id = this.BALANCE_ID;
        wrapper.className = 'col-md-6';
        
        const label = document.createElement("span");
        label.innerText = 'Баланс(USD):';
        wrapper.appendChild(label);

        const input = document.createElement("input");
        input.type = 'number';
        input.id = this.BALANCE_INPUT;
        input.placeholder = "Введите баланс";

        wrapper.appendChild(input);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper); 
    }

    createCurrencyInput(): void
    {
        const wrapper = document.createElement("div");
        wrapper.id = this.CURRENCY_ID;
        wrapper.className = 'col-md-6';

        const label = document.createElement("span");
        label.innerText = 'Курс (USD):';
        wrapper.appendChild(label);

        const input = document.createElement("input");
        input.id = this.CURRENCY_INPUT;
        input.type = 'number';
        input.placeholder = "Введите курс(USD)";

        wrapper.appendChild(input);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper); 
    }

    createResultField(): void
    {
        const wrapper = document.createElement("div");
        wrapper.id = this.RESULT_ID;
        wrapper.className = 'col-md-12';

        const label = document.createElement("span");
        label.innerText = 'Результат:';
        wrapper.appendChild(label);

        const div = document.createElement("span");
        div.innerText = "0";

        wrapper.appendChild(div);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper); 
    }

    createPurchaseButton()
    {
        const wrapper = document.createElement("div");
        wrapper.id = this.PURCHASE;
        wrapper.className = 'col-md-12';

        const button = document.createElement("button");
        button.innerText = "Добавить запись.";
        button.id = this.PURCHASE_BUTTON_ID;
        button.disabled = true;
        button.className = "btn btn-large btn-info"
        
        wrapper.appendChild(button);
        document.getElementById(this.CONTENT_ID).appendChild(wrapper); 
    }

    createPurchaseRow()
    {
        const wrapper = document.createElement("div");
        wrapper.className = `col-md-12 ${this.PURCHASE_ROW_CLASS}`;

        const description = document.createElement("input");
        description.placeholder = "Описание";
        description.className = "description"
        wrapper.appendChild(description);

        const usd = document.createElement("input");
        usd.placeholder = "Сумма(USD)";
        usd.className = "usd-total"
        wrapper.appendChild(usd);

        const uah = document.createElement("input");
        uah.placeholder = "Сумма(UAH)";
        uah.className = "uah-total"
        wrapper.appendChild(uah);

        const remove = document.createElement("i");
        remove.className = "fa fa-trash"
        wrapper.appendChild(remove);

        document.getElementById(this.CONTENT_ID).insertBefore(wrapper, document.getElementById(this.PURCHASE)); 
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
            if (e.target && e.target.className === 'fa fa-trash'){
                  e.path[1].remove();
                  // Todo 
                  // RECALCULATE
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

const control: Control = new Control();
const handler: Handler = new Handler(control);