# Cataso / カタソ

> **Important notice / 重要なお知らせ**
>
> Cataso is an unofficial, fan-operated web game project inspired by the joy of playing CATAN-style negotiation and resource-trading games with friends.
>
> This project is **not affiliated with, endorsed by, sponsored by, or officially connected to CATAN GmbH, CATAN Studio, Asmodee, or any official CATAN publisher or licensee**.
>
> CATAN and related names, game concepts, rules expressions, artwork, trademarks, and other intellectual property belong to their respective rights holders, including CATAN GmbH and CATAN Studio. We respect the original design of Klaus Teuber and the long work of the official CATAN rights holders and publishers.
>
> If CATAN GmbH, CATAN Studio, Asmodee, an authorized publisher/licensee, or another legitimate rights holder contacts us and requests removal, suspension, renaming, or other corrective action regarding this repository or related services, we will respond promptly and in good faith.

## 源流への謝辞

このリポジトリは、既存の公開リポジトリから派生したフロントエンドとバックエンドを、今後の保守・開発のために統合するものです。

確認できる範囲では、源流として特に以下の公開リポジトリと作者・保守者の存在に深く感謝します。

- `tkmax/tkmonline` - TkmOnline frontend origin
- `tkmax/tkmninja` - tkm-ninja backend origin
- `omatztw/tkmonline` - later public fork / derived frontend line
- `omatztw/tkmninja` - later public fork / derived backend line

TkmOnline / tkm-ninja を公開し、遊び場とコードの土台を残してくれた方々に敬意を表します。Cataso はその上に立つ派生プロジェクトであり、源流の仕事を自分たちのものとして隠す意図はありません。

## CATAN rights notice / CATAN権利者への敬意

CATAN is a creation and design of Klaus Teuber and is associated with CATAN GmbH, CATAN Studio, and their authorized publishers and licensees.

Cataso is not intended to imply official approval, license, partnership, or endorsement. It is a small fan-operated service and development repository. We aim to avoid official logos, official artwork, official rule text reproductions, and misleading branding.

If any part of this project is considered inappropriate by the legitimate rights holders, please contact us. We will promptly review and, where appropriate, remove or modify the repository, website, service, naming, assets, or related materials.

Contact: mit@dokasen.com

## Repository structure

This monorepo is intended to integrate the previous two-repository setup:

```text
cataso/
  frontend/   # static web frontend, derived from tkmonline
  backend/    # Node.js WebSocket backend, derived from tkmninja
  docs/       # attribution, protocol, deployment, and rights notices
```

## Current status

This repository is being prepared as the future unified home for Cataso development. The original repositories are preserved as historical and upstream references.

## Development policy

- Keep attribution to upstream/public source repositories visible.
- Keep the project clearly unofficial.
- Avoid official CATAN artwork, logos, and copied rule text.
- Keep compatibility notes for frontend/backend protocol changes.
- Respond promptly and respectfully to legitimate rights-holder requests.
