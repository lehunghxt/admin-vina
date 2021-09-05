module.exports = class ReportTaxDetail {
    constructor(data) {
        this.IvoiceId = data.IvoiceId;
        this.InvoiceCode = data.InvoiceCode;
        this.TemptCode = data.TemptCode;
        this.Symbol = data.Symbol;
        this.InvoiceNumber = data.InvoiceNumber;
        this.SellerTaxcode = data.SellerTaxcode;
        this.STT = 0;
        this.ProductName = data.ProductName;
        this.Unit = data.Unit;
        this.Price = data.Price;
        this.Number = data.Number;
        this.DiscountPercentage = 0;
        this.DiscountMoney = data.DiscountMoney;
        this.TotalMoney = data.TotalMoney;
        this.Tax = data.Tax;
        this.MoneyTax = data.MoneyTax;
        this.TotalMoneyAfterTax = data.TotalMoneyAfterTax;
        this.Discount = false;
    }
}