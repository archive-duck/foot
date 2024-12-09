export const FAMILY_SEARCH_DOMAINS = ['www.familysearch.org'];
export const BABYN_YAR_DOMAINS = ['babynyar.org'];
export const ARCHIUM_DOMAINS = [
  'archium.krop.archives.gov.ua',
  'archium.cdiak.archives.gov.ua',
  'e-resource.tsdavo.gov.ua',
  'e.tsdahou.archives.gov.ua',
  'ksi-csamm.archives.gov.ua',
  'e.archivelviv.gov.ua',
  'zunr.arinsy.com',
  'archium.tsdial.archives.gov.ua',
  '185.250.20.62',
  '185.250.20.252'
];

export enum Mode {
  FAMILY_SEARCH = "familysearch",
  ARCHIUM = "archium",
  BABYN_YAR = "babynyar.org",
  UNKNOWN = "unknown"
}

export const url2mode = (url?: string) => {
  if (!url) {
    return Mode.UNKNOWN;
  }

  if (FAMILY_SEARCH_DOMAINS.some(domain => url.includes(domain))) {
    return Mode.FAMILY_SEARCH;
  }

  if (ARCHIUM_DOMAINS.some(domain => url.includes(domain))) {
    return Mode.ARCHIUM;
  }

  if (BABYN_YAR_DOMAINS.some(domain => url.includes(domain))) {
    return Mode.BABYN_YAR;
  }

  return Mode.UNKNOWN;
};