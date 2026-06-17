# Career Diagnosis LP — GA4 分析ガイド

測定ID：`G-R3JPL9E7TM`
公開URL：`https://ren-os.github.io/threads-os/career-diagnosis/`

---

## 確認すべき指標と計算式

| 指標 | GA4での確認方法 | 計算式 |
|---|---|---|
| PV（ページビュー） | レポート → エンゲージメント → ページとスクリーン | — |
| 診断開始数 | イベント → `start_diagnosis` | — |
| 診断開始率 | — | `start_diagnosis 数 ÷ PV × 100` |
| 診断完了数 | イベント → `complete_diagnosis` | — |
| 診断完了率 | — | `complete_diagnosis 数 ÷ start_diagnosis 数 × 100` |
| CTAクリック数 | イベント → `cta_click` | — |
| CTAクリック率 | — | `cta_click 数 ÷ complete_diagnosis 数 × 100` |

---

## GA4 探索レポートの作り方

### ① ファネル分析（PV → 開始 → 完了 → CTA）

1. GA4 →「探索」→「ファネル探索」を新規作成
2. ステップを以下で設定：
   - ステップ1：イベント名 = `page_view`（PV）
   - ステップ2：イベント名 = `start_diagnosis`（診断開始）
   - ステップ3：イベント名 = `complete_diagnosis`（診断完了）
   - ステップ4：イベント名 = `cta_click`（CTAクリック）
3. 期間：週次で確認

### ② 流入元別の診断完了率

1. GA4 →「探索」→「自由形式」を新規作成
2. ディメンション：`utm_source`、`utm_medium`、`utm_campaign`
3. 指標：`イベント数`（`start_diagnosis`、`complete_diagnosis`、`cta_click`）
4. セグメント：流入元ごとに比較

### ③ 診断結果タイプの分布

1. GA4 →「探索」→「自由形式」
2. ディメンション：イベントパラメータ `result_type`
3. 指標：イベント数
4. フィルタ：イベント名 = `complete_diagnosis`

---

## KPI 目標値（初期フェーズ）

| 指標 | 初期目標 | 改善後目標 |
|---|---|---|
| 診断開始率 | 40% | 60% |
| 診断完了率 | 70% | 85% |
| CTAクリック率 | 15% | 25% |
| LINE登録率（完了者中） | 10% | 20% |

---

## UTM流入分析

### Threadsからの流入確認方法

GA4 → レポート → 集客 → トラフィック獲得

以下のパラメータを設定してThreadsリンクを踏んだユーザーを追跡：

```
utm_source=threads
utm_medium=profile
utm_campaign=career_diagnosis
```

フィルタ：`セッションのデフォルトチャンネルグループ` → `Organic Social`
またはディメンション：`セッションのソース` = `threads`

### 投稿別の効果測定

投稿タイプごとにキャンペーン名を変えることで、どの投稿からの流入が最も診断完了につながるかを判別できます。

```
utm_campaign=career_diagnosis_interview    # 面接官シリーズ
utm_campaign=career_diagnosis_jinjika      # 元人事シリーズ
utm_campaign=career_diagnosis_black        # ブラック企業シリーズ
utm_campaign=career_diagnosis_daini        # 第二新卒シリーズ
utm_campaign=career_diagnosis_freeter      # フリーターシリーズ
```

---

## 週次チェックリスト

毎週月曜に以下を確認：

- [ ] 先週のPV数
- [ ] 診断開始率（目標40%以上）
- [ ] 診断完了率（目標70%以上）
- [ ] CTAクリック率（目標15%以上）
- [ ] 流入元の内訳（Threads / Direct / Other）
- [ ] 結果タイプの分布（偏りがないか）
- [ ] 離脱が多い質問がないか（どこで止まっているか）

---

## 改善アクション指針

| 指標が低い場合 | 改善アクション |
|---|---|
| 診断開始率 < 40% | トップ画面のコピー・CTAボタンの改善 |
| 診断完了率 < 70% | 質問数の削減・自動遷移の高速化・UX改善 |
| CTAクリック率 < 15% | 結果画面のCTAコピー・デザイン変更 |
| Threads流入が少ない | 投稿のフックと診断LPとのメッセージの一致を見直す |
