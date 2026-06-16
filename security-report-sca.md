# SCA Report — /home/pabpereza/pabpereza

_Generated: 2026-05-25 10:52:34 UTC_

## Summary

| Severity | Count |
|---|---|
| High | 8 |
| Medium | 2 |
| Low | 43 |
| Info | 5 |

- Dependencies analysed: **1374**
- Vulnerable findings: **4**
- KEV-listed: **0**
- Supply-chain findings: **26**
- Hygiene findings: **26**
- License findings: **2**
- Advisory cache: **3949 hits / 0 misses (100%)** · 1446 memo evictions

## Vulnerable dependencies

### High — uuid 8.3.2 → fix: 11.1.1
- Advisory: **GHSA-w5hq-g745-h8pq** (aliases: CVE-2026-41907)
- Summary: uuid: Missing buffer bounds check in v3/v5/v6 when buf is provided
- CVSS 7.5
- Source: lockfile (`/home/pabpereza/pabpereza/yarn.lock`)
- Direct: no; scope: main; pin: exact
- Reachability: not_reachable (confidence medium — no import/require for 'uuid' found)
- Version match: high — yarn.lock resolved entry
- Parser: high — yarn.lock resolved entry
- References: <https://github.com/uuidjs/uuid/security/advisories/GHSA-w5hq-g745-h8pq>, <https://nvd.nist.gov/vuln/detail/CVE-2026-41907>

<details><summary>Advisory detail</summary>

### Summary\x0a\x0aThe `v3()`, `v5()`, and `v6()` [API methods](https://github.com/uuidjs/uuid#api-summary) (not `uuid` release versions) accept external output buffers but do not reject out-of-range writes (small `buf` or large `offset`).  \x0aBy contrast, `v4()`, `v1()`, and `v7()` API methods explicitly throw `RangeError` on invalid bounds.\x0a\x0aThis inconsistency allows **silent partial writes** into caller-provided buffers.\x0a\x0a\x0a### Affected code\x0a\x0a- `src/v35.ts` (`v3()`/`v5()` path) writes `buf[offset + i]` without bounds validation.\x0a- `src/v6.ts` writes `buf[offset + i]` without bounds validation.\x0a\x0a###… (truncated; see findings.json `sca:vuln:npm:uuid:8.3.2:GHSA-w5hq-g745-h8pq`)

</details>

### High — serialize-javascript 6.0.2 → fix: 7.0.3
- Advisory: **GHSA-5c6j-r48x-rmvq** (aliases: —)
- Summary: Serialize JavaScript is Vulnerable to RCE via RegExp.flags and Date.prototype.toISOString()
- CVSS 8.1
- Source: lockfile (`/home/pabpereza/pabpereza/yarn.lock`)
- Direct: no; scope: main; pin: exact
- Reachability: not_reachable (confidence medium — no import/require for 'serialize-javascript' found)
- Version match: high — yarn.lock resolved entry
- Parser: high — yarn.lock resolved entry
- References: <https://github.com/yahoo/serialize-javascript/security/advisories/GHSA-5c6j-r48x-rmvq>, <https://github.com/advisories/GHSA-hxcc-f52p-wc94>

<details><summary>Advisory detail</summary>

### Impact\x0a\x0aThe serialize-javascript npm package (versions <= 7.0.2) contains a code injection vulnerability. It is an incomplete fix for CVE-2020-7660.\x0a\x0aWhile `RegExp.source` is sanitized, `RegExp.flags` is interpolated directly into the generated output without escaping. A similar issue exists in `Date.prototype.toISOString()`.\x0a\x0aIf an attacker can control the input object passed to `serialize()`, they can inject malicious JavaScript via the flags property of a RegExp object. When the serialized string is later evaluated (via `eval`, `new Function`, or `<script>` tags), the injected code exec… (truncated; see findings.json `sca:vuln:npm:serialize-javascript:6.0.2:GHSA-5c6j-r48x-rmvq`)

</details>

### Medium — qs 6.15.1 → fix: 6.15.2
- Advisory: **GHSA-q8mj-m7cp-5q26** (aliases: CVE-2026-8723)
- Summary: qs has a remotely triggerable DoS: qs.stringify crashes with TypeError on null/undefined entries in comma-format arrays when encodeValuesOnly is set
- CVSS 5.3
- Source: lockfile (`/home/pabpereza/pabpereza/yarn.lock`)
- Direct: no; scope: main; pin: exact
- Reachability: not_reachable (confidence medium — no import/require for 'qs' found)
- Version match: high — yarn.lock resolved entry
- Parser: high — yarn.lock resolved entry
- References: <https://github.com/ljharb/qs/security/advisories/GHSA-q8mj-m7cp-5q26>, <https://nvd.nist.gov/vuln/detail/CVE-2026-8723>

<details><summary>Advisory detail</summary>

### Summary\x0a\x0a`qs.stringify` throws `TypeError` when called with `arrayFormat: 'comma'` and `encodeValuesOnly: true` on an array containing `null` or `undefined`. The throw is synchronous and not handled by any of qs's null-related options (`skipNulls`, `strictNullHandling`).\x0a\x0a### Details\x0a\x0aIn the comma + `encodeValuesOnly` branch, `lib/stringify.js:145` mapped the array through the raw encoder before joining:\x0a\x0a```js\x0aobj = utils.maybeMap(obj, encoder);\x0a```\x0a\x0a`utils.encode` (`lib/utils.js:195`) reads `str.length` with no null guard, so a `null` or `undefined` element throws `TypeError`. `skipNulls… (truncated; see findings.json `sca:vuln:npm:qs:6.15.1:GHSA-q8mj-m7cp-5q26`)

</details>

### Medium — serialize-javascript 6.0.2 → fix: 7.0.5
- Advisory: **GHSA-qj8w-gfj5-8c6v** (aliases: CVE-2026-34043)
- Summary: Serialize JavaScript has CPU Exhaustion Denial of Service via crafted array-like objects
- CVSS 5.9
- References: <https://github.com/yahoo/serialize-javascript/security/advisories/GHSA-qj8w-gfj5-8c6v>, <https://nvd.nist.gov/vuln/detail/CVE-2026-34043>

<details><summary>Advisory detail</summary>

### Impact\x0a\x0a**What kind of vulnerability is it?**\x0a\x0aIt is a **Denial of Service (DoS)** vulnerability caused by CPU exhaustion. When serializing a specially crafted "array-like" object (an object that inherits from `Array.prototype` but has a very large `length` property), the process enters an intensive loop that consumes 100% CPU and hangs indefinitely.\x0a\x0a**Who is impacted?**\x0a\x0aApplications that use `serialize-javascript` to serialize untrusted or user-controlled objects are at risk. While direct exploitation is difficult, it becomes a high-priority threat if the application is also vulnerable… (truncated; see findings.json `sca:vuln:npm:serialize-javascript:6.0.2:GHSA-qj8w-gfj5-8c6v`)

</details>

## Supply-chain findings

### High — typosquat_candidate: npm:@docusaurus/core
- Detail: name '@docusaurus/core' is distance 1 from popular package 'cors' — verify the spelling
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: medium (distance-1 from popular 'cors'; may be a legitimate package or a typosquat)

### High — typosquat_candidate: npm:@docusaurus/core
- Detail: name '@docusaurus/core' is distance 1 from popular package 'cors' — verify the spelling
- Source: `/home/pabpereza/pabpereza/yarn.lock`
- Confidence: medium (distance-1 from popular 'cors'; may be a legitimate package or a typosquat)

### High — typosquat_candidate: npm:@mdx-js/react
- Detail: name '@mdx-js/react' is distance 0 from popular package 'react' — verify the spelling
- Sources (2):
  - `/home/pabpereza/pabpereza/package.json`
  - `/home/pabpereza/pabpereza/yarn.lock`
- Confidence: high (bare form matches popular 'react'; scoped-name namespace squat shape)

### High — typosquat_candidate: npm:d3
- Detail: name 'd3' is distance 1 from popular package 'zod' — verify the spelling
- Sources (2):
  - `/home/pabpereza/pabpereza/package.json`
  - `/home/pabpereza/pabpereza/yarn.lock`
- Confidence: medium (distance-1 from popular 'zod'; may be a legitimate package or a typosquat)

### Low — gha_action_outdated: GitHub Actions:actions/checkout
- Detail: GHA action `actions/checkout@v4` is 2 major versions behind the latest release `v6.0.2` (major 6). Upgrade for security fixes and to avoid the next sunset window.
- Sources (3):
  - `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
  - `/home/pabpereza/pabpereza/.github/workflows/readme.yaml`
  - `/home/pabpereza/pabpereza/.github/workflows/test-deploy.yaml`
- Confidence: high (compared pinned major 4 against latest release v6.0.2)

### Low — gha_action_outdated: GitHub Actions:actions/setup-node
- Detail: GHA action `actions/setup-node@v4` is 2 major versions behind the latest release `v6.4.0` (major 6). Upgrade for security fixes and to avoid the next sunset window.
- Sources (2):
  - `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
  - `/home/pabpereza/pabpereza/.github/workflows/test-deploy.yaml`
- Confidence: high (compared pinned major 4 against latest release v6.4.0)

### Low — gha_action_outdated: GitHub Actions:actions/upload-pages-artifact
- Detail: GHA action `actions/upload-pages-artifact@v3` is 2 major versions behind the latest release `v5.0.0` (major 5). Upgrade for security fixes and to avoid the next sunset window.
- Source: `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
- Confidence: high (compared pinned major 3 against latest release v5.0.0)

### Low — gha_action_outdated: GitHub Actions:crazy-max/ghaction-github-pages
- Detail: GHA action `crazy-max/ghaction-github-pages@v3.1.0` is 2 major versions behind the latest release `v5.0.0` (major 5). Upgrade for security fixes and to avoid the next sunset window.
- Source: `/home/pabpereza/pabpereza/.github/workflows/readme.yaml`
- Confidence: high (compared pinned major 3 against latest release v5.0.0)

### Low — gha_action_ref_drift: Inline:<github-actions>
- Detail: .github/workflows/deploy.yaml:16` uses `actions/checkout@v4` — tag ref — the action's owner can re-publish the same tag pointing at different code; pin to a 40-char commit SHA for supply-chain integrity
- Source: `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
- Confidence: high (action ref is a tag, not a commit SHA)

### Low — gha_action_ref_drift: Inline:<github-actions>
- Detail: .github/workflows/deploy.yaml:21` uses `actions/setup-node@v4` — tag ref — the action's owner can re-publish the same tag pointing at different code; pin to a 40-char commit SHA for supply-chain integrity
- Source: `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
- Confidence: high (action ref is a tag, not a commit SHA)

### Low — gha_action_ref_drift: Inline:<github-actions>
- Detail: .github/workflows/deploy.yaml:32` uses `actions/upload-pages-artifact@v3` — tag ref — the action's owner can re-publish the same tag pointing at different code; pin to a 40-char commit SHA for supply-chain integrity
- Source: `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
- Confidence: high (action ref is a tag, not a commit SHA)

### Low — gha_action_ref_drift: Inline:<github-actions>
- Detail: .github/workflows/deploy.yaml:54` uses `actions/deploy-pages@v4` — tag ref — the action's owner can re-publish the same tag pointing at different code; pin to a 40-char commit SHA for supply-chain integrity
- Source: `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
- Confidence: high (action ref is a tag, not a commit SHA)

### Low — gha_action_ref_drift: Inline:<github-actions>
- Detail: .github/workflows/readme.yaml:19` uses `actions/checkout@v4` — tag ref — the action's owner can re-publish the same tag pointing at different code; pin to a 40-char commit SHA for supply-chain integrity
- Source: `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
- Confidence: high (action ref is a tag, not a commit SHA)

### Low — gha_action_ref_drift: Inline:<github-actions>
- Detail: .github/workflows/readme.yaml:22` uses `actions/setup-python@v5` — tag ref — the action's owner can re-publish the same tag pointing at different code; pin to a 40-char commit SHA for supply-chain integrity
- Source: `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
- Confidence: high (action ref is a tag, not a commit SHA)

### Low — gha_action_ref_drift: Inline:<github-actions>
- Detail: .github/workflows/readme.yaml:52` uses `Platane/snk/svg-only@v3` — tag ref — the action's owner can re-publish the same tag pointing at different code; pin to a 40-char commit SHA for supply-chain integrity
- Source: `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
- Confidence: high (action ref is a tag, not a commit SHA)

### Low — gha_action_ref_drift: Inline:<github-actions>
- Detail: .github/workflows/readme.yaml:59` uses `crazy-max/ghaction-github-pages@v3.1.0` — tag ref — the action's owner can re-publish the same tag pointing at different code; pin to a 40-char commit SHA for supply-chain integrity
- Source: `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
- Confidence: high (action ref is a tag, not a commit SHA)

### Low — gha_action_ref_drift: Inline:<github-actions>
- Detail: .github/workflows/test-deploy.yaml:18` uses `actions/checkout@v4` — tag ref — the action's owner can re-publish the same tag pointing at different code; pin to a 40-char commit SHA for supply-chain integrity
- Source: `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
- Confidence: high (action ref is a tag, not a commit SHA)

### Low — gha_action_ref_drift: Inline:<github-actions>
- Detail: .github/workflows/test-deploy.yaml:21` uses `actions/setup-node@v4` — tag ref — the action's owner can re-publish the same tag pointing at different code; pin to a 40-char commit SHA for supply-chain integrity
- Source: `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
- Confidence: high (action ref is a tag, not a commit SHA)

### Info — gha_action_outdated: GitHub Actions:actions/deploy-pages
- Detail: GHA action `actions/deploy-pages@v4` is 1 major version behind the latest release `v5.0.0` (major 5). Upgrade for security fixes and to avoid the next sunset window.
- Source: `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
- Confidence: high (compared pinned major 4 against latest release v5.0.0)

### Info — gha_action_outdated: GitHub Actions:actions/setup-python
- Detail: GHA action `actions/setup-python@v5` is 1 major version behind the latest release `v6.2.0` (major 6). Upgrade for security fixes and to avoid the next sunset window.
- Source: `/home/pabpereza/pabpereza/.github/workflows/readme.yaml`
- Confidence: high (compared pinned major 5 against latest release v6.2.0)

### Info — workflow_unsigned_commit: GitHub Actions:<workflow-history>
- Detail: 4 of the last 4 commits touching .github/workflows/** are unsigned (signing rate 0.0%). Below the anomaly-detection threshold — individual unsigned commits aren't flagged in this regime. Enabling 'Require signed commits' branch protection on ``main`` raises the signing rate to 100% and turns future unsigned pushes into hard blocks rather than hygiene warnings.
- Source: `/home/pabpereza/pabpereza/.github`
- Confidence: high (git log signing-rate aggregate)

## License findings

### Unknown — npm:khroma@2.1.0
- License: `(none)`
- Severity: **info**
- Detail: No license metadata for npm:khroma@2.1.0 — registry returned no SPDX field
- Source: `/home/pabpereza/pabpereza/yarn.lock`

### Unknown — npm:require-like@0.1.2
- License: `(none)`
- Severity: **info**
- Detail: No license metadata for npm:require-like@0.1.2 — registry returned no SPDX field
- Source: `/home/pabpereza/pabpereza/yarn.lock`

## Hygiene findings

### Low — loose_pin: npm:@docusaurus/core
- Detail: @docusaurus/core uses loose pinning (caret 3.9.2); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: npm:@docusaurus/module-type-aliases
- Detail: @docusaurus/module-type-aliases uses loose pinning (caret 3.9.2); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: npm:@docusaurus/preset-classic
- Detail: @docusaurus/preset-classic uses loose pinning (caret 3.9.2); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: npm:@docusaurus/theme-mermaid
- Detail: @docusaurus/theme-mermaid uses loose pinning (caret 3.9.2); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: npm:@docusaurus/types
- Detail: @docusaurus/types uses loose pinning (caret 3.9.2); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: npm:@mdx-js/react
- Detail: @mdx-js/react uses loose pinning (caret 3.1.1); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: GitHub Actions:Platane/snk/svg-only
- Detail: Platane/snk/svg-only uses loose pinning (caret v3); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/.github/workflows/readme.yaml`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: GitHub Actions:actions/checkout
- Detail: actions/checkout uses loose pinning (caret v4); range may admit new vulns silently
- Sources (3):
  - `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
  - `/home/pabpereza/pabpereza/.github/workflows/readme.yaml`
  - `/home/pabpereza/pabpereza/.github/workflows/test-deploy.yaml`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: GitHub Actions:actions/deploy-pages
- Detail: actions/deploy-pages uses loose pinning (caret v4); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: GitHub Actions:actions/setup-node
- Detail: actions/setup-node uses loose pinning (caret v4); range may admit new vulns silently
- Sources (2):
  - `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
  - `/home/pabpereza/pabpereza/.github/workflows/test-deploy.yaml`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: GitHub Actions:actions/setup-python
- Detail: actions/setup-python uses loose pinning (caret v5); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/.github/workflows/readme.yaml`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: GitHub Actions:actions/upload-pages-artifact
- Detail: actions/upload-pages-artifact uses loose pinning (caret v3); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/.github/workflows/deploy.yaml`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: npm:clsx
- Detail: clsx uses loose pinning (caret 2.1.1); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: GitHub Actions:crazy-max/ghaction-github-pages
- Detail: crazy-max/ghaction-github-pages uses loose pinning (caret v3.1.0); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/.github/workflows/readme.yaml`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: npm:d3
- Detail: d3 uses loose pinning (caret 7.9.0); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: npm:docusaurus-lunr-search
- Detail: docusaurus-lunr-search uses loose pinning (caret 3.6.1); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: npm:dotenv
- Detail: dotenv uses loose pinning (caret 17.3.1); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: npm:gray-matter
- Detail: gray-matter uses loose pinning (caret 4.0.3); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: npm:prism-react-renderer
- Detail: prism-react-renderer uses loose pinning (caret 2.4.1); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: npm:react
- Detail: react uses loose pinning (caret 19.2.4); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: npm:react-dom
- Detail: react-dom uses loose pinning (caret 19.2.4); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: npm:react-force-graph-2d
- Detail: react-force-graph-2d uses loose pinning (caret 1.29.1); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)

### Low — loose_pin: npm:react-github-btn
- Detail: react-github-btn uses loose pinning (caret 1.4.0); range may admit new vulns silently
- Source: `/home/pabpereza/pabpereza/package.json`
- Confidence: high (parser observed caret/tilde/range pinning)
