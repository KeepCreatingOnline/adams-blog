---
title: Disable Laptop Lid Action for Proxmox 
description: Disable Laptop Lid Action for Proxmox
categoryId: 'proxmox'
authorId: 'adam'
published: '2023-05-23'
---

![](https://cloud7.news/wp-content/uploads/2020/11/Proxmox-reveals-Proxmox-Backup-Server.jpg)

I run a low power proxmox server using my old ThinkPad X230 laptop. It’s headless so the lid’s always closed.

When I first set it up, closing the lid would send the laptop into standby mode. Here’s what I did to get promox/debian to ignore the laptop lid action.

Edit the **/etc/systemd/logind.conf** file

```
nano /etc/systemd/logind.conf
```

Change the lines below.

```
HandleLidSwitch=ignore
HandleLidSwitchDocked=ignore
```

restart the logind service.

```
systemctl restart systemd-logind.service
```

> *Adam Malin*
> 
> [adammalin.com](https://adammalin.com)
> 
> You can find me on [Twitter](https://twitter.com/thePR0M3TH3AN) or on Nostr at
> 
> `npub15jnttpymeytm80hatjqcvhhqhzrhx6gxp8pq0wn93rhnu8s9h9dsha32lx`
> 
> **value4value**
> Did you find any value from this article? [Click here to send me a tip!](https://adammalin.com/tip)
