/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ (() => {

eval("(function onLoad() {\r\n    // set a function for each button\r\n    setButtonFunctions();\r\n    generateRandomAlphaNumeric();\r\n    displayResponse();\r\n})();\r\n\r\nfunction setButtonFunctions() {\r\n    document.getElementById('buttonSendTransaction').onclick = sendTransaction;\r\n};\r\n\r\nvar generatedProcessorTransactionId = \"\";\r\nvar generatedProcessorLifeCycleId = \"\";\r\n\r\nfunction generateRandomAlphaNumeric(length) {\r\n    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';\r\n    var result = '';\r\n    for (var i = 0; i < length; i++) {\r\n        result += chars.charAt(Math.floor(Math.random() * chars.length));\r\n    }\r\n    return result;\r\n}\r\nfunction showErrorPopup(message) {\r\n    alert(message); // Display error message in a popup\r\n}\r\n\r\n\r\nasync function sendTransaction() {\r\n    var selectedTransactionType = document.getElementById('txnType').value;\r\n    var selectedEnvironment = document.getElementById('environment').value;\r\n\r\n    // Regular expression pattern for the cardId format\r\n     var pattern = /^v-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/;\r\n\r\n    // Below Mandatory Check for InputField\r\n    if (selectedTransactionType == \"auth\") {\r\n        var amount = document.getElementById('amount').value;\r\n        var cardId = document.getElementById('cardId').value;\r\n        //Check if amount and card ID are not empty\r\n        if (amount.trim() === '' || cardId.trim() === '') {\r\n            showErrorPopup('Please fill in all mandatory fields (Amount and Card Number).');\r\n            return; // Prevent form submission if mandatory fields are empty\r\n        }\r\n        if (!pattern.test(cardId)) {\r\n            alert('Please enter a valid cardId in the format v-xxx-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');\r\n            return; // Prevent further execution of the function\r\n        }\r\n    }\r\n    else if (selectedTransactionType == \"balanceInquiry\") {\r\n        var cardId = document.getElementById('cardId').value;\r\n        // Check if card ID are not empty\r\n        if (cardId.trim() === '') {\r\n            showErrorPopup('Please fill in all mandatory fields (Card Number).');\r\n            return; // Prevent form submission if mandatory fields are empty\r\n        }\r\n        if (!pattern.test(cardId)) {\r\n            alert('Please enter a valid cardId in the format v-xxx-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');\r\n            return; // Prevent further execution of the function\r\n        }\r\n    }\r\n    else {\r\n        var amount = document.getElementById('amount').value;\r\n        var cardId = document.getElementById('cardId').value;\r\n        var processorTransactionId = document.getElementById('processorTransactionId').value;\r\n        var processorLifeCycleId = document.getElementById('processorLifeCycleId').value;\r\n        // Check if amount,card ID ,ParentProcessorTransactionId & ParentProcessorLifeCycleId are not empty\r\n        if (amount.trim() === '' || cardId.trim() === '' || processorTransactionId.trim() === '' || processorLifeCycleId.trim() === '') {\r\n            showErrorPopup('Please fill in all mandatory fields (Amount , Card Number , ParentProcessorTransactionId and ParentProcessorLifeCycleId ).');\r\n            return; // Prevent form submission if mandatory fields are empty\r\n        }\r\n        if (!pattern.test(cardId)) {\r\n            alert('Please enter a valid cardId in the format v-xxx-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');\r\n            return; // Prevent further execution of the function\r\n        }\r\n    }\r\n\r\n    var BaseUrl;\r\n    // Setting Up the BaseURL\r\n    console.log(selectedEnvironment);\r\n    switch (selectedEnvironment) {\r\n        case \"Dev\":\r\n            BaseUrl = \"https://dev-api.sbx.solidfi.com/v1\";\r\n            break;\r\n        case \"QA\":\r\n            BaseUrl = \"https://qa-api.sbx.solidfi.com/v1\";\r\n            break;\r\n        case \"Staging\":\r\n            BaseUrl = \"https://staging-api.sbx.solidfi.com/v1\";\r\n            break;\r\n        case \"ProdTest\":\r\n            BaseUrl = \"https://test-api.solidfi.com/v1\";\r\n\r\n    }\r\n    var apiUrl;\r\n    console.log(selectedTransactionType);\r\n    switch (selectedTransactionType) {\r\n        case \"auth\":\r\n        case \"AuthRefund\":\r\n            apiUrl = \"/visadps/authorisations\";\r\n            break;\r\n        case \"authUpdate\":\r\n        case \"AuthAgingAdvice\":\r\n            apiUrl = \"/visadps/authorisations/advices\";\r\n            break;\r\n        case \"refund\":\r\n        case \"Settlement\":\r\n            apiUrl = \"/visadps/financials/advices\";\r\n            break;\r\n        case \"reversal\":\r\n            apiUrl = \"/visadps/reversals\";\r\n            break;\r\n        case \"OCT\":\r\n        case \"ATMWithdrawl\":\r\n        case \"ATMDeposit\":\r\n        case \"CashBack\":\r\n        case \"CreditAdjustment\":\r\n        case \"DebitAdjustment\":\r\n        case \"IncomingCardPull\":\r\n            apiUrl = \"/visadps/financials\";\r\n            break;\r\n        case \"balanceInquiry\":\r\n            apiUrl = \"/visadps/inquiries\";\r\n            break;\r\n    }\r\n\r\n    //PAYLOAD DATA\r\n    var balanceInquirydata = {\r\n        Hdr: {\r\n            MsgFctn: \"REQU\",\r\n            PrtcolVrsn: \"2.49.1\",\r\n            InitgPty: {\r\n                Id: \"VisaDPS\"\r\n            },\r\n            CreDtTm: new Date().toISOString()\r\n        },\r\n        Body: {\r\n            Tx: {\r\n                TxTp: \"31\",\r\n                TxId: {\r\n                    TysTracAudtNb: \"000001\",\r\n                    LclDtTm: \"2022-06-01T12:00:00\",\r\n                    RtrvlRefNb: \"215218000001\",\r\n                    CardIssrRefData: JSON.stringify({\r\n                        \"CARD-ID\": document.getElementById('cardId').value,\r\n                        \"ProcessorTransactionId\": generatedProcessorTransactionId = generateRandomAlphaNumeric(64),\r\n                        \"ProcessorLifeCycleId\": generatedProcessorLifeCycleId = generateRandomAlphaNumeric(64)\r\n                    })\r\n                }\r\n            },\r\n            Cntxt: {\r\n                TxCntxt: {\r\n                    MrchntCtgyCd: \"6011\"\r\n                }\r\n            },\r\n            Envt: {\r\n                Accptr: {\r\n                    Adr: {\r\n                        \"Ctry\": \"USA\",\r\n                        \"CtrySubDvsnMjr\": \"06\",\r\n                        \"PstlCd\": \"94044    \"\r\n                    },\r\n                    Id: \"MULTCLEAR      \",\r\n                    NmAndLctn: \"BUCKS OF STAR TEA      DENVER       COUS\"\r\n                },\r\n                Acqrr: {\r\n                    Id: \"59992960009\"\r\n                }\r\n            }\r\n        }\r\n    };\r\n\r\n    var authdata = {\r\n        Hdr: {\r\n            MsgFctn: \"REQU\",\r\n            PrtcolVrsn: \"2.49.1\",\r\n            InitgPty: {\r\n                Id: \"VisaDPS\"\r\n            },\r\n            CreDtTm: new Date().toISOString()\r\n        },\r\n        Body: {\r\n            Tx: {\r\n                AcctFr: {\r\n                    AcctTp: \"00\"\r\n                },\r\n                TxTp: \"00\",\r\n                AddtlAmts: [],\r\n                TxAmts: {\r\n                    TxAmt: {\r\n                        Amt: parseFloat(document.getElementById('amount').value),\r\n                        Ccy: \"840\"\r\n                    },\r\n                    RcncltnAmt: {\r\n                        Amt: parseFloat(document.getElementById('amount').value),\r\n                        XchgRate: 1,\r\n                        Ccy: \"840\",\r\n                        QtnDt: new Date().toISOString()\r\n                    },\r\n                    CrdhldrBllgAmt: {\r\n                        Amt: parseFloat(document.getElementById('amount').value),\r\n                        XchgRate: 1,\r\n                        Ccy: \"840\"\r\n                    },\r\n                    AmtQlfr: \"ESTM\",\r\n                    DtldAmt: [{\r\n                        Amt: {\r\n                            Amt: parseFloat(document.getElementById('amount').value)\r\n                        },\r\n                        OthrTp: \"BASE\",\r\n                        Tp: \"OTHP\"\r\n                    }]\r\n                },\r\n                TxId: {\r\n                    TrnsmssnDtTm: new Date().toISOString(),\r\n                    SysTracAudtNb: \"901530\",\r\n                    LclDtTm: new Date().toISOString(),\r\n                    RtrvlRefNb: \"404331901530\",\r\n                    CardIssrRefData: JSON.stringify({\r\n                        \"CARD-ID\": document.getElementById('cardId').value,\r\n                        \"ProcessorTransactionId\": selectedTransactionType === 'auth' ? (generatedProcessorTransactionId = generateRandomAlphaNumeric(64)) : document.getElementById('processorTransactionId').value,\r\n                        \"ProcessorLifeCycleId\": selectedTransactionType === 'auth' ? (generatedProcessorLifeCycleId = generateRandomAlphaNumeric(64)) : document.getElementById('processorLifeCycleId').value\r\n                    }),\r\n                    AcqrrRefData: \"469216     \",\r\n                    LifeCyclTracIdData: {\r\n                        Id: \"464043146519807\"\r\n                    }\r\n                },\r\n                AddtlData: [{\r\n                    Tp: \"SPECIALTRANSIND\",\r\n                    Val: \"T\"\r\n                },\r\n                {\r\n                    Tp: \"VAUResult\",\r\n                    Val: \"0\"\r\n                },\r\n                {\r\n                    Tp: \"CryptoPurchInd\",\r\n                    Val: \"N\"\r\n                },\r\n                {\r\n                    Tp: \"DeferredAuthInd\",\r\n                    Val: \"N\"\r\n                }\r\n                ],\r\n                SpclPrgrmmQlfctn: [{\r\n                    Dtl: [{\r\n                        Nm: \"MVV\",\r\n                        Val: \"2005590000\"\r\n                    }]\r\n                }]\r\n            },\r\n            Cntxt: {\r\n                PtOfSvcCntxt: {\r\n                    CardDataNtryMd: \"KEEN\",\r\n                    AttnddInd: false,\r\n                    CrdhldrActvtd: true,\r\n                    EComrcInd: true,\r\n                    CrdhldrPres: false,\r\n                    CardPres: false,\r\n                    PrtlApprvlSpprtd: false,\r\n                    EComrcData: [{\r\n                        Tp: \"ECI\",\r\n                        Val: \"5\"\r\n                    }]\r\n                },\r\n                Vrfctn: [{\r\n                    VrfctnRslt: [{\r\n                        RsltDtls: [{\r\n                            Tp: \"CAMReliability\",\r\n                            Val: \"0\"\r\n                        }]\r\n                    }]\r\n                },\r\n                {\r\n                    Tp: \"THDS\",\r\n                    SubTp: \"Visa\",\r\n                    VrfctnInf: [{\r\n                        Tp: \"Method\",\r\n                        Val: {\r\n                            TxtVal: \"Z\"\r\n                        }\r\n                    }]\r\n                },\r\n                {\r\n                    Tp: \"CHSA\",\r\n                    SubTp: \"AR\",\r\n                    VrfctnRslt: [{\r\n                        Rslt: \"SUCC\",\r\n                        RsltDtls: [{\r\n                            Tp: \"AVS result\",\r\n                            Val: \"Y\"\r\n                        }]\r\n                    }],\r\n                    VrfctnInf: [{\r\n                        Tp: \"PCDV\",\r\n                        Val: {\r\n                            TxtVal: \"321191626\"\r\n                        }\r\n                    },\r\n                    {\r\n                        Tp: \"ADDB\",\r\n                        Val: {\r\n                            TxtVal: \"2\"\r\n                        }\r\n                    }\r\n                    ]\r\n                }\r\n                ],\r\n                RskCntxt: [{\r\n                    rskInptData: [{\r\n                        tp: \"VisaRiskScore\",\r\n                        val: \"24\"\r\n                    },\r\n                    {\r\n                        tp: \"VisaRiskReason\",\r\n                        val: \"00\"\r\n                    },\r\n                    {\r\n                        tp: \"VisaRiskCondCode1\",\r\n                        val: \"00\"\r\n                    },\r\n                    {\r\n                        tp: \"VisaRiskCondCode2\",\r\n                        val: \"00\"\r\n                    },\r\n                    {\r\n                        tp: \"VisaRiskCondCode3\",\r\n                        val: \"00\"\r\n                    }\r\n                    ],\r\n                    _class: \"com.visa.ip.iso20022.model.RiskContext\"\r\n                }],\r\n                TxCntxt: {\r\n                    Rcncltn: {\r\n                        Dt: new Date().toISOString(),\r\n                        Id: \"VISAInternational\"\r\n                    },\r\n                    MrchntCtgyCd: \"5942\",\r\n                    SttlmSvc: {\r\n                        SttlmSvcApld: {\r\n                            Tp: \"VISAInternational\"\r\n                        }\r\n                    },\r\n                    CardPrgrmm: {\r\n                        CardPrgrmmApld: {\r\n                            Id: \"VSN\"\r\n                        }\r\n                    },\r\n                    ICCFllbckInd: false\r\n                }\r\n            },\r\n            Envt: {\r\n                Accptr: {\r\n                    NmAndLctn: \"AMZN Mktp US           Amzn.com/billWAUS\",\r\n                    Adr: {\r\n                        Ctry: \"USA\",\r\n                        CtrySubDvsnMjr: \"53\",\r\n                        PstlCd: \"98109    \"\r\n                    },\r\n                    Id: \"235251000762203\"\r\n                },\r\n                Termnl: {\r\n                    TermnlId: {\r\n                        Id: \"99999999\"\r\n                    },\r\n                    Cpblties: {\r\n                        CardCaptrCpbl: false,\r\n                        CardRdngCpblty: [\"UNSP\"],\r\n                        CrdhldrVrfctnCpblty: [{\r\n                            Cpblty: \"UNSP\"\r\n                        }],\r\n                        PINPadInprtv: false\r\n                    },\r\n                    Tp: \"OTHP\",\r\n                    OthrTp: \"03\"\r\n                },\r\n                Sndr: {\r\n                    Id: \"11111111111\"\r\n                },\r\n                Card: {\r\n                    XpryDt: \"2610\",\r\n                    PmtAcctRef: \"V0010013823307740289498425624\",\r\n                    PAN: \"9999999999997117\"\r\n                },\r\n                Acqrr: {\r\n                    Ctry: \"840\",\r\n                    Id: \"59000002422\"\r\n                },\r\n                Tkn: {\r\n                    PmtTkn: \"4316227171030331\",\r\n                    TknAssrncData: \"10\",\r\n                    TknRqstrId: \"40010051602\",\r\n                    TknXpryDt: \"2610\"\r\n                }\r\n            },\r\n            SplmtryData: [{\r\n                Envlp: {}\r\n            }]\r\n        }\r\n    };\r\n\r\n    var authUpdatedata = {\r\n        Hdr: {\r\n            CreDtTm: new Date().toISOString(),\r\n            InitgPty: {\r\n                Id: \"VisaDPS\"\r\n            },\r\n            MsgFctn: \"ADVC\",\r\n            PrtcolVrsn: \"2.49.1\"\r\n        },\r\n        Body: {\r\n            Cntxt: {\r\n                PtOfSvcCntxt: {\r\n                    AttnddInd: true,\r\n                    CardDataNtryMd: \"UNSP\",\r\n                    CardPres: false,\r\n                    CrdhldrActvtd: true,\r\n                    MOTOInd: true\r\n                },\r\n                RskCntxt: [\r\n                    {\r\n                        RskInptData: [\r\n                            {\r\n                                Tp: \"FalconScoreSource\",\r\n                                Val: \"6\"\r\n                            },\r\n                            {\r\n                                Tp: \"FalconScoreValue\",\r\n                                Val: \"0000\"\r\n                            },\r\n                            {\r\n                                Tp: \"FalconRespCode\",\r\n                                Val: \"0\"\r\n                            },\r\n                            {\r\n                                Tp: \"FalconReason1\",\r\n                                Val: \"00\"\r\n                            },\r\n                            {\r\n                                Tp: \"FalconReason2\",\r\n                                Val: \"00\"\r\n                            },\r\n                            {\r\n                                Tp: \"FalconReason3\",\r\n                                Val: \"00\"\r\n                            }\r\n                        ]\r\n                    }\r\n                ],\r\n                TxCntxt: {\r\n                    CardPrgrmm: {\r\n                        CardPrgrmmApld: {\r\n                            Id: \"VSN\"\r\n                        }\r\n                    },\r\n                    ICCFllbckInd: false,\r\n                    MrchntCtgyCd: \"5965\",\r\n                    Rcncltn: {\r\n                        Dt: \"2023-05-01\",\r\n                        Id: \"VISAInternational\"\r\n                    },\r\n                    SttlmSvc: {\r\n                        SttlmSvcApld: {\r\n                            Tp: \"VISAInternational\"\r\n                        }\r\n                    }\r\n                },\r\n                Vrfctn: [\r\n                    {\r\n                        VrfctnRslt: [\r\n                            {\r\n                                RsltDtls: [\r\n                                    {\r\n                                        Tp: \"CAMReliability\",\r\n                                        Val: \"0\"\r\n                                    }\r\n                                ]\r\n                            }\r\n                        ]\r\n                    },\r\n                    {\r\n                        SubTp: \"Visa\",\r\n                        Tp: \"THDS\",\r\n                        VrfctnInf: [\r\n                            {\r\n                                Tp: \"Method\",\r\n                                Val: {\r\n                                    TxtVal: \"Z\"\r\n                                }\r\n                            }\r\n                        ]\r\n                    },\r\n                    {\r\n                        Tp: \"NVSC\",\r\n                        VrfctnRslt: [\r\n                            {\r\n                                Rslt: \"SUCC\"\r\n                            }\r\n                        ]\r\n                    }\r\n                ]\r\n            },\r\n            Envt: {\r\n                Accptr: {\r\n                    Adr: {\r\n                        Ctry: \"USA\",\r\n                        CtrySubDvsnMjr: \"06\",\r\n                        PstlCd: \"94044    \"\r\n                    },\r\n                    Id: \"MULTCLEAR      \",\r\n                    NmAndLctn: \"BUCKS OF STAR TEA      DENVER       COUS\"\r\n                },\r\n                Acqrr: {\r\n                    Id: \"59000000204\"\r\n                },\r\n                Card: {\r\n                    PAN: \"9999999999994368\",\r\n                    XpryDt: \"2504\"\r\n                },\r\n                Sndr: {\r\n                    Id: \"11111111111\"\r\n                },\r\n                Termnl: {\r\n                    Cpblties: {\r\n                        CardCaptrCpbl: false,\r\n                        CardRdngCpblty: [\r\n                            \"UNSP\"\r\n                        ],\r\n                        CrdhldrVrfctnCpblty: [\r\n                            {\r\n                                Cpblty: \"UNSP\"\r\n                            }\r\n                        ],\r\n                        PINPadInprtv: false\r\n                    },\r\n                    OffPrmissInd: false,\r\n                    TermnlId: {\r\n                        Id: \"TERMID01\"\r\n                    },\r\n                    Tp: \"POST\"\r\n                }\r\n            },\r\n            Tx: {\r\n                AcctFr: {\r\n                    AcctTp: \"00\"\r\n                },\r\n                AddtlAmts: [\r\n                    {\r\n                        Amt: {\r\n                            Amt: parseFloat(document.getElementById('amount').value),\r\n                            Ccy: \"USD\"\r\n                        },\r\n                        Labl: \"DEBIT_HOLD_INCREASE\",\r\n                        OthrTp: \"HOLD\",\r\n                        Tp: \"OTHP\"\r\n                    }\r\n                ],\r\n                AddtlData: [\r\n                    {\r\n                        Tp: \"VAUResult\",\r\n                        Val: \"0\"\r\n                    },\r\n                    {\r\n                        Tp: \"CryptoPurchInd\",\r\n                        Val: \"N\"\r\n                    },\r\n                    {\r\n                        Tp: \"DeferredAuthInd\",\r\n                        Val: \"N\"\r\n                    }\r\n                ],\r\n                SpclPrgrmmQlfctn: [\r\n                    {\r\n                        Dtl: [\r\n                            {\r\n                                Nm: \"FPI\",\r\n                                Val: \"101\"\r\n                            },\r\n                            {\r\n                                Nm: \"MVV\",\r\n                                Val: \"0123456789\"\r\n                            }\r\n                        ]\r\n                    },\r\n                    {}\r\n                ],\r\n                TxAmts: {\r\n                    AmtQlfr: \"ESTM\",\r\n                    CrdhldrBllgAmt: {\r\n                        Amt: parseFloat(document.getElementById('amount').value),\r\n                        Ccy: \"USD\",\r\n                        XchgRate: 1\r\n                    },\r\n                    DtldAmt: [\r\n                        {\r\n                            Amt: {\r\n                                Amt: parseFloat(document.getElementById('amount').value),\r\n                            },\r\n                            OthrTp: \"BASE\",\r\n                            Tp: \"OTHP\"\r\n                        }\r\n                    ],\r\n                    RcncltnAmt: {\r\n                        Amt: parseFloat(document.getElementById('amount').value),\r\n                        Ccy: \"USD\",\r\n                        QtnDt: \"2023-04-06T00:00:00Z\",\r\n                        XchgRate: 1\r\n                    },\r\n                    TxAmt: {\r\n                        Amt: parseFloat(document.getElementById('amount').value),\r\n                        Ccy: \"USD\"\r\n                    }\r\n                },\r\n                TxId: {\r\n                    AcqrrRefData: \"12345678901\",\r\n                    cardIssrRefData: JSON.stringify({\r\n                        \"CARD-ID\": document.getElementById('cardId').value,\r\n                        \"ProcessorTransactionId\": generatedProcessorTransactionId = generateRandomAlphaNumeric(64),\r\n                        \"ProcessorTransactionIdCollection\": [{\r\n                            \"ProcessorTransactionId\": document.getElementById('processorTransactionId').value,\r\n                            \"MsgFctn\": \"REQU\"\r\n                        }],\r\n                        \"ProcessorLifeCycleId\": document.getElementById('processorLifeCycleId').value\r\n                    }),\r\n                    LclDtTm: new Date().toISOString(),\r\n                    LifeCyclTracIdData: {\r\n                        Id: \"001680722186868\"\r\n                    },\r\n                    RtrvlRefNb: \"765643377823\",\r\n                    SysTracAudtNb: \"265918\",\r\n                    TrnsmssnDtTm: \"2023-05-01T14:36:45Z\"\r\n                },\r\n                TxTp: \"00\"\r\n            }\r\n        }\r\n    };\r\n\r\n    var reversaldata = {\r\n        Hdr: {\r\n            MsgFctn: \"ADVC\",\r\n            PrtcolVrsn: \"2.49.1\",\r\n            InitgPty: {\r\n                Id: \"VisaDPS\"\r\n            },\r\n            CreDtTm: new Date().toISOString()\r\n        },\r\n        Body: {\r\n            Tx: {\r\n                TxTp: \"22\",\r\n                TxAmts: {\r\n                    TxAmt: {\r\n                        Amt: parseFloat(document.getElementById('amount').value),\r\n                        Ccy: \"840\"\r\n                    },\r\n                    CrdhldrBllgAmt: {\r\n                        Amt: parseFloat(document.getElementById('amount').value),\r\n                        XchgRate: 1,\r\n                        Ccy: \"840\"\r\n                    }\r\n                },\r\n                TxId: {\r\n                    SysTracAudtNb: \"000007\",\r\n                    LclDtTm: new Date().toISOString(),\r\n                    RtrvlRefNb: \"765643377823\",\r\n                    cardIssrRefData: JSON.stringify({\r\n                        \"CARD-ID\": document.getElementById('cardId').value,\r\n                        \"ProcessorTransactionId\": generatedProcessorTransactionId = generateRandomAlphaNumeric(64),\r\n                        \"ProcessorTransactionIdCollection\": [{\r\n                            \"ProcessorTransactionId\": document.getElementById('processorTransactionId').value,\r\n                            \"MsgFctn\": \"REQU\"\r\n                        }],\r\n                        \"ProcessorLifeCycleId\": document.getElementById('processorLifeCycleId').value\r\n                    }),\r\n                },\r\n                AltrnMsgRsn: [\r\n                    \"2800\"\r\n                ]\r\n            },\r\n            Cntxt: {\r\n                TxCntxt: {\r\n                    MrchntCtgyCd: \"5999\"\r\n                }\r\n            },\r\n            Envt: {\r\n                Accptr: {\r\n                    NmAndLctn: \"BUCKS OF STAR TEA      DENVER       COUS\"\r\n                },\r\n                Acqrr: {\r\n                    Id: \"59000000204\"\r\n                }\r\n            },\r\n            PrcgRslt: {\r\n                RsltData: {\r\n                    RsltDtls: \"00\"\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    var refunddata = {\r\n        Hdr: {\r\n            MsgFctn: \"ADVC\",\r\n            PrtcolVrsn: \"2.49.1\",\r\n            InitgPty: {\r\n                Id: \"VisaDPS\"\r\n            },\r\n            CreDtTm: new Date().toISOString()\r\n        },\r\n        Body: {\r\n            Tx: {\r\n                TxTp: \"20\",\r\n                TxAmts: {\r\n                    TxAmt: {\r\n                        Amt: parseFloat(document.getElementById('amount').value),\r\n                        Ccy: \"840\"\r\n                    },\r\n                    CrdhldrBllgAmt: {\r\n                        Amt: parseFloat(document.getElementById('amount').value),\r\n                        XchgRate: 1,\r\n                        Ccy: \"840\"\r\n                    }\r\n                },\r\n                TxId: {\r\n                    SysTracAudtNb: \"000007\",\r\n                    LclDtTm: new Date().toISOString(),\r\n                    RtrvlRefNb: \"765643377823\",\r\n                    cardIssrRefData: JSON.stringify({\r\n                        \"CARD-ID\": document.getElementById('cardId').value,\r\n                        \"ProcessorTransactionId\": generatedProcessorTransactionId = generateRandomAlphaNumeric(64),\r\n                        \"ProcessorTransactionIdCollection\": [{\r\n                            \"ProcessorTransactionId\": document.getElementById('processorTransactionId').value,\r\n                            \"MsgFctn\": \"REQU\"\r\n                        }],\r\n                        \"ProcessorLifeCycleId\": document.getElementById('processorLifeCycleId').value\r\n                    }),\r\n                },\r\n                AltrnMsgRsn: [\r\n                    \"2800\"\r\n                ]\r\n            },\r\n            Cntxt: {\r\n                TxCntxt: {\r\n                    MrchntCtgyCd: \"5999\"\r\n                }\r\n            },\r\n            Envt: {\r\n                Accptr: {\r\n                    NmAndLctn: \"BUCKS OF STAR TEA      DENVER       COUS\"\r\n                },\r\n                Acqrr: {\r\n                    Id: \"59000000204\"\r\n                }\r\n            },\r\n            PrcgRslt: {\r\n                RsltData: {\r\n                    RsltDtls: \"00\"\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    // Send data to API\r\n    var xhr = new XMLHttpRequest();\r\n    xhr.open(\"POST\", BaseUrl + apiUrl, true);\r\n    xhr.setRequestHeader(\"Content-Type\", \"application/json\");\r\n    xhr.onreadystatechange = function () {\r\n        if (xhr.readyState === 4 && xhr.status === 200) {\r\n            var response = JSON.parse(xhr.responseText);\r\n            displayResponse(response);\r\n        } else {\r\n            displayErrorResponse(xhr.status);\r\n        }\r\n    };\r\n    //Pass the RequestPayload based on TxnType\r\n    if (selectedTransactionType == \"balanceInquiry\")\r\n        xhr.send(JSON.stringify(balanceInquirydata));\r\n    else if (selectedTransactionType == \"auth\")\r\n        xhr.send(JSON.stringify(authdata));\r\n    else if (selectedTransactionType == \"authUpdate\")\r\n        xhr.send(JSON.stringify(authUpdatedata));\r\n    else if (selectedTransactionType == \"reversal\")\r\n        xhr.send(JSON.stringify(reversaldata));\r\n    else if (selectedTransactionType == \"refund\")\r\n        xhr.send(JSON.stringify(refunddata));\r\n\r\n}\r\n\r\n// DISPLAY RESPONSE FUNCTION\r\nfunction displayResponse(response) {\r\n    var responseText = \"Transaction Response Code: \" + response.Body.PrcgRslt.RsltData.RsltDtls + \"<br>\";\r\n\r\n    if (document.getElementById('txnType').value == \"balanceInquiry\") {\r\n        console.log(document.getElementById('txnType').value)\r\n        responseText += \"Available Balance: \" + response.Body.Tx.AcctBal[0].Bal[0].Amt + \" USD\" + \"<br>\";\r\n    }\r\n    else {\r\n        responseText += \"ProcessorTransactionId: \" + generatedProcessorTransactionId + \"<br>\";\r\n        responseText += \"ProcessorLifeCycleId: \" + generatedProcessorLifeCycleId + \"<br>\";\r\n    }\r\n    document.getElementById('responseText').innerHTML = responseText;\r\n    document.getElementById('responseContainer').style.display = 'block';\r\n}\r\n\r\n\r\n// DISPLAY Error FUNCTION\r\nfunction displayErrorResponse(status) {\r\n    // Display error response in the response container\r\n    if (status == 500)\r\n        var errorText = \"Error: Internal Server Error (500)\";\r\n    else\r\n        var errorText = \"Error: \" + status;\r\n\r\n    document.getElementById('responseText').innerHTML = errorText;\r\n    document.getElementById('responseContainer').style.display = 'block';\r\n}\n\n//# sourceURL=webpack://dps-transactions/./js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/main.js"]();
/******/ 	
/******/ })()
;