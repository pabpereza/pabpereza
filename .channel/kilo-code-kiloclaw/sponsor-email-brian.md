# Draft — Reply to Brian (Kilo Code DevRel) re: KiloClaw sponsorship

**Status:** DRAFT — not sent. Requires Pablo's approval before sending.
**To:** Brian <dev rel @ Kilo Code>
**From:** Pablo (@pabpereza)
**Subject:** Re: KiloClaw sponsorship — interested, a few technical checks first

---

Hey Brian,

Thanks for reaching out, and congrats on the KiloClaw launch. I'm interested in moving forward, but I want to set expectations clearly up front so we don't waste each other's time.

**Scope.** The video would be **exclusively about KiloClaw**. No mixing with Kilo Code or OpenClaw self-hosted beyond a 30-second "what is it" framing. One product, one story.

**Angle I have in mind** (rough, will firm up after the technical demo):

- Use case: automated weekly audit of a k3s homelab cluster.
- KiloClaw runs `kubectl` + `jq` inside its VM against the user's kube-apiserver, reached via Tailscale userspace networking (preferred) or a controlled API exposure (fallback).
- A weekly cron registered in natural language; prioritized report delivered to chat.
- Organic fit for the channel — this is homelab/k8s content my audience already watches, not an ad reel.
- **Non-negotiable:** a ~3-minute honest block on limits, security and blast radius of exposing a kube-apiserver to a shared hosted VM.

**Editorial conditions** (firm):

- Full editorial freedom on the limits/security block. I will say on camera that I wouldn't run this against production today, that it's beta, that the VM is shared, and that exposing the kube-apiserver carries real risk.
- Explicit sponsorship disclosure at the start of the video and in the description.
- I will point viewers to honest alternatives (self-hosted n8n, self-hosted OpenClaw) for anyone with compliance requirements.

If any of that is a dealbreaker, better to know now.

**Before we record, I need a private demo to validate a few things.** Concrete questions:

- Can I download and run binaries (`kubectl`, `jq`) into `/workspace/bin`? Do they persist across redeploys?
- Is the VM egress IP static, within a known range, or does it rotate? Critical for kube-apiserver firewalling.
- Can I run `tailscaled --tun=userspace-networking` without root or TUN?
- Is egress to TCP/6443 and UDP/41641 allowed out of the box?
- Does the `cron` tool persist across VM restarts? Does `/workspace`?
- Typical latency of a `kubectl` round-trip from KiloClaw.
- Is MCP supported as a built-in tool? I didn't see it in the docs.
- Kilo Gateway retention and privacy policy for prompts/outputs passing through — I need to cite this on camera.

**Logistics.**

- Please provision the upgraded account with credits so I can start recording test runs.
- Send the affiliate link whenever the program is live this week.
- I'd like to join the roadmap preview Wednesday if there's a slot, but I don't want to block the video on it.
- What's your ideal publication window on your side?

**Pricing.** I'd rather not anchor a number before the technical demo. Once I've validated the editorial fit and know what's actually recordable, I'll send a proposal — open to combining paid collab + affiliate.

Looking forward to the demo.

Pablo
