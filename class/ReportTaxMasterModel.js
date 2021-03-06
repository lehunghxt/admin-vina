module.exports = class ReportTaxMaster {
    constructor(data) {
        this.TemptCode = data.TemptCode;
        this.Symbol = data.Symbol;
        this.InvoiceNumber = data.InvoiceNumber;
        this.DateofInvoice = data.DateofInvoice;
        this.DateofSign = data.DateofSign;
        this.BuyerSignDate = data.SignBuyDate ? data.SignBuyDate : data.BuyerSignDate;
        this.CompanyTaxcode = data.CompanyTaxcode;
        this.PaymentTerm = data.PaymentTerm;
        this.OtherCharges = data.OtherCharges;
        this.Status = data.Status;
        this.CompanyName = data.CompanyName;
        this.TotalMoneyNoTax = data.TotalMoneyNoTax;
        this.MoneyTax = data.MoneyTax;
        this.TotalMoney = data.TotalMoney;
        this.CompanyAdd = data.CompanyAdd;
        this.OtherTax = data.OtherTax;
        this.Tax = data.Tax;
        this.ContractName = data.ContractName;
        this.ContentInvoiceDelete = data.ContentInvoiceDelete;
        this.ServiceCharge = data.ServiceCharge;
        this.ServiceTax = data.ServiceTax;
        this.ServiceAmountTax = data.ServiceAmountTax;
        this.TotalServiceAmount = data.TotalServiceAmount;
        this.TotalAmount = data.TotalAmount;
        this.TotalAmountInWords = data.TotalAmountInWords;
        this.NoticeissuedId = data.NoticeissuedId;
        this.CreateBy = data.CreateBy;
        this.Id = parseInt(data.Id);
        this.SignXML = data.SignXML ? data.SignXML : data.SignXmlFile;
        this.SignXMLBuy = data.SignXMLBuy ? data.SignXMLBuy : data.SignXmlFileBuy;
        this.IsChange = data.IsChange;
        this.IsAdjusted = data.IsAdjusted;
        this.IsConvert = data.IsConvert;
        this.ConvertDate = data.ConvertDate;
        this.SellerName = data.SellerName;
        this.SellerTaxCode = data.SellerTaxCode;
        this.SellerAddress = data.SellerAddress;
        this.MoneyCode = data.MoneyCode;
        this.ExchangeRate = data.ExchangeRate;
        this.SellerCertificate = data.SellerCertificate;
        this.BuyerCertificate = data.BuyerCertificate;
        this.InvoiceCode = data.IvoiceCode ? data.IvoiceCode : data.InvoiceCode;
        this.ProcessedInvoiceCode = data.ProcessedInvoiceCode;
        this.ProcessedDate = data.ProcessedDate;
    }
}