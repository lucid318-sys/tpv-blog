export interface AreaGroup {
  region: string;
  areas: string[];
}

export interface HistoryEntry {
  date: string;
  description: string;
  notes?: string[];
}

export const REFERENCE_DATE = "2026년 7월 1일";

const SEOUL_AREAS = [
  "강남", "서초", "송파", "용산", "성동", "마포", "강동", "영등포", "양천",
  "동작", "광진", "중", "종로", "서대문", "강서", "노원", "성북", "구로",
  "동대문", "관악", "은평", "중랑", "금천", "강북", "도봉",
];

const GYEONGGI_AREAS = [
  "수원장안", "수원팔달", "수원영통", "성남수정", "성남중원", "성남분당",
  "안양동안", "과천", "용인수지", "광명", "하남", "의왕", "화성동탄",
  "용인기흥", "구리",
];

export const ADJUSTED_AREAS: AreaGroup[] = [
  { region: "서울 (25곳)", areas: SEOUL_AREAS },
  { region: "경기 (15곳)", areas: GYEONGGI_AREAS },
];

export const SPECULATION_AREAS: AreaGroup[] = [
  { region: "서울 (25곳)", areas: SEOUL_AREAS },
  { region: "경기 (15곳)", areas: GYEONGGI_AREAS },
];

export const AREA_HISTORY: HistoryEntry[] = [
  {
    date: "2026.07.01",
    description: "화성동탄, 용인기흥, 구리 신규 지정 (조정대상지역·투기과열지구)",
    notes: [
      "관련: 2026.07.05~2027.12.31 토지거래허가구역 지정(경기도)",
    ],
  },
];

export const DOWNLOAD_FILES = [
  {
    label: "보도참고자료 (국토교통부, 2026.6.30)",
    filename: "260630(보도참고) 투기과열지구 및 조정대상지역 추가 지정(주택정책과).pdf",
  },
  {
    label: "국토교통부공고 제2026-882호 (조정대상지역 지정)",
    filename: "국토교통부공고제2026-882호(조정대상지역_지정).pdf",
  },
  {
    label: "국토교통부공고 제2026-883호 (투기과열지구 지정)",
    filename: "국토교통부공고제2026-883호(투기과열지구_지정).pdf",
  },
];
