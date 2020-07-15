import Control from "./Control";

export default class Handler
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