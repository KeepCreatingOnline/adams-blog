---
title: Umbrel + Cloudflare Tunnel | Quick & Pretty Easy
description: Quick guide to expose Umbrel apps via Cloudflare Tunnel.
categoryId: 'self-hosted'
authorId: 'adam'
published: '2025-08-27'
---

# Umbrel + Cloudflare Tunnel: Quick & *Pretty Easy*

![](http://hedgedoc.malin.onl/uploads/e250d0d8-0386-4d8c-8ebe-a6f805ba1e31.jpg)

You don’t need complex reverse-proxy gymnastics. For most Umbrel apps, all you need is:

1. point your Cloudflare Tunnel hostname at the **correct container name** on the **right port**, and
2. set the **HTTP Host header** to the public hostname.

That’s it.

---

## 1) Prereqs (one-time)

* Add your domain to **Cloudflare** (nameservers pointing to Cloudflare).
* On Umbrel, install the **Cloudflare Tunnel** app and paste your **connector token** from the Cloudflare Zero Trust dashboard.
* In Cloudflare Zero Trust: **Access → Tunnels → Create** (your tunnel should show **Active** once Umbrel connects).

---

## 2) Find the **container name** *and* **port**

You need two things to publish an app: the container’s **name** and the **port** it listens on.

### A) Easiest: read it from the Umbrel app’s local URL

* Open the app from the Umbrel dashboard.
* Look at the browser’s address bar — many apps include the port (e.g., `http://umbrel.local:2283` → port is **2283**).
* You’ll still target the **container name** (not the host), but the **port number** is the same.

### B) Reliable (works for every app): ask Docker for the container name and port

```
# List relevant containers (note the app and cloudflared names)
sudo docker ps --format '{{.Names}}\t{{.Image}}' | egrep 'cloudflared|immich|n8n|nextcloud|jellyfin|gitea|qbittorrent|transmission'
```

Pick the “server” container for your app (examples):

* Cloudflare connector → `cloudflared_connector_1`
* n8n → `n8n_server_1`
* Immich → `immich_server_1`

Now discover the app’s **listening ports** (inside the container):

```
# Replace APP_CONTAINER with your app's container, e.g., n8n_server_1
APP_CONTAINER=n8n_server_1
sudo docker exec -it "$APP_CONTAINER" sh -lc 'command -v ss >/dev/null && ss -ltnp || netstat -ltnp || true'
```

Look for a `LISTEN` entry on `0.0.0.0:<PORT>` or `:::<PORT>` that matches the web server (that’s your port).
Common examples (for reference only): n8n **5678**, Immich **2283**, Jellyfin **8096**, Gitea **3000**, Transmission **9091**.

### C) Double-check with a curl probe (optional but fast)

```
# Identify the app's network
NET=$(sudo docker inspect "$APP_CONTAINER" --format '{{json .NetworkSettings.Networks}}' | jq -r 'keys[]' | head -n1)

# Put the Cloudflare connector on that network (no output if already attached)
sudo docker network connect "$NET" cloudflared_connector_1 2>/dev/null || true

# Test the port you think is correct (replace 5678 with yours)
sudo docker run --rm --network "$NET" curlimages/curl:8.9.1 -I "http://$APP_CONTAINER:5678/"
# Expect HTTP/1.1 200 or a 3xx
```

---

## 3) Create the **Public Hostname** in Cloudflare

Cloudflare Zero Trust → **Access → Tunnels → <your tunnel> → Public hostnames → Add a public hostname**:

* **Hostname:**
  `app.yourdomain.com`

* **Service:**
  `http://<APP_CONTAINER>:<PORT>`
  *(Example: `http://n8n_server_1:5678` or `http://immich_server_1:2283`)*

* **Additional application settings → HTTP → HTTP Host header:**
  `app.yourdomain.com`

Save, then test:

```
curl -I https://app.yourdomain.com/
```

If you see `200`, `301`, or `302`, you’re done.

---

## 4) That’s all most Umbrel apps need

* Use **container names**, not IPs (IPs change).
* Set **HTTP Host header** to match the public hostname.
* Route each app with its own **Public hostname** entry.

---

## When you might need more than this (rare but useful)

* **n8n with webhooks / OAuth:**

  ```
  N8N_HOST=app.yourdomain.com
  N8N_PROTOCOL=https
  WEBHOOK_URL=https://app.yourdomain.com/
  N8N_PROXY_HOPS=1
  ```

  (Prevents “invalid redirect URI” and internal webhook URLs.)

* **Lock down UI but keep webhooks public:**
  Protect `n8n.yourdomain.com` with Cloudflare **Access**, use `webhook.yourdomain.com` for public webhooks (both point to the same container/port).

* **Origin TLS / self-signed:**
  If your app serves HTTPS internally, either install a Cloudflare **Origin Cert** or set `noTLSVerify: true` on that hostname.

* **Non-HTTP apps (SSH, DBs):**
  Use a **TCP** tunnel/route, not HTTP.

---

## Quick troubleshooting

* **502 from Cloudflare:** tunnel reached your network but not the app → recheck container name/port; run the curl probe on the Docker network.
* **404 from tunnel:** hostname not matched → fix the Public hostname entry (ensure the catch-all isn’t shadowing).
* **Works on LAN, not via tunnel:** set **HTTP Host header** to your public hostname.

---

**TL;DR:** Find the **container name** and **port** (from the Umbrel URL or Docker), then in Cloudflare map `app.yourdomain.com → http://<container>:<port>` and set **HTTP Host header** to `app.yourdomain.com`. For most Umbrel apps, that’s all you need.


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
