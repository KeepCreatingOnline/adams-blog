---
title: Umbrel + Cloudflare Tunnel | Quick & Pretty Easy
description: Quick guide to expose Umbrel apps via Cloudflare Tunnel.
categoryId: 'self-hosted'
authorId: 'adam'
published: '2025-08-27'
---

**Written by Adam — August 27, 2025**

A dead-simple way to expose Umbrel apps via Cloudflare Tunnel **without** reverse-proxy gymnastics.

> ⚠️ **Placeholder warning**: In examples below, replace `app.example.com` with a hostname you actually own. Domains like `yourdomain.com` are real sites on the internet and won’t point to your tunnel.

---

## TL;DR

* Create a Cloudflare Tunnel and add a **Public hostname** per app.
* **Service** should be `http://<APP_CONTAINER>:<INTERNAL_PORT>` (container name + internal port).
* **HTTP Host header** must match the public hostname.
* Don’t use Umbrel’s host ports (e.g., 2283/8182) when routing inside Docker; discover the **internal** port.

---

## 1) Prereqs (one-time)

* Add your domain to Cloudflare (nameservers at Cloudflare).
* On Umbrel, install **Cloudflare Tunnel** and paste your connector token from **Zero Trust → Access → Tunnels**.
* In **Zero Trust → Access → Tunnels**, your tunnel should show **Active** after the connector is running.

---

## 2) Find the container **name** and the **internal port**

You need both to publish an app via the tunnel.

### 2A) Grab the container name

List relevant containers and note the app’s `*_web_1` or `*_server_1` name and the connector:

```
sudo docker ps --format '{{.Names}}\t{{.Image}}' | egrep 'cloudflared|immich|n8n|nextcloud|jellyfin|gitea|qbittorrent|transmission|homarr|searxng'
```

Examples:

* Cloudflare connector → `cloudflared_connector_1`
* n8n → `n8n_server_1`
* Immich → `immich_server_1`
* SearXNG → `searxng_web_1`

### 2B) Discover the app’s **internal** listening port (don’t guess)

Run `ss`/`netstat` inside the app container and look for a `LISTEN` on `0.0.0.0:<PORT>` or `:::<PORT>`:

```
# Replace with your container, e.g., searxng_web_1
APP_CONTAINER=searxng_web_1
sudo docker exec -it "$APP_CONTAINER" sh -lc 'command -v ss >/dev/null && ss -ltnp || netstat -ltnp || true'
```

Common internal ports (for reference only—verify yours!):

| App          | Typical Container       | **Internal Port** |
| ------------ | ----------------------- | ----------------- |
| SearXNG      | `searxng_web_1`         | **8080**          |
| n8n          | `n8n_server_1`          | **5678**          |
| Immich       | `immich_server_1`       | **2283**          |
| Jellyfin     | `jellyfin_server_1`     | **8096**          |
| Gitea        | `gitea_server_1`        | **3000**          |
| Transmission | `transmission_server_1` | **9091**          |

> 💡 **Host vs Internal ports**: Umbrel’s dashboard often exposes apps on **host** ports like `2283`/`8182` through an app-proxy. Those numbers **are not** what other containers see. Cloudflare Tunnel runs as a container and must connect to the **internal** port that the app itself binds to (e.g., `8080`).

### 2C) Sanity-check with a Docker-network curl probe (fast & reliable)

Attach the connector to the app’s network (no output if already attached), then probe the app **by name + internal port**:

```
# 1) App’s network
NET=$(sudo docker inspect "$APP_CONTAINER" --format '{{json .NetworkSettings.Networks}}' | jq -r 'keys[]' | head -n1)

# 2) Put connector on that network
sudo docker network connect "$NET" cloudflared_connector_1 2>/dev/null || true

# 3) Probe (replace 8080 with your discovered internal port)
PORT=8080
sudo docker run --rm --network "$NET" curlimages/curl:8.9.1 -I "http://$APP_CONTAINER:${PORT}/"
# Expect HTTP/1.1 200 OK or a 3xx
```

If that works internally, your Cloudflare mapping will work once the Public hostname uses `http://<APP_CONTAINER>:<INTERNAL_PORT>`.

---

## 3) Create the Public Hostname in Cloudflare

**Zero Trust → Access → Tunnels → \[your tunnel] → Public hostnames → Add a public hostname**

* **Hostname**: `app.example.com`
* **Service**: `http://<APP_CONTAINER>:<INTERNAL_PORT>`
  Example: `http://searxng_web_1:8080` or `http://n8n_server_1:5678`
* **Additional application settings → HTTP → HTTP Host header**: `app.example.com`

Test from anywhere:

```
curl -I https://app.example.com/
# 200/301/302 = good
```

If it fails but the internal probe worked, the Host header is usually the culprit—make sure it matches the public hostname **exactly**.

---

## 4) Special cases (rare but handy)

**n8n with webhooks / OAuth**

```
# Prevents invalid redirect URIs and internal webhook URLs
N8N_HOST=app.example.com
N8N_PROTOCOL=https
WEBHOOK_URL=https://app.example.com/
N8N_PROXY_HOPS=1
```

**Lock UI but keep webhooks public**: Protect `n8n.example.com` with Cloudflare Access; create `webhook.example.com` (no Access) pointing to the same container/port.

**Origin TLS / self-signed**: If the app serves HTTPS internally, either install a Cloudflare **Origin Certificate** in the container or set `noTLSVerify: true` on that hostname (skips origin cert validation).

**Non-HTTP apps (SSH/DB)**: Use a **TCP** route under the same tunnel; HTTP settings (like Host header) don’t apply.

---

## Troubleshooting (quick flow)

1. **Tunnel status**: In Zero Trust, tunnel is **Active**.
2. **Internal probe**: `curl -I http://<APP_CONTAINER>:<INTERNAL_PORT>/` from the app’s Docker network returns **200/3xx**.
3. **Public hostname**:

   * Service uses `http://<APP_CONTAINER>:<INTERNAL_PORT>` (not host port)
   * **HTTP Host header** equals your public hostname
4. **No conflicting rules**: Check Cloudflare **Redirect Rules / Bulk Redirects / Page Rules / Workers** on that hostname.
5. **Placeholder pitfall**: Ensure you’re testing your real domain, not a generic example.

Common errors:

* **502 from Cloudflare**: Tunnel reached your network but not the app → wrong container name/port or connector not on the right network.
* **404 from tunnel**: Hostname mismatch → fix the Public hostname or a catch‑all entry shadowing it.
* **Works on LAN, not via tunnel**: Host header not set to your public hostname.

---

## Example: SearXNG on Umbrel

* Container: `searxng_web_1`
* Internal port (discovered via step 2B): typically **8080**
* Cloudflare Public hostname:

  * **Hostname**: `search.example.com`
  * **Service**: `http://searxng_web_1:8080`
  * **HTTP Host header**: `search.example.com`

That’s it. For most Umbrel apps, mapping `app.example.com → http://<container>:<internal_port>` and setting the Host header is all you need.


> *Adam Malin*
> 
> [adammalin.com](https://adammalin.com)
> 
> You can find me on Nostr at:
> 
> [npub15jnttpymeytm80hatjqcvhhqhzrhx6gxp8pq0wn93rhnu8s9h9dsha32lx](https://primal.net/p/nprofile1qqs2ff44sjduj9anhm74eqvxtmst3pmndyrqnss8hfjc3me7rczmjkchrgxqm)
>
> You can view and write comments on this or any other post by using the [Satcom](https://github.com/jinglescode/web-content-conversation) browser extention.
>
> **value4value**
> Did you find any value from this article? [Click here to send me a tip!](https://nostrtipjar.netlify.app/?n=npub15jnttpymeytm80hatjqcvhhqhzrhx6gxp8pq0wn93rhnu8s9h9dsha32lx)
