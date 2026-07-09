// =============================================================================
// 규제지역 지정·해제 연혁 데이터 (전국 소급)
// -----------------------------------------------------------------------------
// 출처: etaxkorea 조세자료 (2026.7.9 출력본 4종)
//   - 조정대상지역: 연혁별 현황(2026.7.1 기준) + 지역별 지정·해제 표
//   - 투기과열지구: 연혁별 현황(2026.7.1 기준)
//   - 투기지역(소득세법상 지정지역): 2023.01.05 기준 + 2012.5.15 기준(구 투기지역)
// 검증: 국토교통부 공고 원문 27건(2017.8.3~2025.10.16)과 대조 완료(2026.7.9) — 불일치 0건.
//   공고 확보분은 designationNotice/liftNotice 필드에 근거 공고 기재.
//   미확보: ① 2022.9.26 투기과열지구 해제 공고(인천 연수·남동·서구, 세종) ② 2026.7.1
//   조정대상지역·투기과열지구 지정 공고(화성 동탄구, 용인 기흥구, 구리시) ③ 투기지역(기획재정부) 공고 전체.
// 주의: 본 데이터는 참고용 정리본이며, 세무 판단 시 반드시 원문 공고를 확인할 것.
// =============================================================================

export const HISTORY_BASE_DATE = '2026-07-01'; // 조정대상지역·투기과열지구 기준일
export const SPECULATION_BASE_DATE = '2023-01-05'; // 투기지역 최신 스냅샷 기준일 (이후 변동은 별도 확인)

export type RegulationType = 'adjustment' | 'overheated' | 'speculation';

export const REGULATION_TYPE_LABEL: Record<RegulationType, string> = {
  adjustment: '조정대상지역',
  overheated: '투기과열지구',
  speculation: '투기지역',
};

export interface RegulationPeriod {
  /** 규제 종류 */
  type: RegulationType;
  /** 시·도 */
  sido: string;
  /** 시·군·구(또는 그 이하) 표시명 */
  region: string;
  /** 부분지정·제외 범위 */
  scope?: string;
  /** 투기지역 전용: 주택 / 주택외(비주택) */
  target?: '주택' | '주택외';
  /** 지정일 (YYYY-MM-DD) */
  designated: string;
  /** 해제일 — 없으면 기준일 현재 지정 중 */
  lifted?: string;
  /** 재지정 여부 */
  redesignation?: boolean;
  /** 비고 */
  note?: string;
  /** 지정 근거 공고 (원문 대조 완료분만 기재) */
  designationNotice?: string;
  /** 해제 근거 공고 (원문 대조 완료분만 기재) */
  liftNotice?: string;
  /** 원문 공란·표기 애매 등으로 스팟 체크가 필요한 행 */
  needsVerify?: boolean;
}

/** 공고 원본 레지스트리 — 다운로드 섹션 연결용. file은 저장소 내 공고 PDF/HWP 경로로 교체. */
export interface OfficialNotice {
  id: string;
  date: string;
  kind: '지정' | '해제' | '지정·해제' | '정정';
  type: RegulationType;
  summary: string;
  file?: string;
}

export const officialNotices: OfficialNotice[] = [
  { id: '국토교통부공고 제2017-1173호', date: '2017-08-03', kind: '지정', type: 'overheated', summary: '투기과열지구 지정 — 서울 전역(25개구), 과천시, 세종(행정중심복합도시 건설 예정지역)', file: '/notices/2017-1173.hwp' },
  { id: '국토교통부공고 제2017-1304호', date: '2017-09-06', kind: '지정', type: 'overheated', summary: '투기과열지구 지정 — 성남시 분당구, 대구 수성구', file: '/notices/2017-1304.hwp' },
  { id: '국토교통부공고 제2017-1305호', date: '2017-09-06', kind: '지정', type: 'adjustment', summary: '조정대상지역 예정지 지정(40개 지역) — 주택법 제63조의2 시행일(2017.11.10)에 지정 간주', file: '/notices/2017-1305.hwp' },
  { id: '국토교통부공고 제2018-1086호', date: '2018-08-28', kind: '지정', type: 'overheated', summary: '투기과열지구 지정 — 광명시, 하남시', file: '/notices/2018-1086.hwp' },
  { id: '국토교통부공고 제2018-1088호', date: '2018-08-28', kind: '지정', type: 'adjustment', summary: '조정대상지역 지정 — 구리시, 안양시 동안구, 광교택지개발지구', file: '/notices/2018-1088.hwp' },
  { id: '국토교통부공고 제2018-1089호', date: '2018-08-28', kind: '해제', type: 'adjustment', summary: '조정대상지역 해제 — 부산 기장군(일광면 제외)', file: '/notices/2018-1089.hwp' },
  { id: '국토교통부공고 제2018-1766호', date: '2018-12-31', kind: '지정', type: 'adjustment', summary: '조정대상지역 지정 — 수원시 팔달구, 용인시 수지구·기흥구', file: '/notices/2018-1766.hwp' },
  { id: '국토교통부공고 제2018-1767호', date: '2018-12-31', kind: '해제', type: 'adjustment', summary: '조정대상지역 해제 — 부산 부산진구, 남구, 연제구, 기장군(일광면)', file: '/notices/2018-1767.hwp' },
  { id: '국토교통부공고 제2019-1540호', date: '2019-11-08', kind: '해제', type: 'adjustment', summary: '조정대상지역 해제 — 고양시(일부 지구 제외), 남양주시(다산동·별내동 제외), 부산 해운대구·수영구·동래구', file: '/notices/2019-1540.hwp' },
  { id: '국토교통부공고 제2020-197호', date: '2020-02-21', kind: '지정', type: 'adjustment', summary: '조정대상지역 지정 — 수원시 영통구·권선구·장안구, 안양시 만안구, 의왕시', file: '/notices/2020-197.hwp' },
  { id: '국토교통부공고 제2020-827호', date: '2020-06-19', kind: '지정', type: 'overheated', summary: '투기과열지구 지정 — 수원시, 성남 수정구, 안양시, 안산 단원구, 구리·군포·의왕시, 용인 수지·기흥구, 동탄2택지개발지구, 인천 연수·남동·서구, 대전 동·중·서·유성구', file: '/notices/2020-827.hwp' },
  { id: '국토교통부공고 제2020-828호', date: '2020-06-19', kind: '지정', type: 'adjustment', summary: '조정대상지역 지정 — 경기 10개 시(부분 제외 포함), 인천 8개구, 대전 5개구, 청주시(일부 제외) 등. ※ 화성시는 관보 누락 후 제2020-877호로 정정', file: '/notices/2020-828.hwp' },
  { id: '국토교통부공고 제2020-877호', date: '2020-06-29', kind: '정정', type: 'adjustment', summary: '제2020-828호 정정 — 지정 목록에 화성시 추가, 용인 처인구·광주시 제외문구 정정', file: '/notices/2020-877.hwp' },
  { id: '국토교통부공고 제2020-1521호', date: '2020-11-20', kind: '지정', type: 'adjustment', summary: '조정대상지역 지정 — 김포시(4개 읍면 제외), 부산 해운대·동래·수영·연제·남구, 대구 수성구', file: '/notices/2020-1521.hwp' },
  { id: '국토교통부공고 제2020-1649호', date: '2020-12-18', kind: '지정', type: 'overheated', summary: '투기과열지구 지정 — 창원시 의창구(대산면 제외)', file: '/notices/2020-1649.hwp' },
  { id: '국토교통부공고 제2020-1650호', date: '2020-12-18', kind: '지정·해제', type: 'adjustment', summary: '지정 — 부산 9개구, 대구 7개 구·군, 광주 5개구, 울산 중·남구, 파주시, 천안·논산·공주, 전주, 여수·순천·광양, 포항 남구, 경산, 창원 성산구 / 해제 — 인천 중구 을왕동 등 4개동, 양주 4개 읍면, 안성 9개면', file: '/notices/2020-1650.hwp' },
  { id: '국토교통부공고 제2021-1308호', date: '2021-08-30', kind: '해제', type: 'overheated', summary: '투기과열지구 해제 — 창원시 의창구 동읍·북면(감계지구·무동지구는 지정 유지)', file: '/notices/2021-1308.hwp' },
  { id: '국토교통부공고 제2021-1309호', date: '2021-08-30', kind: '지정', type: 'adjustment', summary: '조정대상지역 지정 — 동두천시(광암동 등 6개동 제외)', file: '/notices/2021-1309.hwp' },
  { id: '국토교통부공고 제2022-882호', date: '2022-07-05', kind: '해제', type: 'overheated', summary: '투기과열지구 해제 — 안산 단원구 일부(대부동동 등 5개동), 대구 수성구, 대전 동·중·서·유성구, 창원시 의창구', file: '/notices/2022-882.pdf' },
  { id: '국토교통부공고 제2022-883호', date: '2022-07-05', kind: '해제', type: 'adjustment', summary: '조정대상지역 해제 — 안산 단원구 일부(대부동동 등 5개동), 화성시 서신면, 대구 7개 구·군, 경산시, 여수·순천·광양시', file: '/notices/2022-883.pdf' },
  { id: '국토교통부공고 제2022-1207호', date: '2022-09-26', kind: '해제', type: 'adjustment', summary: '조정대상지역 해제 — 경기 동두천·양주·파주·평택·안성, 부산 14개구, 대구 수성구, 광주 5개구, 대전 5개구, 울산 중·남구, 청주, 천안 동남·서북구, 논산·공주, 전주 완산·덕진구, 포항 남구, 창원 성산구', file: '/notices/2022-1207.hwp' },
  { id: '국토교통부공고 제2022-1407호', date: '2022-11-14', kind: '해제', type: 'overheated', summary: '투기과열지구 해제 — 수원시, 안양시, 안산 단원구, 구리·군포·의왕시, 용인 수지·기흥구, 동탄2택지개발지구', file: '/notices/2022-1407.pdf' },
  { id: '국토교통부공고 제2022-1408호', date: '2022-11-14', kind: '해제', type: 'adjustment', summary: '조정대상지역 해제 — 성남 중원구, 동탄2·광교택지개발지구, 구리, 안양 동안·만안구, 수원 4개구, 용인 3개구, 의왕, 고양, 남양주, 화성, 군포, 부천, 안산, 시흥, 오산, 광주, 의정부, 김포, 인천 8개구, 세종', file: '/notices/2022-1408.pdf' },
  { id: '국토교통부공고 제2023-1호', date: '2023-01-05', kind: '해제', type: 'overheated', summary: '투기과열지구 해제 — 서울 21개구, 과천, 성남 수정·분당구, 하남, 광명 (강남·서초·송파·용산만 존치)', file: '/notices/2023-1.pdf' },
  { id: '국토교통부공고 제2023-2호', date: '2023-01-05', kind: '해제', type: 'adjustment', summary: '조정대상지역 해제 — 서울 21개구, 과천, 성남 수정·분당구, 하남, 광명 (강남·서초·송파·용산만 존치)', file: '/notices/2023-2.pdf' },
  { id: '국토교통부공고 제2025-1223호', date: '2025-10-16', kind: '지정', type: 'adjustment', summary: '조정대상지역 지정 — 서울 21개구, 수원 장안·팔달·영통구, 성남 수정·중원·분당구, 안양 동안구, 과천, 용인 수지구, 광명, 하남, 의왕', file: '/notices/2025-1223.pdf' },
  { id: '국토교통부공고 제2025-1225호', date: '2025-10-16', kind: '지정', type: 'overheated', summary: '투기과열지구 지정 — 서울 21개구, 수원 장안·팔달·영통구, 성남 수정·중원·분당구, 안양 동안구, 과천, 용인 수지구, 광명, 하남, 의왕', file: '/notices/2025-1225.pdf' },
];

/** 세법 적용상 주의사항 (페이지 하단 고정 노출용) */
export const LEGAL_NOTES: string[] = [
  '조정대상지역 2017.9.6 고시분은 법률 제14866호(2017.8.9.) 주택법 제63조의2 규정의 시행일(2017.11.10)에 조정대상지역으로 지정된 것으로 본다.',
  '소득세법 시행령 제154조 제1항 적용 시 2017.9.6(지정일)은 2017.8.3(지정일)로 본다.',
  '중과세율 적용 배제 주택의 매매계약체결일 기준인 조정대상지역 공고일: 서면법규재산 2019-4276(2022.01.17) 참조.',
  '세종특별자치시의 지정 범위는 행정중심복합도시 건설 예정지역(건설교통부고시 제2006-418호에 따라 지정된 예정지역으로, 「신행정수도 후속대책을 위한 연기ㆍ공주지역 행정중심복합도시 건설을 위한 특별법」 제15조제1호에 따라 해제된 지역 포함)이다.',
  '투기지역(소득세법상 지정지역) 자료의 기준일은 2023.1.5이며, 그 이후 변동 여부는 기획재정부 공고 원문으로 별도 확인이 필요하다.',
];

/** 세종 행정중심복합도시 건설예정지역 상세 (조정대상지역·투기지역 지정 범위) */
export const SEJONG_HAENGBOK_AREA = {
  regions: [
    { list: '반곡동, 소담동, 보람동, 대평동, 가람동, 한솔동, 나성동, 새롬동, 다정동, 어진동, 종촌동, 도담동', source: '행정중심복합도시건설청고시 제2017-16호(2017.7.4)' },
    { list: '고운동, 아름동', source: '행정중심복합도시건설청고시 제2017-21호(2017.10.10) 추가고시' },
    { list: '산울동, 해밀동, 합강동, 집현동', source: '행정중심복합도시건설청고시 제2020-66호(2021.1.4)' },
    { list: '연기면 한별리·누리리·세종리·보통리, 연동면 용호리·다솜리', source: '보통리: 행정중심복합도시건설청고시 제2021-17호(2021.7.9)' },
  ],
};

export const regulationPeriods: RegulationPeriod[] = [
  // ===========================================================================
  // 1. 조정대상지역 (adjustment)
  // ===========================================================================
  // --- 서울특별시: 강남3구·용산 (2017.9.6 지정, 계속 지정 중) ---
  { type: 'adjustment', sido: '서울특별시', region: '서초구', designated: '2017-09-06', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)' },
  { type: 'adjustment', sido: '서울특별시', region: '강남구', designated: '2017-09-06', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)' },
  { type: 'adjustment', sido: '서울특별시', region: '송파구', designated: '2017-09-06', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)' },
  { type: 'adjustment', sido: '서울특별시', region: '용산구', designated: '2017-09-06', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)' },
  // --- 서울특별시: 21개구 1차 (2017.9.6 ~ 2023.1.5) ---
  { type: 'adjustment', sido: '서울특별시', region: '종로구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '중구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '성동구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '광진구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '동대문구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '중랑구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '성북구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '강북구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '도봉구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '노원구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '은평구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '서대문구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '마포구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '양천구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '강서구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '구로구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '금천구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '영등포구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '동작구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '관악구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '서울특별시', region: '강동구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  // --- 서울특별시: 21개구 재지정 (2025.10.16 ~ 현재) ---
  { type: 'adjustment', sido: '서울특별시', region: '종로구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '중구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '성동구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '광진구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '동대문구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '중랑구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '성북구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '강북구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '도봉구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '노원구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '은평구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '서대문구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '마포구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '양천구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '강서구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '구로구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '금천구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '영등포구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '동작구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '관악구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '서울특별시', region: '강동구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  // --- 경기도 ---
  { type: 'adjustment', sido: '경기도', region: '과천시', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '경기도', region: '과천시', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '경기도', region: '광명시', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '경기도', region: '광명시', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '경기도', region: '하남시', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '경기도', region: '하남시', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '경기도', region: '성남시 수정구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '경기도', region: '성남시 분당구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2023-2호(2023.1.5)' },
  { type: 'adjustment', sido: '경기도', region: '성남시 중원구', designated: '2017-09-06', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '성남시 분당구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '경기도', region: '성남시 수정구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '경기도', region: '성남시 중원구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '경기도', region: '의왕시', designated: '2020-02-21', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-197호(2020.2.21)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '의왕시', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '경기도', region: '수원시 광교택지개발지구', scope: '영통구 이의동·원천동·하동·매탄동, 팔달구 우만동, 장안구 연무동 일원', designated: '2018-08-28', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2018-1088호(2018.8.28)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '수원시 팔달구', designated: '2018-12-31', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2018-1766호(2018.12.31)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '수원시 영통구', designated: '2020-02-21', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-197호(2020.2.21)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '수원시 권선구', designated: '2020-02-21', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-197호(2020.2.21)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '수원시 장안구', designated: '2020-02-21', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-197호(2020.2.21)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '수원시 영통구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '경기도', region: '수원시 장안구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '경기도', region: '수원시 팔달구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '경기도', region: '안양시 동안구', designated: '2018-08-28', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2018-1088호(2018.8.28)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '안양시 동안구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '경기도', region: '안양시 만안구', designated: '2020-02-21', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-197호(2020.2.21)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '용인시 광교택지개발지구', scope: '수지구 상현동, 기흥구 영덕동 일원', designated: '2018-08-28', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2018-1088호(2018.8.28)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '용인시 수지구', designated: '2018-12-31', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2018-1766호(2018.12.31)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '용인시 기흥구', designated: '2018-12-31', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2018-1766호(2018.12.31)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '용인시 처인구', scope: '포곡읍, 모현면, 백암면, 양지면 및 원삼면 가재월리·사암리·미평리·좌항리·맹리·두창리 제외', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '용인시 수지구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1223호(2025.10.16)' },
  { type: 'adjustment', sido: '경기도', region: '용인시 기흥구', designated: '2026-07-01', redesignation: true },
  { type: 'adjustment', sido: '경기도', region: '화성시 동탄2택지개발지구', scope: '반송동·석우동, 동탄면 금곡리·목리·방교리·산척리·송리·신리·영천리·오산리·장지리·중리·청계리 일원에 지정된 택지개발지구에 한함', designated: '2017-09-06', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '화성시', scope: '전 지역', designated: '2020-06-19', lifted: '2022-11-14', note: '서신면은 2022.7.5 선(先)해제', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)·제2020-877호 정정(2020.6.29)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '화성시 서신면', designated: '2020-06-19', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)·제2020-877호 정정(2020.6.29)', liftNotice: '국토교통부공고 제2022-883호(2022.7.5)' },
  { type: 'adjustment', sido: '경기도', region: '화성시 동탄구', designated: '2026-07-01', redesignation: true, note: '2026년 구제(區制) 시행에 따른 동탄구 단위 지정' },
  { type: 'adjustment', sido: '경기도', region: '구리시', designated: '2018-08-28', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2018-1088호(2018.8.28)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '구리시', designated: '2026-07-01', redesignation: true },
  { type: 'adjustment', sido: '경기도', region: '고양시', scope: '삼송택지개발지구, 원흥·지축·향동 공공주택지구, 덕은·킨텍스(고양국제전시장)1단계·고양관광문화단지(한류월드) 도시개발구역 제외', designated: '2017-09-06', lifted: '2019-11-08', note: '2019.11.8 해제 시 좌기 지구는 해제 제외(지정 유지)', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2019-1540호(2019.11.8)' },
  { type: 'adjustment', sido: '경기도', region: '고양시 삼송택지개발지구 등', scope: '삼송택지개발지구, 원흥·지축·향동 공공주택지구, 덕은·킨텍스(고양국제전시장)1단계·고양관광문화단지(한류월드) 도시개발구역', designated: '2017-09-06', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '고양시', scope: '전 지역', designated: '2020-06-19', lifted: '2022-11-14', redesignation: true, designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '남양주시', scope: '다산동·별내동 제외 지역', designated: '2017-09-06', lifted: '2019-11-08', note: '2019.11.8 해제 시 다산동·별내동은 해제 제외(지정 유지)', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2019-1540호(2019.11.8)' },
  { type: 'adjustment', sido: '경기도', region: '남양주시 다산동', designated: '2017-09-06', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '남양주시 별내동', designated: '2017-09-06', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '남양주시', scope: '화도읍·수동면·조안면 제외', designated: '2020-06-19', lifted: '2022-11-14', redesignation: true, designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '군포시', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '부천시', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '시흥시', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '오산시', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '의정부시', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '광주시', scope: '초월읍, 곤지암읍, 도척면, 퇴촌면, 남종면 및 남한산성면 제외', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '평택시', designated: '2020-06-19', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '경기도', region: '안산시', designated: '2020-06-19', lifted: '2022-11-14', note: '단원구 대부동동·대부남동·대부북동·선감동·풍도동은 2022.7.5 선(先)해제', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '안산시 단원구 대부동동·대부남동·대부북동·선감동·풍도동', designated: '2020-06-19', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-883호(2022.7.5)' },
  { type: 'adjustment', sido: '경기도', region: '안성시', scope: '일죽면, 죽산면 죽산리·용설리·장계리·매산리·장릉리·장원리·두현리 및 삼죽면 용월리·덕산리·율곡리·내장리·배태리 제외', designated: '2020-06-19', lifted: '2022-09-26', note: '미양면·대덕면, 양성면, 고삼면, 보개면, 서운면, 금광면, 죽산면, 삼죽면은 2020.12.18 추가 해제', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '경기도', region: '안성시 미양면·대덕면·양성면·고삼면·보개면·서운면·금광면·죽산면·삼죽면', designated: '2020-06-19', lifted: '2020-12-18', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2020-1650호(2020.12.18)' },
  { type: 'adjustment', sido: '경기도', region: '양주시', designated: '2020-06-19', lifted: '2022-09-26', note: '백석읍, 남면, 광적면, 은현면은 2020.12.18 선(先)해제', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '경기도', region: '양주시 백석읍·남면·광적면·은현면', designated: '2020-06-19', lifted: '2020-12-18', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2020-1650호(2020.12.18)' },
  { type: 'adjustment', sido: '경기도', region: '김포시', scope: '통진읍, 대곶면, 월곶면, 하성면 제외', designated: '2020-11-20', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-1521호(2020.11.20)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '경기도', region: '파주시', scope: '문산읍, 파주읍, 법원읍, 조리읍, 월롱면, 탄현면, 광탄면, 파평면, 적성면, 군내면, 장단면, 진동면 및 진서면 제외', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '경기도', region: '동두천시', scope: '광암동, 걸산동, 안흥동, 상봉암동, 하봉암동, 탑동동 제외', designated: '2021-08-30', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2021-1309호(2021.8.30)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  // --- 인천광역시 (2020.6.19 전 지역 지정, 강화군·옹진군 제외) ---
  { type: 'adjustment', sido: '인천광역시', region: '중구', scope: '을왕동·남북동·덕교동·무의동은 2020.12.18 선(先)해제', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '인천광역시', region: '중구 을왕동·남북동·덕교동·무의동', designated: '2020-06-19', lifted: '2020-12-18', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2020-1650호(2020.12.18)' },
  { type: 'adjustment', sido: '인천광역시', region: '동구', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '인천광역시', region: '미추홀구', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '인천광역시', region: '연수구', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '인천광역시', region: '남동구', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '인천광역시', region: '부평구', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '인천광역시', region: '계양구', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  { type: 'adjustment', sido: '인천광역시', region: '서구', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  // --- 세종특별자치시 ---
  { type: 'adjustment', sido: '세종특별자치시', region: '세종특별자치시', scope: '행정중심복합도시 건설 예정지역(SEJONG_HAENGBOK_AREA 참조)', designated: '2017-09-06', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2022-1408호(2022.11.14)' },
  // --- 부산광역시 ---
  { type: 'adjustment', sido: '부산광역시', region: '해운대구', designated: '2017-09-06', lifted: '2019-11-08', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2019-1540호(2019.11.8)' },
  { type: 'adjustment', sido: '부산광역시', region: '동래구', designated: '2017-09-06', lifted: '2019-11-08', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2019-1540호(2019.11.8)' },
  { type: 'adjustment', sido: '부산광역시', region: '수영구', designated: '2017-09-06', lifted: '2019-11-08', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2019-1540호(2019.11.8)' },
  { type: 'adjustment', sido: '부산광역시', region: '해운대구', designated: '2020-11-20', lifted: '2022-09-26', redesignation: true, designationNotice: '국토교통부공고 제2020-1521호(2020.11.20)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '부산광역시', region: '동래구', designated: '2020-11-20', lifted: '2022-09-26', redesignation: true, designationNotice: '국토교통부공고 제2020-1521호(2020.11.20)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '부산광역시', region: '수영구', designated: '2020-11-20', lifted: '2022-09-26', redesignation: true, designationNotice: '국토교통부공고 제2020-1521호(2020.11.20)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '부산광역시', region: '남구', designated: '2017-09-06', lifted: '2018-12-31', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2018-1767호(2018.12.31)' },
  { type: 'adjustment', sido: '부산광역시', region: '연제구', designated: '2017-09-06', lifted: '2018-12-31', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2018-1767호(2018.12.31)' },
  { type: 'adjustment', sido: '부산광역시', region: '남구', designated: '2020-11-20', lifted: '2022-09-26', redesignation: true, designationNotice: '국토교통부공고 제2020-1521호(2020.11.20)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '부산광역시', region: '연제구', designated: '2020-11-20', lifted: '2022-09-26', redesignation: true, designationNotice: '국토교통부공고 제2020-1521호(2020.11.20)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '부산광역시', region: '부산진구', designated: '2017-09-06', lifted: '2018-12-31', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2018-1767호(2018.12.31)' },
  { type: 'adjustment', sido: '부산광역시', region: '부산진구', designated: '2020-12-18', lifted: '2022-09-26', redesignation: true, designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '부산광역시', region: '기장군', scope: '일광면 제외', designated: '2017-09-06', lifted: '2018-08-28', note: '2017.9.6 기장군 전체 지정 → 2018.8.28 기장군(일광면)으로 조정', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2018-1089호(2018.8.28)' },
  { type: 'adjustment', sido: '부산광역시', region: '기장군 일광면', designated: '2017-09-06', lifted: '2018-12-31', designationNotice: '국토교통부공고 제2017-1305호(2017.9.6)', liftNotice: '국토교통부공고 제2018-1767호(2018.12.31)' },
  { type: 'adjustment', sido: '부산광역시', region: '서구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '부산광역시', region: '동구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '부산광역시', region: '영도구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '부산광역시', region: '금정구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '부산광역시', region: '북구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '부산광역시', region: '강서구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '부산광역시', region: '사상구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '부산광역시', region: '사하구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  // --- 대구광역시 ---
  { type: 'adjustment', sido: '대구광역시', region: '수성구', designated: '2020-11-20', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1521호(2020.11.20)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '대구광역시', region: '중구', designated: '2020-12-18', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-883호(2022.7.5)' },
  { type: 'adjustment', sido: '대구광역시', region: '동구', designated: '2020-12-18', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-883호(2022.7.5)' },
  { type: 'adjustment', sido: '대구광역시', region: '서구', designated: '2020-12-18', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-883호(2022.7.5)' },
  { type: 'adjustment', sido: '대구광역시', region: '남구', designated: '2020-12-18', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-883호(2022.7.5)' },
  { type: 'adjustment', sido: '대구광역시', region: '북구', designated: '2020-12-18', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-883호(2022.7.5)' },
  { type: 'adjustment', sido: '대구광역시', region: '달서구', designated: '2020-12-18', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-883호(2022.7.5)' },
  { type: 'adjustment', sido: '대구광역시', region: '달성군', scope: '가창면, 구지면, 하빈면, 논공읍, 옥포읍, 유가읍 및 현풍읍 제외', designated: '2020-12-18', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-883호(2022.7.5)' },
  // --- 광주광역시 ---
  { type: 'adjustment', sido: '광주광역시', region: '동구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '광주광역시', region: '서구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '광주광역시', region: '남구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '광주광역시', region: '북구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '광주광역시', region: '광산구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  // --- 대전광역시 (2020.6.19 전 지역) ---
  { type: 'adjustment', sido: '대전광역시', region: '동구', designated: '2020-06-19', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '대전광역시', region: '중구', designated: '2020-06-19', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '대전광역시', region: '서구', designated: '2020-06-19', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '대전광역시', region: '유성구', designated: '2020-06-19', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '대전광역시', region: '대덕구', designated: '2020-06-19', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  // --- 울산광역시 ---
  { type: 'adjustment', sido: '울산광역시', region: '중구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '울산광역시', region: '남구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  // --- 충청북도 ---
  { type: 'adjustment', sido: '충청북도', region: '청주시', scope: '동 지역, 오창·오송읍만 지정(낭성면, 미원면, 가덕면, 남일면, 문의면, 남이면, 현도면, 강내면, 옥산면, 내수읍 및 북이면 제외)', designated: '2020-06-19', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-828호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  // --- 충청남도 ---
  { type: 'adjustment', sido: '충청남도', region: '천안시 동남구', scope: '목천읍, 풍세면, 광덕면, 북면, 성남면, 수신면, 병천면 및 동면 제외', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '충청남도', region: '천안시 서북구', scope: '성환읍, 성거읍, 직산읍 및 입장면 제외', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '충청남도', region: '논산시', scope: '강경읍, 연무읍, 성동면, 광석면, 노성면, 상월면, 부적면, 연산면, 벌곡면, 양촌면, 가야곡면, 은진면 및 채운면 제외', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '충청남도', region: '공주시', scope: '유구읍, 이인면, 탄천면, 계룡면, 반포면, 의당면, 정안면, 우성면, 사곡면 및 신풍면 제외', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  // --- 전라북도 ---
  { type: 'adjustment', sido: '전라북도', region: '전주시 완산구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '전라북도', region: '전주시 덕진구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  // --- 전라남도 ---
  { type: 'adjustment', sido: '전라남도', region: '여수시', scope: '돌산읍, 율촌면, 화양면, 남면, 화정면 및 삼산면 제외', designated: '2020-12-18', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-883호(2022.7.5)' },
  { type: 'adjustment', sido: '전라남도', region: '순천시', scope: '승주읍, 황전면, 월등면, 주암면, 송광면, 외서면, 낙안면, 별량면 및 상사면 제외', designated: '2020-12-18', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-883호(2022.7.5)' },
  { type: 'adjustment', sido: '전라남도', region: '광양시', scope: '봉강면, 옥룡면, 옥곡면, 진상면, 진월면 및 다압면 제외', designated: '2020-12-18', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-883호(2022.7.5)' },
  // --- 경상북도 ---
  { type: 'adjustment', sido: '경상북도', region: '포항시 남구', scope: '구룡포읍, 연일읍, 오천읍, 대송면, 동해면, 장기면 및 호미곶면 제외', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },
  { type: 'adjustment', sido: '경상북도', region: '경산시', scope: '하양읍, 진량읍, 압량읍, 와촌면, 자인면, 용성면, 남산면 및 남천면 제외', designated: '2020-12-18', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-883호(2022.7.5)' },
  // --- 경상남도 ---
  { type: 'adjustment', sido: '경상남도', region: '창원시 성산구', designated: '2020-12-18', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-1650호(2020.12.18)', liftNotice: '국토교통부공고 제2022-1207호(2022.9.26)' },

  // ===========================================================================
  // 2. 투기과열지구 (overheated)
  // ===========================================================================
  // --- 서울특별시: 강남3구·용산 (2017.8.3 지정, 계속 지정 중) ---
  { type: 'overheated', sido: '서울특별시', region: '서초구', designated: '2017-08-03', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)' },
  { type: 'overheated', sido: '서울특별시', region: '강남구', designated: '2017-08-03', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)' },
  { type: 'overheated', sido: '서울특별시', region: '송파구', designated: '2017-08-03', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)' },
  { type: 'overheated', sido: '서울특별시', region: '용산구', designated: '2017-08-03', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)' },
  // --- 서울특별시: 21개구 1차 (2017.8.3 서울 전역 25개구 지정 ~ 2023.1.5) ---
  { type: 'overheated', sido: '서울특별시', region: '종로구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '중구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '성동구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '광진구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '동대문구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '중랑구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '성북구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '강북구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '도봉구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '노원구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '은평구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '서대문구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '마포구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '양천구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '강서구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '구로구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '금천구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '영등포구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '동작구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '관악구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '서울특별시', region: '강동구', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  // --- 서울특별시: 21개구 재지정 (2025.10.16 ~ 현재) ---
  { type: 'overheated', sido: '서울특별시', region: '종로구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '중구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '성동구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '광진구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '동대문구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '중랑구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '성북구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '강북구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '도봉구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '노원구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '은평구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '서대문구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '마포구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '양천구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '강서구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '구로구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '금천구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '영등포구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '동작구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '관악구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '서울특별시', region: '강동구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  // --- 경기도 ---
  { type: 'overheated', sido: '경기도', region: '과천시', designated: '2017-08-03', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '경기도', region: '과천시', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '경기도', region: '성남시 분당구', designated: '2017-09-06', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2017-1304호(2017.9.6)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '경기도', region: '성남시 분당구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '경기도', region: '광명시', designated: '2018-08-28', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2018-1086호(2018.8.28)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '경기도', region: '광명시', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '경기도', region: '하남시', designated: '2018-08-28', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2018-1086호(2018.8.28)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '경기도', region: '하남시', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '경기도', region: '성남시 수정구', designated: '2020-06-19', lifted: '2023-01-05', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)', liftNotice: '국토교통부공고 제2023-1호(2023.1.5)' },
  { type: 'overheated', sido: '경기도', region: '성남시 수정구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '경기도', region: '성남시 중원구', designated: '2025-10-16', note: '투기과열지구로는 신규 지정', designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '경기도', region: '수원시', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1407호(2022.11.14)' },
  { type: 'overheated', sido: '경기도', region: '수원시 영통구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '경기도', region: '수원시 장안구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '경기도', region: '수원시 팔달구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '경기도', region: '안양시', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1407호(2022.11.14)' },
  { type: 'overheated', sido: '경기도', region: '안양시 동안구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '경기도', region: '안산시 단원구', designated: '2020-06-19', lifted: '2022-11-14', note: '대부동동·대부남동·대부북동·선감동·풍도동은 2022.7.5 선(先)해제', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1407호(2022.11.14)' },
  { type: 'overheated', sido: '경기도', region: '안산시 단원구 대부동동·대부남동·대부북동·선감동·풍도동', designated: '2020-06-19', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)', liftNotice: '국토교통부공고 제2022-882호(2022.7.5)' },
  { type: 'overheated', sido: '경기도', region: '구리시', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1407호(2022.11.14)' },
  { type: 'overheated', sido: '경기도', region: '구리시', designated: '2026-07-01', redesignation: true },
  { type: 'overheated', sido: '경기도', region: '군포시', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1407호(2022.11.14)' },
  { type: 'overheated', sido: '경기도', region: '의왕시', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1407호(2022.11.14)' },
  { type: 'overheated', sido: '경기도', region: '의왕시', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '경기도', region: '용인시 수지구', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1407호(2022.11.14)' },
  { type: 'overheated', sido: '경기도', region: '용인시 수지구', designated: '2025-10-16', redesignation: true, designationNotice: '국토교통부공고 제2025-1225호(2025.10.16)' },
  { type: 'overheated', sido: '경기도', region: '용인시 기흥구', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1407호(2022.11.14)' },
  { type: 'overheated', sido: '경기도', region: '용인시 기흥구', designated: '2026-07-01', redesignation: true },
  { type: 'overheated', sido: '경기도', region: '화성시 동탄2택지개발지구', scope: '화성시 반송동·석우동, 동탄면 금곡리·목리·방교리·산척리·송리·신리·영천리·오산리·장지리·중리·청계리 일원에 지정된 동탄2택지개발지구에 한함', designated: '2020-06-19', lifted: '2022-11-14', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)', liftNotice: '국토교통부공고 제2022-1407호(2022.11.14)' },
  { type: 'overheated', sido: '경기도', region: '화성시 동탄구', designated: '2026-07-01', redesignation: true, note: '2026년 구제(區制) 시행에 따른 동탄구 단위 지정' },
  // --- 인천광역시 ---
  { type: 'overheated', sido: '인천광역시', region: '연수구', designated: '2020-06-19', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)' },
  { type: 'overheated', sido: '인천광역시', region: '남동구', designated: '2020-06-19', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)' },
  { type: 'overheated', sido: '인천광역시', region: '서구', designated: '2020-06-19', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)' },
  // --- 대전광역시 ---
  { type: 'overheated', sido: '대전광역시', region: '동구', designated: '2020-06-19', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)', liftNotice: '국토교통부공고 제2022-882호(2022.7.5)' },
  { type: 'overheated', sido: '대전광역시', region: '중구', designated: '2020-06-19', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)', liftNotice: '국토교통부공고 제2022-882호(2022.7.5)' },
  { type: 'overheated', sido: '대전광역시', region: '서구', designated: '2020-06-19', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)', liftNotice: '국토교통부공고 제2022-882호(2022.7.5)' },
  { type: 'overheated', sido: '대전광역시', region: '유성구', designated: '2020-06-19', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2020-827호(2020.6.19)', liftNotice: '국토교통부공고 제2022-882호(2022.7.5)' },
  // --- 대구광역시 ---
  { type: 'overheated', sido: '대구광역시', region: '수성구', designated: '2017-09-06', lifted: '2022-07-05', designationNotice: '국토교통부공고 제2017-1304호(2017.9.6)', liftNotice: '국토교통부공고 제2022-882호(2022.7.5)' },
  // --- 세종특별자치시 ---
  { type: 'overheated', sido: '세종특별자치시', region: '세종특별자치시', scope: '행정중심복합도시 건설 예정지역(SEJONG_HAENGBOK_AREA 참조)', designated: '2017-08-03', lifted: '2022-09-26', designationNotice: '국토교통부공고 제2017-1173호(2017.8.3)' },
  // --- 경상남도 ---
  { type: 'overheated', sido: '경상남도', region: '창원시 의창구', scope: '대산면 제외(2020.12.18)', designated: '2020-12-18', lifted: '2022-07-05', note: '동읍·북면은 2021.8.30 선(先)해제(감계지구·무동지구 제외)', designationNotice: '국토교통부공고 제2020-1649호(2020.12.18)', liftNotice: '국토교통부공고 제2022-882호(2022.7.5)' },
  { type: 'overheated', sido: '경상남도', region: '창원시 의창구 동읍·북면', scope: '북면 감계리 일원 감계지구(창원시 고시 제2020-379호·제2021-11호), 무동리 일원 무동지구(창원시 고시 제2020-110호)는 해제 제외(지정 유지)', designated: '2020-12-18', lifted: '2021-08-30', designationNotice: '국토교통부공고 제2020-1649호(2020.12.18)', liftNotice: '국토교통부공고 제2021-1308호(2021.8.30)' },

  // ===========================================================================
  // 3. 투기지역 — 소득세법상 지정지역 (speculation)
  //    ※ 기준일: 2023.1.5 스냅샷. 구(舊) 투기지역(2003~2012)은 주택/주택외 구분.
  // ===========================================================================
  // --- 2017년 이후 (주택) ---
  { type: 'speculation', sido: '서울특별시', region: '강남구', target: '주택', designated: '2017-08-03', note: '기준일(2023.1.5) 현재 지정 중' },
  { type: 'speculation', sido: '서울특별시', region: '서초구', target: '주택', designated: '2017-08-03', note: '기준일(2023.1.5) 현재 지정 중' },
  { type: 'speculation', sido: '서울특별시', region: '송파구', target: '주택', designated: '2017-08-03', note: '기준일(2023.1.5) 현재 지정 중' },
  { type: 'speculation', sido: '서울특별시', region: '용산구', target: '주택', designated: '2017-08-03', note: '기준일(2023.1.5) 현재 지정 중' },
  { type: 'speculation', sido: '서울특별시', region: '강동구', target: '주택', designated: '2017-08-03', lifted: '2023-01-05' },
  { type: 'speculation', sido: '서울특별시', region: '성동구', target: '주택', designated: '2017-08-03', lifted: '2023-01-05' },
  { type: 'speculation', sido: '서울특별시', region: '양천구', target: '주택', designated: '2017-08-03', lifted: '2023-01-05' },
  { type: 'speculation', sido: '서울특별시', region: '강서구', target: '주택', designated: '2017-08-03', lifted: '2023-01-05' },
  { type: 'speculation', sido: '서울특별시', region: '영등포구', target: '주택', designated: '2017-08-03', lifted: '2023-01-05' },
  { type: 'speculation', sido: '서울특별시', region: '노원구', target: '주택', designated: '2017-08-03', lifted: '2023-01-05' },
  { type: 'speculation', sido: '서울특별시', region: '마포구', target: '주택', designated: '2017-08-03', lifted: '2023-01-05' },
  { type: 'speculation', sido: '서울특별시', region: '종로구', target: '주택', designated: '2018-08-28', lifted: '2023-01-05' },
  { type: 'speculation', sido: '서울특별시', region: '중구', target: '주택', designated: '2018-08-28', lifted: '2023-01-05' },
  { type: 'speculation', sido: '서울특별시', region: '동대문구', target: '주택', designated: '2018-08-28', lifted: '2023-01-05' },
  { type: 'speculation', sido: '서울특별시', region: '동작구', target: '주택', designated: '2018-08-28', lifted: '2023-01-05' },
  { type: 'speculation', sido: '세종특별자치시', region: '세종특별자치시', scope: '행정중심복합도시 건설 예정지역(SEJONG_HAENGBOK_AREA 참조)', target: '주택', designated: '2017-08-03', lifted: '2022-09-26', note: '2020.12.31 기획재정부공고 제2020-213호로 수정공고' },
  // --- 구(舊) 투기지역: 서울 (2012.5.15 기준, 주택 75개·주택외 88개 전량 해제) ---
  { type: 'speculation', sido: '서울특별시', region: '강남구', target: '주택', designated: '2003-04-30', lifted: '2012-05-15' },
  { type: 'speculation', sido: '서울특별시', region: '강남구', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '강북구', target: '주택', designated: '2006-10-27', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '강북구', target: '주택외', designated: '2005-08-19', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '강동구', target: '주택', designated: '2003-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '강동구', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '송파구', target: '주택', designated: '2003-06-14', lifted: '2012-05-15' },
  { type: 'speculation', sido: '서울특별시', region: '송파구', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '마포구', target: '주택', designated: '2003-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '마포구', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '용산구', target: '주택', designated: '2003-06-14', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '용산구', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '서초구', target: '주택', designated: '2003-06-14', lifted: '2012-05-15' },
  { type: 'speculation', sido: '서울특별시', region: '서초구', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '영등포구', target: '주택', designated: '2003-06-14', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '영등포구', target: '주택외', designated: '2006-01-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '광진구', target: '주택', designated: '2003-06-14', lifted: '2005-01-31' },
  { type: 'speculation', sido: '서울특별시', region: '광진구', target: '주택', designated: '2006-06-23', lifted: '2008-11-07', redesignation: true },
  { type: 'speculation', sido: '서울특별시', region: '광진구', target: '주택외', designated: '2005-07-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '양천구', target: '주택', designated: '2003-07-19', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '양천구', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '강서구', target: '주택', designated: '2006-04-25', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '강서구', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '금천구', target: '주택', designated: '2003-07-19', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '금천구', target: '주택외', designated: '2005-07-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '은평구', target: '주택', designated: '2003-07-19', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '은평구', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '동작구', target: '주택', designated: '2003-07-19', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '동작구', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '중랑구', target: '주택', designated: '2003-07-19', lifted: '2004-12-29' },
  { type: 'speculation', sido: '서울특별시', region: '중랑구', target: '주택', designated: '2006-11-24', lifted: '2008-11-07', redesignation: true },
  { type: 'speculation', sido: '서울특별시', region: '중랑구', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '중구', target: '주택', designated: '2006-04-25', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '중구', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '구로구', target: '주택', designated: '2005-08-19', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '구로구', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '서대문구', target: '주택', designated: '2004-03-19', lifted: '2004-12-29' },
  { type: 'speculation', sido: '서울특별시', region: '서대문구', target: '주택', designated: '2006-11-24', lifted: '2008-11-07', redesignation: true },
  { type: 'speculation', sido: '서울특별시', region: '서대문구', target: '주택외', designated: '2005-12-23', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '성동구', target: '주택', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '성동구', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '동대문구', target: '주택', designated: '2006-11-24', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '동대문구', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '관악구', target: '주택', designated: '2006-10-27', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '관악구', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '종로구', target: '주택', designated: '2005-09-15', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '종로구', target: '주택외', designated: '2006-01-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '성북구', target: '주택', designated: '2006-10-27', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '성북구', target: '주택외', designated: '2005-12-23', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '노원구', target: '주택', designated: '2006-11-24', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '노원구', target: '주택외', designated: '2006-01-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '도봉구', target: '주택', designated: '2006-11-24', lifted: '2008-11-07' },
  { type: 'speculation', sido: '서울특별시', region: '도봉구', target: '주택외', designated: '2006-07-26', lifted: '2008-11-07' },
  // --- 구(舊) 투기지역: 부산 ---
  { type: 'speculation', sido: '부산광역시', region: '북구', target: '주택', designated: '2003-07-19', lifted: '2004-08-25' },
  { type: 'speculation', sido: '부산광역시', region: '해운대구', target: '주택', designated: '2003-07-19', lifted: '2004-08-25' },
  { type: 'speculation', sido: '부산광역시', region: '수영구', target: '주택', designated: '2005-06-30', lifted: '2006-09-29' },
  { type: 'speculation', sido: '부산광역시', region: '강서구', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '부산광역시', region: '기장군', target: '주택외', designated: '2005-08-19', lifted: '2008-11-07' },
  // --- 구(舊) 투기지역: 대구 ---
  { type: 'speculation', sido: '대구광역시', region: '서구', target: '주택', designated: '2003-10-20', lifted: '2004-08-25' },
  { type: 'speculation', sido: '대구광역시', region: '수성구', target: '주택', designated: '2003-10-20', lifted: '2004-08-25' },
  { type: 'speculation', sido: '대구광역시', region: '수성구', target: '주택', designated: '2005-06-30', lifted: '2006-09-29', redesignation: true },
  { type: 'speculation', sido: '대구광역시', region: '중구', target: '주택', designated: '2003-10-20', lifted: '2004-08-25' },
  { type: 'speculation', sido: '대구광역시', region: '중구', target: '주택', designated: '2005-08-19', lifted: '2006-09-29', redesignation: true },
  { type: 'speculation', sido: '대구광역시', region: '동구', target: '주택', designated: '2005-06-30', lifted: '2007-09-28' },
  { type: 'speculation', sido: '대구광역시', region: '동구', target: '주택외', designated: '2006-02-21', lifted: '2008-11-07' },
  { type: 'speculation', sido: '대구광역시', region: '북구', target: '주택', designated: '2005-06-30', lifted: '2007-09-28' },
  { type: 'speculation', sido: '대구광역시', region: '달서구', target: '주택', designated: '2005-06-30', lifted: '2007-09-28' },
  { type: 'speculation', sido: '대구광역시', region: '달성군', target: '주택', designated: '2005-09-15', lifted: '2006-09-29' },
  // --- 구(舊) 투기지역: 광주 ---
  { type: 'speculation', sido: '광주광역시', region: '광산구', target: '주택', designated: '2005-06-30', lifted: '2007-09-28' },
  { type: 'speculation', sido: '광주광역시', region: '광산구', target: '주택외', designated: '', lifted: '2008-11-07', needsVerify: true, note: '원문 표에 주택외 지정일 공란 — 원본 공고 대조 필요' },
  // --- 구(舊) 투기지역: 인천 ---
  { type: 'speculation', sido: '인천광역시', region: '남동구', target: '주택', designated: '2003-06-14', lifted: '2004-12-29' },
  { type: 'speculation', sido: '인천광역시', region: '남동구', target: '주택', designated: '2007-06-29', lifted: '2008-11-07', redesignation: true },
  { type: 'speculation', sido: '인천광역시', region: '남동구', target: '주택외', designated: '2006-12-27', lifted: '2008-11-07' },
  { type: 'speculation', sido: '인천광역시', region: '서구', target: '주택', designated: '2003-06-14', lifted: '2005-01-31' },
  { type: 'speculation', sido: '인천광역시', region: '서구', target: '주택', designated: '2006-05-26', lifted: '2008-11-07', redesignation: true },
  { type: 'speculation', sido: '인천광역시', region: '서구', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '인천광역시', region: '부평구', target: '주택', designated: '2003-07-19', lifted: '2004-12-29' },
  { type: 'speculation', sido: '인천광역시', region: '부평구', target: '주택', designated: '2006-11-24', lifted: '2008-11-07', redesignation: true },
  { type: 'speculation', sido: '인천광역시', region: '부평구', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '인천광역시', region: '강화군', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '인천광역시', region: '옹진군', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '인천광역시', region: '중구', target: '주택', designated: '2007-12-03', lifted: '2008-11-07' },
  { type: 'speculation', sido: '인천광역시', region: '중구', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '인천광역시', region: '계양구', target: '주택', designated: '2006-12-27', lifted: '2008-11-07' },
  { type: 'speculation', sido: '인천광역시', region: '계양구', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '인천광역시', region: '연수구', target: '주택', designated: '2006-11-24', lifted: '2008-11-07' },
  { type: 'speculation', sido: '인천광역시', region: '연수구', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '인천광역시', region: '남구', target: '주택', designated: '2006-12-27', lifted: '2008-11-07', note: '현 미추홀구' },
  { type: 'speculation', sido: '인천광역시', region: '남구', target: '주택외', designated: '2006-12-27', lifted: '2008-11-07', note: '현 미추홀구' },
  { type: 'speculation', sido: '인천광역시', region: '동구', target: '주택', designated: '2008-01-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '인천광역시', region: '동구', target: '주택외', designated: '2006-12-27', lifted: '2008-11-07' },
  // --- 구(舊) 투기지역: 대전 ---
  { type: 'speculation', sido: '대전광역시', region: '유성구', target: '주택', designated: '2003-02-27', lifted: '2004-12-29' },
  { type: 'speculation', sido: '대전광역시', region: '유성구', target: '주택', designated: '2005-05-30', lifted: '2007-12-03', redesignation: true },
  { type: 'speculation', sido: '대전광역시', region: '유성구', target: '주택외', designated: '2003-08-18', lifted: '2008-11-07' },
  { type: 'speculation', sido: '대전광역시', region: '서구', target: '주택', designated: '2003-02-27', lifted: '2004-12-29' },
  { type: 'speculation', sido: '대전광역시', region: '서구', target: '주택', designated: '2005-05-30', lifted: '2007-09-28', redesignation: true },
  { type: 'speculation', sido: '대전광역시', region: '서구', target: '주택외', designated: '2003-08-18', lifted: '2007-12-03' },
  { type: 'speculation', sido: '대전광역시', region: '동구', target: '주택', designated: '2003-10-20', lifted: '2005-01-31' },
  { type: 'speculation', sido: '대전광역시', region: '동구', target: '주택외', designated: '2005-07-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '대전광역시', region: '대덕구', target: '주택', designated: '2003-10-20', lifted: '2004-12-29' },
  { type: 'speculation', sido: '대전광역시', region: '대덕구', target: '주택', designated: '2005-05-30', lifted: '2007-09-28', redesignation: true },
  { type: 'speculation', sido: '대전광역시', region: '대덕구', target: '주택외', designated: '2005-06-30', lifted: '2007-12-03' },
  { type: 'speculation', sido: '대전광역시', region: '중구', target: '주택', designated: '2004-06-21', lifted: '2005-01-31' },
  { type: 'speculation', sido: '대전광역시', region: '중구', target: '주택', designated: '2005-05-30', lifted: '2007-09-28', redesignation: true },
  // --- 구(舊) 투기지역: 경기 ---
  { type: 'speculation', sido: '경기도', region: '광명시', target: '주택', designated: '2003-04-30', lifted: '2005-01-31' },
  { type: 'speculation', sido: '경기도', region: '광명시', target: '주택', designated: '2005-04-29', lifted: '2008-11-07', redesignation: true },
  { type: 'speculation', sido: '경기도', region: '광명시', target: '주택외', designated: '2004-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '수원시 장안구', target: '주택', designated: '2003-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '수원시 팔달구', target: '주택', designated: '2003-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '수원시 영통구', target: '주택', designated: '2003-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '수원시 영통구', target: '주택외', designated: '2005-07-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '수원시 권선구', target: '주택', designated: '2003-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '수원시 권선구', target: '주택외', designated: '2006-01-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '안양시 만안구', target: '주택', designated: '2003-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '안양시 동안구', target: '주택', designated: '2003-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '안양시 동안구', target: '주택외', designated: '2005-07-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '과천시', target: '주택', designated: '2003-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '과천시', target: '주택외', designated: '2005-07-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '안산시 상록구', target: '주택', designated: '2003-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '안산시 단원구', target: '주택', designated: '2003-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '안산시 단원구', target: '주택외', designated: '2007-09-28', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '화성시', target: '주택', designated: '2003-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '화성시', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '성남시 수정구', target: '주택', designated: '2003-06-14', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '성남시 수정구', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '성남시 중원구', target: '주택', designated: '2003-06-14', lifted: '2005-01-31' },
  { type: 'speculation', sido: '경기도', region: '성남시 중원구', target: '주택', designated: '2006-03-22', lifted: '2008-11-07', redesignation: true },
  { type: 'speculation', sido: '경기도', region: '성남시 중원구', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '성남시 분당구', target: '주택', designated: '2003-10-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '성남시 분당구', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '부천시', scope: '전 지역', target: '주택', designated: '2003-06-14', lifted: '2005-01-31' },
  { type: 'speculation', sido: '경기도', region: '부천시', scope: '전 지역', target: '주택외', designated: '', lifted: '2008-11-07', needsVerify: true, note: '원문 표에 주택외 지정일 공란 — 원본 공고 대조 필요' },
  { type: 'speculation', sido: '경기도', region: '부천시 소사구', target: '주택', designated: '2005-09-15', lifted: '2008-11-07', redesignation: true },
  { type: 'speculation', sido: '경기도', region: '부천시 소사구', target: '주택외', designated: '2005-09-15', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '부천시 원미구', target: '주택', designated: '2006-06-23', lifted: '2008-11-07', redesignation: true },
  { type: 'speculation', sido: '경기도', region: '부천시 오정구', target: '주택', designated: '2006-10-27', lifted: '2008-11-07', redesignation: true },
  { type: 'speculation', sido: '경기도', region: '구리시', target: '주택', designated: '2003-06-14', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '구리시', target: '주택외', designated: '2007-01-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '군포시', target: '주택', designated: '2003-06-14', lifted: '2004-12-29' },
  { type: 'speculation', sido: '경기도', region: '군포시', target: '주택', designated: '2005-07-20', lifted: '2008-11-07', redesignation: true },
  { type: 'speculation', sido: '경기도', region: '김포시', target: '주택', designated: '2003-06-14', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '김포시', target: '주택외', designated: '2003-08-18', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '용인시', target: '주택', designated: '2003-07-19', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '용인시', target: '주택외', designated: '2005-07-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '오산시', target: '주택', designated: '2003-08-18', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '오산시', target: '주택외', designated: '2004-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '평택시', target: '주택', designated: '2003-10-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '평택시', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '고양시 일산구', target: '주택', designated: '2003-07-19', lifted: '2008-11-07', note: '현 일산동구·일산서구' },
  { type: 'speculation', sido: '경기도', region: '고양시 일산구', target: '주택외', designated: '2004-08-25', lifted: '2008-11-07', note: '현 일산동구·일산서구' },
  { type: 'speculation', sido: '경기도', region: '고양시 덕양구', target: '주택', designated: '2003-10-20', lifted: '2004-12-29' },
  { type: 'speculation', sido: '경기도', region: '고양시 덕양구', target: '주택', designated: '2006-06-23', lifted: '2008-11-07', redesignation: true },
  { type: 'speculation', sido: '경기도', region: '고양시 덕양구', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '하남시', target: '주택', designated: '2003-10-20', lifted: '2004-12-29' },
  { type: 'speculation', sido: '경기도', region: '하남시', target: '주택', designated: '2006-05-26', lifted: '2008-11-07', redesignation: true },
  { type: 'speculation', sido: '경기도', region: '하남시', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '안성시', target: '주택', designated: '2003-10-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '안성시', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '남양주시', target: '주택', designated: '2006-10-27', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '남양주시', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '광주시', target: '주택', designated: '2005-08-19', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '광주시', target: '주택외', designated: '2004-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '이천시', target: '주택', designated: '2005-08-19', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '이천시', target: '주택외', designated: '2004-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '여주군', target: '주택', designated: '', lifted: '2008-11-07', needsVerify: true, note: '원문 표에 주택 지정일 공란(해제일만 기재) — 원본 공고 대조 필요. 현 여주시' },
  { type: 'speculation', sido: '경기도', region: '여주군', target: '주택외', designated: '2004-05-29', lifted: '2008-11-07', note: '현 여주시' },
  { type: 'speculation', sido: '경기도', region: '의왕시', target: '주택', designated: '2004-05-29', lifted: '2004-12-29' },
  { type: 'speculation', sido: '경기도', region: '의왕시', target: '주택', designated: '2005-05-30', lifted: '2008-11-07', redesignation: true },
  { type: 'speculation', sido: '경기도', region: '의왕시', target: '주택외', designated: '2004-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '파주시', target: '주택', designated: '2003-06-14', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '파주시', target: '주택외', designated: '2004-08-25', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '양주시', target: '주택', designated: '2006-12-27', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '양주시', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '시흥시', target: '주택', designated: '2006-11-24', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '의정부시', target: '주택', designated: '2007-01-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '경기도', region: '동두천시', target: '주택', designated: '2007-12-03', lifted: '2008-11-07' },
  // --- 구(舊) 투기지역: 강원 ---
  { type: 'speculation', sido: '강원도', region: '춘천시', target: '주택', designated: '2003-07-19', lifted: '2004-08-25' },
  { type: 'speculation', sido: '강원도', region: '원주시', target: '주택', designated: '2006-04-25', lifted: '2007-12-03' },
  { type: 'speculation', sido: '강원도', region: '원주시', target: '주택외', designated: '2005-03-29', lifted: '2007-12-03' },
  // --- 구(舊) 투기지역: 충남 ---
  { type: 'speculation', sido: '충청남도', region: '천안시', target: '주택', designated: '2003-02-27', lifted: '2008-01-30' },
  { type: 'speculation', sido: '충청남도', region: '천안시', target: '주택외', designated: '2003-05-29', lifted: '2008-11-07' },
  { type: 'speculation', sido: '충청남도', region: '아산시', target: '주택', designated: '2003-08-18', lifted: '2008-01-30' },
  { type: 'speculation', sido: '충청남도', region: '아산시', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '충청남도', region: '공주시', target: '주택', designated: '2003-10-20', lifted: '2007-12-03' },
  { type: 'speculation', sido: '충청남도', region: '공주시', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '충청남도', region: '계룡시', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07' },
  { type: 'speculation', sido: '충청남도', region: '당진군', target: '주택외', designated: '2004-08-25', lifted: '2008-11-07', note: '현 당진시' },
  { type: 'speculation', sido: '충청남도', region: '예산군', target: '주택외', designated: '2004-08-25', lifted: '2008-11-07' },
  { type: 'speculation', sido: '충청남도', region: '홍성군', target: '주택외', designated: '2004-08-25', lifted: '2008-11-07' },
  { type: 'speculation', sido: '충청남도', region: '청양군', target: '주택외', designated: '2004-08-25', lifted: '2008-11-07' },
  { type: 'speculation', sido: '충청남도', region: '서산시', target: '주택외', designated: '2004-08-25', lifted: '2008-11-07' },
  { type: 'speculation', sido: '충청남도', region: '태안군', target: '주택외', designated: '2004-08-25', lifted: '2008-01-30' },
  { type: 'speculation', sido: '충청남도', region: '논산시', target: '주택외', designated: '2004-08-25', lifted: '2007-12-03' },
  { type: 'speculation', sido: '충청남도', region: '금산군', target: '주택외', designated: '2005-06-30', lifted: '2007-12-03' },
  { type: 'speculation', sido: '충청남도', region: '보령시', target: '주택외', designated: '2005-08-19', lifted: '2007-12-03' },
  { type: 'speculation', sido: '충청남도', region: '연기군', target: '주택', designated: '2006-01-20', lifted: '2007-12-03', note: '현 세종특별자치시 일원' },
  { type: 'speculation', sido: '충청남도', region: '연기군', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07', note: '현 세종특별자치시 일원' },
  // --- 구(舊) 투기지역: 충북 ---
  { type: 'speculation', sido: '충청북도', region: '청주시', target: '주택', designated: '2003-06-14', lifted: '2005-01-31' },
  { type: 'speculation', sido: '충청북도', region: '청주시 흥덕구', target: '주택', designated: '2005-07-20', lifted: '2007-09-28', redesignation: true },
  { type: 'speculation', sido: '충청북도', region: '청주시 흥덕구', target: '주택외', designated: '2006-02-21', lifted: '2007-12-03', note: '원문 표에서 상당구와 병합 표기' },
  { type: 'speculation', sido: '충청북도', region: '청주시 상당구', target: '주택', designated: '2006-04-25', lifted: '2007-09-28', redesignation: true },
  { type: 'speculation', sido: '충청북도', region: '청주시 상당구', target: '주택외', designated: '2006-02-21', lifted: '2007-12-03', note: '원문 표에서 흥덕구와 병합 표기' },
  { type: 'speculation', sido: '충청북도', region: '청원군', target: '주택', designated: '2004-02-26', lifted: '2007-09-28', note: '현 청주시 편입' },
  { type: 'speculation', sido: '충청북도', region: '청원군', target: '주택외', designated: '2004-02-26', lifted: '2008-11-07', note: '현 청주시 편입' },
  { type: 'speculation', sido: '충청북도', region: '충주시', target: '주택외', designated: '2005-06-30', lifted: '2007-12-03' },
  { type: 'speculation', sido: '충청북도', region: '진천군', target: '주택외', designated: '2005-06-30', lifted: '2008-11-07' },
  { type: 'speculation', sido: '충청북도', region: '음성군', target: '주택외', designated: '2005-07-20', lifted: '2008-11-07' },
  // --- 구(舊) 투기지역: 전남·전북 ---
  { type: 'speculation', sido: '전라남도', region: '무안군', target: '주택외', designated: '2005-08-19', lifted: '2008-11-07' },
  { type: 'speculation', sido: '전라남도', region: '나주시', target: '주택외', designated: '2006-01-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '전라북도', region: '무주군', target: '주택외', designated: '2005-07-20', lifted: '2008-11-07' },
  { type: 'speculation', sido: '전라북도', region: '완주군', target: '주택외', designated: '2006-01-20', lifted: '2007-12-03' },
  // --- 구(舊) 투기지역: 경남·울산 (원문 표에는 울산이 경남 블록에 기재) ---
  { type: 'speculation', sido: '경상남도', region: '창원시', target: '주택', designated: '2003-06-14', lifted: '2007-12-03' },
  { type: 'speculation', sido: '경상남도', region: '양산시', target: '주택', designated: '2003-10-20', lifted: '2004-08-25' },
  { type: 'speculation', sido: '울산광역시', region: '남구', target: '주택외', designated: '2005-07-20', lifted: '2008-01-30', note: '원문 표에는 경남 블록에 기재' },
  { type: 'speculation', sido: '울산광역시', region: '중구', target: '주택외', designated: '2006-02-21', lifted: '2008-01-30', note: '원문 표에는 경남 블록에 기재' },
  { type: 'speculation', sido: '울산광역시', region: '동구', target: '주택외', designated: '2006-11-24', lifted: '2008-01-30', note: '원문 표에는 경남 블록에 기재' },
  { type: 'speculation', sido: '울산광역시', region: '북구', target: '주택외', designated: '2006-11-24', lifted: '2008-01-30', note: '원문 표에는 경남 블록에 기재' },
  { type: 'speculation', sido: '경상남도', region: '진주시', target: '주택', designated: '2006-01-20', lifted: '2007-12-03' },
  { type: 'speculation', sido: '경상남도', region: '진주시', target: '주택외', designated: '2005-12-23', lifted: '2008-01-30' },
  { type: 'speculation', sido: '경상남도', region: '거제시', target: '주택외', designated: '2006-09-29', lifted: '2008-11-07' },
  // --- 구(舊) 투기지역: 경북·제주 ---
  { type: 'speculation', sido: '경상북도', region: '포항시 북구', target: '주택외', designated: '2005-06-30', lifted: '2007-09-28' },
  { type: 'speculation', sido: '경상북도', region: '구미시', target: '주택외', designated: '2005-07-20', lifted: '2007-09-28' },
  { type: 'speculation', sido: '경상북도', region: '김천시', target: '주택외', designated: '2006-02-21', lifted: '2008-11-07' },
  { type: 'speculation', sido: '제주특별자치도', region: '남제주군', target: '주택외', designated: '2005-08-19', lifted: '2007-12-03', note: '현 서귀포시 일원' },
];

// =============================================================================
// 헬퍼
// =============================================================================

/** 기준일 현재 지정 중인지 여부 */
export function isActive(p: RegulationPeriod): boolean {
  return !p.lifted;
}

/**
 * 지역명 검색: sido / region / scope 부분 일치.
 * 결과는 규제 종류 → 지정일 순으로 정렬.
 */
export function findRegionHistory(query: string): RegulationPeriod[] {
  const q = query.trim();
  if (!q) return [];
  const typeOrder: RegulationType[] = ['adjustment', 'overheated', 'speculation'];
  return regulationPeriods
    .filter((p) => p.sido.includes(q) || p.region.includes(q) || (p.scope ?? '').includes(q))
    .sort(
      (a, b) =>
        typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type) ||
        (a.designated || '9999').localeCompare(b.designated || '9999'),
    );
}

/** 타임라인용: 날짜별 지정/해제 이벤트로 변환 */
export interface RegulationEvent {
  date: string;
  kind: '지정' | '해제';
  type: RegulationType;
  sido: string;
  region: string;
  scope?: string;
  target?: '주택' | '주택외';
  note?: string;
}

export function toTimelineEvents(periods: RegulationPeriod[] = regulationPeriods): RegulationEvent[] {
  const events: RegulationEvent[] = [];
  for (const p of periods) {
    if (p.designated) {
      events.push({ date: p.designated, kind: '지정', type: p.type, sido: p.sido, region: p.region, scope: p.scope, target: p.target, note: p.note });
    }
    if (p.lifted) {
      events.push({ date: p.lifted, kind: '해제', type: p.type, sido: p.sido, region: p.region, scope: p.scope, target: p.target });
    }
  }
  return events.sort((a, b) => b.date.localeCompare(a.date));
}
