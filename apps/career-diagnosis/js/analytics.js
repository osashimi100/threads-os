/**
 * analytics.js — GA4イベント計測・UTMパラメータ管理
 *
 * 計測イベント：
 *   page_view         → gtag('config') で自動送信
 *   start_diagnosis   → 診断開始ボタンクリック時
 *   complete_diagnosis → 結果画面表示時（result_type付き）
 *   cta_click         → CTAボタンクリック時（button_location付き）
 *
 * UTM保持：
 *   URLのutm_*パラメータをsessionStorageに保存し、
 *   全イベントに付与することでGA4での流入元分析を可能にする。
 *   例: ?utm_source=threads&utm_medium=profile&utm_campaign=career_diagnosis
 */

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
];

function saveUtmParams() {
  const params = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach(key => {
    const val = params.get(key);
    if (val) sessionStorage.setItem(key, val);
  });
}

function getUtmParams() {
  const result = {};
  UTM_KEYS.forEach(key => {
    const val = sessionStorage.getItem(key);
    if (val) result[key] = val;
  });
  return result;
}

/**
 * GA4カスタムイベントを送信する。
 * UTMパラメータを自動付与するため、直接gtag()を呼ばずこの関数を使う。
 * @param {string} eventName
 * @param {Object} extra - 追加パラメータ
 */
export function trackEvent(eventName, extra = {}) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, {
    ...getUtmParams(),
    ...extra,
  });
}

/**
 * アナリティクス初期化。DOMContentLoaded後に呼ぶ。
 * URLのUTMパラメータをsessionStorageに保存する。
 */
export function initAnalytics() {
  saveUtmParams();
}
