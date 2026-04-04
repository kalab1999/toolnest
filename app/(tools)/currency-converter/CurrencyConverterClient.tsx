"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Coins, ArrowLeftRight, ChevronDown, RefreshCcw, Search, X, TrendingUp, Info, ArrowRight } from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout"; 
import { toolContents } from "@/app/lib/tool-content";

// Comprehensive currency list (ISO 4217)
const currencies: Record<string, string> = {
    USD: "US Dollar", EUR: "Euro", GBP: "British Pound", JPY: "Japanese Yen", CAD: "Canadian Dollar",
    AUD: "Australian Dollar", CHF: "Swiss Franc", CNY: "Chinese Yuan", INR: "Indian Rupee", BRL: "Brazilian Real",
    RUB: "Russian Ruble", KRW: "South Korean Won", SGD: "Singapore Dollar", MXN: "Mexican Peso", NZD: "New Zealand Dollar",
    HKD: "Hong Kong Dollar", SEK: "Swedish Krona", NOK: "Norwegian Krone", TRY: "Turkish Lira", ZAR: "South African Rand",
    AED: "UAE Dirham", AFN: "Afghan Afghani", ALL: "Albanian Lek", AMD: "Armenian Dram", ANG: "Netherlands Antillean Guilder",
    AOA: "Angolan Kwanza", ARS: "Argentine Peso", AWG: "Aruban Florin", AZN: "Azerbaijani Manat", BAM: "Bosnia-Herzegovina Mark",
    BBD: "Barbadian Dollar", BDT: "Bangladeshi Taka", BGN: "Bulgarian Lev", BHD: "Bahraini Dinar", BIF: "Burundian Franc",
    BMD: "Bermudan Dollar", BND: "Brunei Dollar", BOB: "Bolivian Boliviano", BSD: "Bahamian Dollar", BTN: "Bhutanese Ngultrum",
    BWP: "Botswanan Pula", BYN: "Belarusian Ruble", BZD: "Belize Dollar", CDF: "Congolese Franc", CLP: "Chilean Peso",
    COP: "Colombian Peso", CRC: "Costa Rican Colón", CUP: "Cuban Peso", CVE: "Cape Verdean Escudo", CZK: "Czech Koruna",
    DJF: "Djiboutian Franc", DKK: "Danish Krone", DOP: "Dominican Peso", DZD: "Algerian Dinar", EGP: "Egyptian Pound",
    ERN: "Eritrean Nakfa", ETB: "Ethiopian Birr", FJD: "Fijian Dollar", FKP: "Falkland Islands Pound", GEL: "Georgian Lari",
    GGP: "Guernsey Pound", GHS: "Ghanaian Cedi", GIP: "Gibraltar Pound", GMD: "Gambian Dalasi", GNF: "Guinean Franc",
    GTQ: "Guatemalan Quetzal", GYD: "Guyanese Dollar", HNL: "Honduran Lempira", HRK: "Croatian Kuna", HTG: "Haitian Gourde",
    HUF: "Hungarian Forint", IDR: "Indonesian Rupiah", ILS: "Israeli New Shekel", IMP: "Isle of Man Pound", IQD: "Iraqi Dinar",
    IRR: "Iranian Rial", ISK: "Icelandic Króna", JEP: "Jersey Pound", JMD: "Jamaican Dollar", JOD: "Jordanian Dinar",
    KES: "Kenyan Shilling", KGS: "Kyrgystani Som", KHR: "Cambodian Riel", KMF: "Comorian Franc", KPW: "North Korean Won",
    KWD: "Kuwaiti Dinar", KYD: "Cayman Islands Dollar", KZT: "Kazakhstani Tenge", LAK: "Laotian Kip", LBP: "Lebanese Pound",
    LKR: "Sri Lankan Rupee", LRD: "Liberian Dollar", LSL: "Lesotho Loti", LYD: "Libyan Dinar", MAD: "Moroccan Dirham",
    MDL: "Moldovan Leu", MGA: "Malagasy Ariary", MKD: "Macedonian Denar", MMK: "Myanmar Kyat", MNT: "Mongolian Tugrik",
    MOP: "Macanese Pataca", MRU: "Mauritanian Ouguiya", MUR: "Mauritian Rupee", MVR: "Maldivian Rufiyaa", MWK: "Malawian Kwacha",
    MYR: "Malaysian Ringgit", MZN: "Mozambican Metical", NAD: "Namibian Dollar", NGN: "Nigerian Naira", NIO: "Nicaraguan Córdoba",
    NPR: "Nepalese Rupee", OMR: "Omani Rial", PAB: "Panamanian Balboa", PEN: "Peruvian Sol", PGK: "Papua New Guinean Kina",
    PHP: "Philippine Peso", PKR: "Pakistani Rupee", PLN: "Polish Zloty", PYG: "Paraguayan Guarani", QAR: "Qatari Rial",
    RON: "Romanian Leu", RSD: "Serbian Dinar", RWF: "Rwandan Franc", SAR: "Saudi Riyal", SBD: "Solomon Islands Dollar",
    SCR: "Seychellois Rupee", SDG: "Sudanese Pound", SHP: "St. Helena Pound", SLL: "Sierra Leonean Leone", SOS: "Somali Shilling",
    SRD: "Surinamese Dollar", SSP: "South Sudanese Pound", STN: "São Tomé and Príncipe Dobra", SYP: "Syrian Pound", SZL: "Swazi Lilangeni",
    THB: "Thai Baht", TJS: "Tajikistani Somoni", TMT: "Turkmenistani Manat", TND: "Tunisian Dinar", TOP: "Tongan Paʻanga",
    TWD: "New Taiwan Dollar", TZS: "Tanzanian Shilling", UAH: "Ukrainian Hryvnia", UGX: "Ugandan Shilling", UYU: "Uruguayan Peso",
    UZS: "Uzbekistani Som", VES: "Venezuelan Bolívar", VND: "Vietnamese Dong", VUV: "Vanuatu Vatu", WST: "Samoan Tala",
    XAF: "Central African CFA Franc", XCD: "East Caribbean Dollar", XOF: "West African CFA Franc", XPF: "CFP Franc", YER: "Yemeni Rial",
    ZMW: "Zambian Kwacha", ZWL: "Zimbabwean Dollar"
};

interface SearchableDropdownProps {
    value: string;
    onChange: (val: string) => void;
    label: string;
}

function SearchableDropdown({ value, onChange, label }: SearchableDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filtered = useMemo(() => {
        return Object.entries(currencies).filter(([code, name]) =>
            code.toLowerCase().includes(search.toLowerCase()) ||
            name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {label && <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] ml-2 block mb-2">{label}</label>}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-white border ${isOpen ? "border-primary/30 ring-4 ring-primary/5" : "border-neutral-200"} rounded-xl px-3 py-2 flex items-center justify-between group hover:border-primary/20 transition-all shadow-sm`}
            >
                <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 text-[10px] uppercase tracking-wider">{value}</span>
                    <span className="text-[10px] text-neutral-400 font-medium truncate max-w-[60px]">{currencies[value]}</span>
                </div>
                <ChevronDown className={`w-3 h-3 text-neutral-300 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute z-[100] top-full right-0 w-[240px] mt-2 bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up origin-top-right">
                    <div className="p-3 border-b border-neutral-100 flex items-center gap-2 bg-neutral-50/50">
                        <Search className="w-4 h-4 text-neutral-400" />
                        <input
                            autoFocus
                            className="bg-transparent text-sm w-full focus:outline-none font-medium text-neutral-900"
                            placeholder="Search currency..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && <button onClick={() => setSearch("")}><X className="w-4 h-4 text-neutral-400" /></button>}
                    </div>
                    <div className="max-h-[260px] overflow-y-auto custom-scrollbar">
                        {filtered.map(([code, name]) => (
                            <button
                                key={code}
                                onClick={() => {
                                    onChange(code);
                                    setIsOpen(false);
                                    setSearch("");
                                }}
                                className={`w-full flex items-center gap-4 px-5 py-3 hover:bg-primary/5 transition-colors text-left ${value === code ? "bg-primary/10" : ""}`}
                            >
                                <div className="w-8 h-8 bg-neutral-50 rounded-lg flex items-center justify-center font-bold text-neutral-900 border border-neutral-100 text-[10px] group-hover:bg-white shrink-0">{code}</div>
                                <div className="flex flex-col min-w-0">
                                    <span className={`text-xs font-bold truncate ${value === code ? "text-primary" : "text-neutral-900"}`}>{name}</span>
                                    <span className="text-[9px] text-neutral-400 uppercase font-bold tracking-widest">{code}</span>
                                </div>
                            </button>
                        ))}
                        {filtered.length === 0 && <div className="p-8 text-center text-neutral-400 text-sm">No currencies found</div>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function CurrencyConverter() {
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [amount, setAmount] = useState<string>("100");
    const [rates, setRates] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState<string>("");

    useEffect(() => {
        const fetchRates = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
                const data = await res.json();
                if (data.result === "success") {
                    setRates(data.rates);
                    setLastUpdate(new Date().toLocaleTimeString());
                }
            } catch (err) {
                console.error("Failed to fetch rates:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRates();
    }, [fromCurrency]);

    const result = useMemo(() => {
        if (!rates[toCurrency]) return 0;
        const num = parseFloat(amount);
        return isNaN(num) ? 0 : num * rates[toCurrency];
    }, [amount, toCurrency, rates]);

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const getFontSize = (text: string) => {
        const len = text.length;
        if (len > 20) return "text-lg";
        if (len > 15) return "text-xl";
        if (len > 12) return "text-2xl";
        return "text-3xl";
    };

    return (
        <ToolLayout
            content={toolContents["currency-converter"]}
            title="Currency Converter"
            description="Professional world currency exchange tool with real-time market data."
            icon={Coins}
            instructions={[
                "Select your base and target currencies using the searchable selection.",
                "Enter the amount to see high-precision results instantly.",
                "Market rates update automatically when source currency changes.",
                "Designed for professional clarity and ease of use."
            ]}
        >
            <div className="max-w-4xl mx-auto py-10 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Primary Tool Card */}
                    <div className="lg:col-span-8 bg-white p-12 rounded-[3.5rem] border border-neutral-100 shadow-soft space-y-12 animate-fade-in-up">
                        {/* Header Indicator */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/10">
                                    <Coins className="w-7 h-7" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Currency Dashboard</h2>
                                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.1em]">Ultra-Precision Mode</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${loading ? "bg-primary/5 text-primary" : "bg-green-50 text-green-600"}`}>
                                    <RefreshCcw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
                                    {loading ? "Updating..." : "Live Market"}
                                </div>
                                {lastUpdate && !loading && (
                                    <span className="text-[8px] text-neutral-300 font-bold mt-1 uppercase">Synced: {lastUpdate}</span>
                                )}
                            </div>
                        </div>

                        {/* Conversion Hub */}
                        <div className="space-y-12">
                            {/* Amount & Result Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                                {/* Provide Block */}
                                <div className="bg-neutral-50/50 p-8 rounded-[2.5rem] border border-neutral-100 space-y-4 transition-all hover:bg-white hover:shadow-soft group/card">
                                    <div className="flex items-center justify-between px-1">
                                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">You Provide</label>
                                        <div className="w-28">
                                            <SearchableDropdown label="" value={fromCurrency} onChange={setFromCurrency} />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className={`w-full bg-white border border-neutral-200 rounded-2xl px-6 py-5 font-black text-neutral-900 focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all shadow-sm ${getFontSize(amount)}`}
                                            placeholder="0.00"
                                        />
                                        <div className="absolute top-1/2 -translate-y-1/2 right-6 text-neutral-300 font-black text-xs tracking-tighter uppercase">
                                            {fromCurrency}
                                        </div>
                                    </div>
                                </div>

                                {/* Swap Button In-Between */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                                    <button
                                        onClick={swapCurrencies}
                                        className="w-12 h-12 bg-white border border-neutral-200 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-primary hover:border-primary/30 hover:shadow-xl transition-all active:scale-90 shadow-soft group"
                                    >
                                        <ArrowLeftRight className="w-5 h-5 group-hover:scale-110" />
                                    </button>
                                </div>

                                {/* Receive Block */}
                                <div className="bg-primary/[0.02] p-8 rounded-[2.5rem] border border-primary/5 space-y-4 transition-all hover:bg-white hover:shadow-soft group/card">
                                    <div className="flex items-center justify-between px-1">
                                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">They Receive</label>
                                        <div className="w-28">
                                            <SearchableDropdown label="" value={toCurrency} onChange={setToCurrency} />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <div className={`w-full bg-white border border-primary/10 rounded-2xl px-6 py-5 font-black text-primary min-h-[76px] flex items-center transition-all shadow-sm ${getFontSize(result.toLocaleString())}`}>
                                            {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                                        </div>
                                        <div className="absolute top-1/2 -translate-y-1/2 right-6 text-primary/40 font-black text-xs tracking-tighter uppercase">
                                            {toCurrency}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Insight */}
                        <div className="pt-8 border-t border-neutral-50 flex items-center justify-between px-2">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-100">
                                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-[11px] font-bold text-neutral-900">Exchange Value:</span>
                                </div>
                                <span className="text-xs font-mono font-black text-primary/80">
                                    1.00 {fromCurrency} = {rates[toCurrency]?.toFixed(6) || "..."} {toCurrency}
                                </span>
                            </div>
                            <p className="text-[9px] text-neutral-300 font-bold uppercase tracking-[0.2em] italic">
                                official interbank rate
                            </p>
                        </div>
                    </div>

                    {/* Sidebar Information */}
                    <div className="lg:col-span-4 space-y-8 animate-fade-in-up [animation-delay:150ms]">
                        <div className="bg-white p-8 rounded-[3rem] border border-neutral-100 shadow-soft-xl relative overflow-hidden group">
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>

                            <h4 className="font-bold text-neutral-900 mb-8 flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Info className="w-4 h-4 text-primary" />
                                </div>
                                Global Coverage
                            </h4>

                            <div className="space-y-6">
                                {[
                                    { title: "160+ Active Markets", desc: "Real-time feeds from all major and exotic currencies." },
                                    { title: "Smart Discovery", desc: "Search by currency code or full country name instantly." },
                                    { title: "Zero Lag", desc: "Optimized data fetching layer for instant results." },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className="text-[10px] font-black text-neutral-200 group-hover:text-primary/40 transition-colors mt-0.5">0{i + 1}</div>
                                        <div>
                                            <p className="font-bold text-neutral-900 text-[13px] leading-none mb-1.5">{item.title}</p>
                                            <p className="text-[11px] text-neutral-400 leading-relaxed font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 p-5 bg-neutral-900 rounded-[2rem] text-white overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 relative z-10">Quick Tip</p>
                                <p className="text-xs text-neutral-300 leading-relaxed relative z-10">Use the <span className="text-primary font-bold">Swap</span> button to check the inverted rate instantly.</p>
                            </div>
                        </div>

                        <div className="ad-placeholder h-40 !m-0 rounded-[2.5rem] opacity-40 border-dashed border-2 border-neutral-100 flex items-center justify-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                            Commercial Placement
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
