type LanguageVariation = {
  ko: string;
  en: string;
};

type ComponentSize = {
  sm: string;
  md: string;
  lg: string;
  full: string;
};

export type Language = keyof LanguageVariation;

export type Size = keyof ComponentSize;

export type Combine<T, K> = T & Omit<K, keyof T>;

declare global {
  // Kakao 함수를 전역에서 사용할 수 있도록 선언
  interface Window {
    Kakao: any;
  }
}
