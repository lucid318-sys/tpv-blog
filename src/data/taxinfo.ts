export interface TaxRate {
  bracket: string;
  rate: string;
  deduction: string;
}

export interface Exemption {
  relation: string;
  limit: string;
}

export interface TaxInfo {
  label: string;
  rates: TaxRate[];
  exemptions: Exemption[];
  exemptionNote?: string;
  filingDeadline: string;
  filingPerson: string;
}

export const TAX_INFO: Partial<Record<string, TaxInfo>> = {
  jeungyeo: {
    label: "증여세",
    rates: [
      { bracket: "1억 이하", rate: "10%", deduction: "—" },
      { bracket: "1억~5억", rate: "20%", deduction: "1,000만" },
      { bracket: "5억~10억", rate: "30%", deduction: "6,000만" },
      { bracket: "10억~30억", rate: "40%", deduction: "1억 6,000만" },
      { bracket: "30억 초과", rate: "50%", deduction: "4억 6,000만" },
    ],
    exemptions: [
      { relation: "배우자", limit: "6억" },
      { relation: "직계존속(성년)", limit: "5,000만" },
      { relation: "직계존속(미성년)", limit: "2,000만" },
      { relation: "직계비속", limit: "5,000만" },
      { relation: "기타 친족", limit: "1,000만" },
    ],
    exemptionNote: "혼인·출산 증여공제 1억 원 별도",
    filingDeadline: "증여일이 속하는 달의 말일부터 3개월",
    filingPerson: "받은 사람(수증자)",
  },
};
