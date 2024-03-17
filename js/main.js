(function onLoad() {
    // set a function for each button
    setButtonFunctions();

    // fetch from each API when the page loads
    generateRandomAlphaNumeric();
    sendTransaction();
    displayResponse();
})();

function setButtonFunctions() {
    document.getElementById('buttonSendTransaction').onclick = sendTransaction;
};

var generatedProcessorTransactionId = "";
var generatedProcessorLifeCycleId = "";

function generateRandomAlphaNumeric(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
function showErrorPopup(message) {
    alert(message); // Display error message in a popup
}
async function sendTransaction() {
    var selectedTransactionType = document.getElementById('txnType').value;


    // Below Mandatory Check for InputField
    if (selectedTransactionType == "auth") {
        var amount = document.getElementById('amount').value;
        var cardId = document.getElementById('cardId').value;
        // Check if amount and card ID are not empty
        if (amount.trim() === '' || cardId.trim() === '') {
            showErrorPopup('Please fill in all mandatory fields (Amount and Card Number).');
            return; // Prevent form submission if mandatory fields are empty
        }
    }
    else if (selectedTransactionType == "balanceInquiry") {
        var cardId = document.getElementById('cardId').value;
        // Check if card ID are not empty
        if (cardId.trim() === '') {
            showErrorPopup('Please fill in all mandatory fields (Card Number).');
            return; // Prevent form submission if mandatory fields are empty
        }
    }
    else {
        var amount = document.getElementById('amount').value;
        var cardId = document.getElementById('cardId').value;
        var processorTransactionId = document.getElementById('processorTransactionId').value;
        var processorLifeCycleId = document.getElementById('processorLifeCycleId').value;
        // Check if amount,card ID ,ParentProcessorTransactionId & ParentProcessorLifeCycleId are not empty
        if (amount.trim() === '' || cardId.trim() === '' || processorTransactionId.trim() === '' || processorLifeCycleId.trim() === '') {
            showErrorPopup('Please fill in all mandatory fields (Amount , Card Number , ParentProcessorTransactionId and ParentProcessorLifeCycleId ).');
            return; // Prevent form submission if mandatory fields are empty
        }
    }

    // Setting Up the BaseURL
    var BaseUrl = "https://qa-api.sbx.solidfi.com/v1"
    var apiUrl;
    console.log(selectedTransactionType);
    switch (selectedTransactionType) {
        case "auth":
        case "AuthRefund":
            apiUrl = "/visadps/authorisations";
            break;
        case "authUpdate":
        case "AuthAgingAdvice":
            apiUrl = "/visadps/authorisations/advices";
            break;
        case "refund":
        case "Settlement":
            apiUrl = "/visadps/financials/advices";
            break;
        case "reversal":
            apiUrl = "/visadps/reversals";
            break;
        case "OCT":
        case "ATMWithdrawl":
        case "ATMDeposit":
        case "CashBack":
        case "CreditAdjustment":
        case "DebitAdjustment":
        case "IncomingCardPull":
            apiUrl = "/visadps/financials";
            break;
        case "balanceInquiry":
            apiUrl = "/visadps/inquiries";
            break;
    }
 
    //PAYLOAD DATA
    var balanceInquirydata = {
        Hdr: {
            MsgFctn: "REQU",
            PrtcolVrsn: "2.49.1",
            InitgPty: {
                Id: "VisaDPS"
            },
            CreDtTm: new Date().toISOString()
        },
        Body: {
            Tx: {
                TxTp: "31",
                TxId: {
                    TysTracAudtNb: "000001",
                    LclDtTm: "2022-06-01T12:00:00",
                    RtrvlRefNb: "215218000001",
                    CardIssrRefData: JSON.stringify({
                        "CARD-ID": document.getElementById('cardId').value,
                        "ProcessorTransactionId": generatedProcessorTransactionId = generateRandomAlphaNumeric(64),
                        "ProcessorLifeCycleId": generatedProcessorLifeCycleId = generateRandomAlphaNumeric(64)
                    })
                }
            },
            Cntxt: {
                TxCntxt: {
                    MrchntCtgyCd: "6011"
                }
            },
            Envt: {
                Accptr: {
                    Adr: {
                        "Ctry": "USA",
                        "CtrySubDvsnMjr": "06",
                        "PstlCd": "94044    "
                    },
                    Id: "MULTCLEAR      ",
                    NmAndLctn: "BUCKS OF STAR TEA      DENVER       COUS"
                },
                Acqrr: {
                    Id: "59992960009"
                }
            }
        }
    };

    var authdata = {
        Hdr: {
            MsgFctn: "REQU",
            PrtcolVrsn: "2.49.1",
            InitgPty: {
                Id: "VisaDPS"
            },
            CreDtTm: new Date().toISOString()
        },
        Body: {
            Tx: {
                AcctFr: {
                    AcctTp: "00"
                },
                TxTp: "00",
                AddtlAmts: [],
                TxAmts: {
                    TxAmt: {
                        Amt: parseFloat(document.getElementById('amount').value),
                        Ccy: "840"
                    },
                    RcncltnAmt: {
                        Amt: parseFloat(document.getElementById('amount').value),
                        XchgRate: 1,
                        Ccy: "840",
                        QtnDt: new Date().toISOString()
                    },
                    CrdhldrBllgAmt: {
                        Amt: parseFloat(document.getElementById('amount').value),
                        XchgRate: 1,
                        Ccy: "840"
                    },
                    AmtQlfr: "ESTM",
                    DtldAmt: [{
                        Amt: {
                            Amt: parseFloat(document.getElementById('amount').value)
                        },
                        OthrTp: "BASE",
                        Tp: "OTHP"
                    }]
                },
                TxId: {
                    TrnsmssnDtTm: new Date().toISOString(),
                    SysTracAudtNb: "901530",
                    LclDtTm: new Date().toISOString(),
                    RtrvlRefNb: "404331901530",
                    CardIssrRefData: JSON.stringify({
                        "CARD-ID": document.getElementById('cardId').value,
                        "ProcessorTransactionId": selectedTransactionType === 'auth' ? (generatedProcessorTransactionId = generateRandomAlphaNumeric(64)) : document.getElementById('processorTransactionId').value,
                        "ProcessorLifeCycleId": selectedTransactionType === 'auth' ? (generatedProcessorLifeCycleId = generateRandomAlphaNumeric(64)) : document.getElementById('processorLifeCycleId').value
                    }),
                    AcqrrRefData: "469216     ",
                    LifeCyclTracIdData: {
                        Id: "464043146519807"
                    }
                },
                AddtlData: [{
                    Tp: "SPECIALTRANSIND",
                    Val: "T"
                },
                {
                    Tp: "VAUResult",
                    Val: "0"
                },
                {
                    Tp: "CryptoPurchInd",
                    Val: "N"
                },
                {
                    Tp: "DeferredAuthInd",
                    Val: "N"
                }
                ],
                SpclPrgrmmQlfctn: [{
                    Dtl: [{
                        Nm: "MVV",
                        Val: "2005590000"
                    }]
                }]
            },
            Cntxt: {
                PtOfSvcCntxt: {
                    CardDataNtryMd: "KEEN",
                    AttnddInd: false,
                    CrdhldrActvtd: true,
                    EComrcInd: true,
                    CrdhldrPres: false,
                    CardPres: false,
                    PrtlApprvlSpprtd: false,
                    EComrcData: [{
                        Tp: "ECI",
                        Val: "5"
                    }]
                },
                Vrfctn: [{
                    VrfctnRslt: [{
                        RsltDtls: [{
                            Tp: "CAMReliability",
                            Val: "0"
                        }]
                    }]
                },
                {
                    Tp: "THDS",
                    SubTp: "Visa",
                    VrfctnInf: [{
                        Tp: "Method",
                        Val: {
                            TxtVal: "Z"
                        }
                    }]
                },
                {
                    Tp: "CHSA",
                    SubTp: "AR",
                    VrfctnRslt: [{
                        Rslt: "SUCC",
                        RsltDtls: [{
                            Tp: "AVS result",
                            Val: "Y"
                        }]
                    }],
                    VrfctnInf: [{
                        Tp: "PCDV",
                        Val: {
                            TxtVal: "321191626"
                        }
                    },
                    {
                        Tp: "ADDB",
                        Val: {
                            TxtVal: "2"
                        }
                    }
                    ]
                }
                ],
                RskCntxt: [{
                    rskInptData: [{
                        tp: "VisaRiskScore",
                        val: "24"
                    },
                    {
                        tp: "VisaRiskReason",
                        val: "00"
                    },
                    {
                        tp: "VisaRiskCondCode1",
                        val: "00"
                    },
                    {
                        tp: "VisaRiskCondCode2",
                        val: "00"
                    },
                    {
                        tp: "VisaRiskCondCode3",
                        val: "00"
                    }
                    ],
                    _class: "com.visa.ip.iso20022.model.RiskContext"
                }],
                TxCntxt: {
                    Rcncltn: {
                        Dt: new Date().toISOString(),
                        Id: "VISAInternational"
                    },
                    MrchntCtgyCd: "5942",
                    SttlmSvc: {
                        SttlmSvcApld: {
                            Tp: "VISAInternational"
                        }
                    },
                    CardPrgrmm: {
                        CardPrgrmmApld: {
                            Id: "VSN"
                        }
                    },
                    ICCFllbckInd: false
                }
            },
            Envt: {
                Accptr: {
                    NmAndLctn: "AMZN Mktp US           Amzn.com/billWAUS",
                    Adr: {
                        Ctry: "USA",
                        CtrySubDvsnMjr: "53",
                        PstlCd: "98109    "
                    },
                    Id: "235251000762203"
                },
                Termnl: {
                    TermnlId: {
                        Id: "99999999"
                    },
                    Cpblties: {
                        CardCaptrCpbl: false,
                        CardRdngCpblty: ["UNSP"],
                        CrdhldrVrfctnCpblty: [{
                            Cpblty: "UNSP"
                        }],
                        PINPadInprtv: false
                    },
                    Tp: "OTHP",
                    OthrTp: "03"
                },
                Sndr: {
                    Id: "11111111111"
                },
                Card: {
                    XpryDt: "2610",
                    PmtAcctRef: "V0010013823307740289498425624",
                    PAN: "9999999999997117"
                },
                Acqrr: {
                    Ctry: "840",
                    Id: "59000002422"
                },
                Tkn: {
                    PmtTkn: "4316227171030331",
                    TknAssrncData: "10",
                    TknRqstrId: "40010051602",
                    TknXpryDt: "2610"
                }
            },
            SplmtryData: [{
                Envlp: {}
            }]
        }
    };

    var authUpdatedata = {
        Hdr: {
            CreDtTm: new Date().toISOString(),
            InitgPty: {
                Id: "VisaDPS"
            },
            MsgFctn: "ADVC",
            PrtcolVrsn: "2.49.1"
        },
        Body: {
            Cntxt: {
                PtOfSvcCntxt: {
                    AttnddInd: true,
                    CardDataNtryMd: "UNSP",
                    CardPres: false,
                    CrdhldrActvtd: true,
                    MOTOInd: true
                },
                RskCntxt: [
                    {
                        RskInptData: [
                            {
                                Tp: "FalconScoreSource",
                                Val: "6"
                            },
                            {
                                Tp: "FalconScoreValue",
                                Val: "0000"
                            },
                            {
                                Tp: "FalconRespCode",
                                Val: "0"
                            },
                            {
                                Tp: "FalconReason1",
                                Val: "00"
                            },
                            {
                                Tp: "FalconReason2",
                                Val: "00"
                            },
                            {
                                Tp: "FalconReason3",
                                Val: "00"
                            }
                        ]
                    }
                ],
                TxCntxt: {
                    CardPrgrmm: {
                        CardPrgrmmApld: {
                            Id: "VSN"
                        }
                    },
                    ICCFllbckInd: false,
                    MrchntCtgyCd: "5965",
                    Rcncltn: {
                        Dt: "2023-05-01",
                        Id: "VISAInternational"
                    },
                    SttlmSvc: {
                        SttlmSvcApld: {
                            Tp: "VISAInternational"
                        }
                    }
                },
                Vrfctn: [
                    {
                        VrfctnRslt: [
                            {
                                RsltDtls: [
                                    {
                                        Tp: "CAMReliability",
                                        Val: "0"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        SubTp: "Visa",
                        Tp: "THDS",
                        VrfctnInf: [
                            {
                                Tp: "Method",
                                Val: {
                                    TxtVal: "Z"
                                }
                            }
                        ]
                    },
                    {
                        Tp: "NVSC",
                        VrfctnRslt: [
                            {
                                Rslt: "SUCC"
                            }
                        ]
                    }
                ]
            },
            Envt: {
                Accptr: {
                    Adr: {
                        Ctry: "USA",
                        CtrySubDvsnMjr: "06",
                        PstlCd: "94044    "
                    },
                    Id: "MULTCLEAR      ",
                    NmAndLctn: "BUCKS OF STAR TEA      DENVER       COUS"
                },
                Acqrr: {
                    Id: "59000000204"
                },
                Card: {
                    PAN: "9999999999994368",
                    XpryDt: "2504"
                },
                Sndr: {
                    Id: "11111111111"
                },
                Termnl: {
                    Cpblties: {
                        CardCaptrCpbl: false,
                        CardRdngCpblty: [
                            "UNSP"
                        ],
                        CrdhldrVrfctnCpblty: [
                            {
                                Cpblty: "UNSP"
                            }
                        ],
                        PINPadInprtv: false
                    },
                    OffPrmissInd: false,
                    TermnlId: {
                        Id: "TERMID01"
                    },
                    Tp: "POST"
                }
            },
            Tx: {
                AcctFr: {
                    AcctTp: "00"
                },
                AddtlAmts: [
                    {
                        Amt: {
                            Amt: parseFloat(document.getElementById('amount').value),
                            Ccy: "USD"
                        },
                        Labl: "DEBIT_HOLD_INCREASE",
                        OthrTp: "HOLD",
                        Tp: "OTHP"
                    }
                ],
                AddtlData: [
                    {
                        Tp: "VAUResult",
                        Val: "0"
                    },
                    {
                        Tp: "CryptoPurchInd",
                        Val: "N"
                    },
                    {
                        Tp: "DeferredAuthInd",
                        Val: "N"
                    }
                ],
                SpclPrgrmmQlfctn: [
                    {
                        Dtl: [
                            {
                                Nm: "FPI",
                                Val: "101"
                            },
                            {
                                Nm: "MVV",
                                Val: "0123456789"
                            }
                        ]
                    },
                    {}
                ],
                TxAmts: {
                    AmtQlfr: "ESTM",
                    CrdhldrBllgAmt: {
                        Amt: parseFloat(document.getElementById('amount').value),
                        Ccy: "USD",
                        XchgRate: 1
                    },
                    DtldAmt: [
                        {
                            Amt: {
                                Amt: parseFloat(document.getElementById('amount').value),
                            },
                            OthrTp: "BASE",
                            Tp: "OTHP"
                        }
                    ],
                    RcncltnAmt: {
                        Amt: parseFloat(document.getElementById('amount').value),
                        Ccy: "USD",
                        QtnDt: "2023-04-06T00:00:00Z",
                        XchgRate: 1
                    },
                    TxAmt: {
                        Amt: parseFloat(document.getElementById('amount').value),
                        Ccy: "USD"
                    }
                },
                TxId: {
                    AcqrrRefData: "12345678901",
                    cardIssrRefData: JSON.stringify({
                        "CARD-ID": document.getElementById('cardId').value,
                        "ProcessorTransactionId": generatedProcessorTransactionId = generateRandomAlphaNumeric(64),
                        "ProcessorTransactionIdCollection": [{
                            "ProcessorTransactionId": document.getElementById('processorTransactionId').value,
                            "MsgFctn": "REQU"
                        }],
                        "ProcessorLifeCycleId": document.getElementById('processorLifeCycleId').value
                    }),
                    LclDtTm: new Date().toISOString(),
                    LifeCyclTracIdData: {
                        Id: "001680722186868"
                    },
                    RtrvlRefNb: "765643377823",
                    SysTracAudtNb: "265918",
                    TrnsmssnDtTm: "2023-05-01T14:36:45Z"
                },
                TxTp: "00"
            }
        }
    };

    var reversaldata = {
        Hdr: {
            MsgFctn: "ADVC",
            PrtcolVrsn: "2.49.1",
            InitgPty: {
                Id: "VisaDPS"
            },
            CreDtTm: new Date().toISOString()
        },
        Body: {
            Tx: {
                TxTp: "22",
                TxAmts: {
                    TxAmt: {
                        Amt: parseFloat(document.getElementById('amount').value),
                        Ccy: "840"
                    },
                    CrdhldrBllgAmt: {
                        Amt: parseFloat(document.getElementById('amount').value),
                        XchgRate: 1,
                        Ccy: "840"
                    }
                },
                TxId: {
                    SysTracAudtNb: "000007",
                    LclDtTm: new Date().toISOString(),
                    RtrvlRefNb: "765643377823",
                    cardIssrRefData: JSON.stringify({
                        "CARD-ID": document.getElementById('cardId').value,
                        "ProcessorTransactionId": generatedProcessorTransactionId = generateRandomAlphaNumeric(64),
                        "ProcessorTransactionIdCollection": [{
                            "ProcessorTransactionId": document.getElementById('processorTransactionId').value,
                            "MsgFctn": "REQU"
                        }],
                        "ProcessorLifeCycleId": document.getElementById('processorLifeCycleId').value
                    }),
                },
                AltrnMsgRsn: [
                    "2800"
                ]
            },
            Cntxt: {
                TxCntxt: {
                    MrchntCtgyCd: "5999"
                }
            },
            Envt: {
                Accptr: {
                    NmAndLctn: "BUCKS OF STAR TEA      DENVER       COUS"
                },
                Acqrr: {
                    Id: "59000000204"
                }
            },
            PrcgRslt: {
                RsltData: {
                    RsltDtls: "00"
                }
            }
        }
    }

    var refunddata = {
        Hdr: {
            MsgFctn: "ADVC",
            PrtcolVrsn: "2.49.1",
            InitgPty: {
                Id: "VisaDPS"
            },
            CreDtTm: new Date().toISOString()
        },
        Body: {
            Tx: {
                TxTp: "20",
                TxAmts: {
                    TxAmt: {
                        Amt: parseFloat(document.getElementById('amount').value),
                        Ccy: "840"
                    },
                    CrdhldrBllgAmt: {
                        Amt: parseFloat(document.getElementById('amount').value),
                        XchgRate: 1,
                        Ccy: "840"
                    }
                },
                TxId: {
                    SysTracAudtNb: "000007",
                    LclDtTm: new Date().toISOString(),
                    RtrvlRefNb: "765643377823",
                    cardIssrRefData: JSON.stringify({
                        "CARD-ID": document.getElementById('cardId').value,
                        "ProcessorTransactionId": generatedProcessorTransactionId = generateRandomAlphaNumeric(64),
                        "ProcessorTransactionIdCollection": [{
                            "ProcessorTransactionId": document.getElementById('processorTransactionId').value,
                            "MsgFctn": "REQU"
                        }],
                        "ProcessorLifeCycleId": document.getElementById('processorLifeCycleId').value
                    }),
                },
                AltrnMsgRsn: [
                    "2800"
                ]
            },
            Cntxt: {
                TxCntxt: {
                    MrchntCtgyCd: "5999"
                }
            },
            Envt: {
                Accptr: {
                    NmAndLctn: "BUCKS OF STAR TEA      DENVER       COUS"
                },
                Acqrr: {
                    Id: "59000000204"
                }
            },
            PrcgRslt: {
                RsltData: {
                    RsltDtls: "00"
                }
            }
        }
    }

    // Send data to API
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BaseUrl + apiUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            displayResponse(response);
        }
    };
    //Pass the RequestPayload based on TxnType
    if (selectedTransactionType == "balanceInquiry")
        xhr.send(JSON.stringify(balanceInquirydata));
    else if (selectedTransactionType == "auth")
        xhr.send(JSON.stringify(authdata));
    else if (selectedTransactionType == "authUpdate")
        xhr.send(JSON.stringify(authUpdatedata));
    else if (selectedTransactionType == "reversal")
        xhr.send(JSON.stringify(reversaldata));
    else if (selectedTransactionType == "refund")
        xhr.send(JSON.stringify(refunddata));

}

// DISPLAY RESPONSE FUNCTION
function displayResponse(response) {
    var responseText = "Transaction Response Code: " + response.Body.PrcgRslt.RsltData.RsltDtls + "<br>";

    if (document.getElementById('txnType').value == "balanceInquiry") {
        console.log(document.getElementById('txnType').value)
        responseText += "Available Balance: " + response.Body.Tx.AcctBal[0].Bal[0].Amt + " USD"+"<br>";
    }
    else {
        responseText += "ProcessorTransactionId: " + generatedProcessorTransactionId + "<br>";
        responseText += "ProcessorLifeCycleId: " + generatedProcessorLifeCycleId + "<br>";
    }
    document.getElementById('responseText').innerHTML = responseText;
    document.getElementById('responseContainer').style.display = 'block';
}
