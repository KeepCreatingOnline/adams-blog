---
title: How to Set Up i2pMail for Use with Thunderbird and K9mail | A Secure and Free Email
description: In this blog post, I walk you through setting up i2pMail on Thunderbird and K9mail. I also discuss the advantages of i2pMail and why its really secure when you're emailing other @mail.i2p addresses.
categoryId: 'security'
authorId: 'adam'
published: '2023-08-25'
---

![](https://raw.githubusercontent.com/KeepCreatingOnline/adams-blog/main/audio/i2pmail-setup/i2pmail.png)

[Audio Version Coming Soon]()

# How to Set Up i2pMail for Use with Thunderbird and K9mail: A Secure and Free Email

## Introduction

Welcome to this comprehensive guide on setting up i2pMail for secure and anonymous email communication. Before we dive into the how-to, let's talk a bit about what I2P is and why it's a significant piece of technology you might want to consider using.

### What is I2P?

I2P, short for the Invisible Internet Project, is an anonymous network layer that allows secure and private data transmission over the internet. It operates on a peer-to-peer model, meaning that your data travels through multiple nodes to reach its destination, making it difficult for eavesdroppers to trace your activities.

### How Does I2P Compare to Tor and VPNs?

While Tor and VPNs are often used for anonymous browsing, I2P specializes in enabling various network services like email, file sharing, and even hosting websites anonymously. Tor focuses on anonymizing outward traffic to the regular web, but I2P is designed for peer-to-peer communications within its network. VPNs, on the other hand, route your traffic through a single server, which may or may not keep logs, providing less anonymity compared to I2P or Tor.

### Why is I2P Important?

In an era where personal privacy is becoming increasingly scarce, I2P provides a layer of security and anonymity that is hard to come by. It allows you to communicate, share, and browse without revealing your identity, making it a valuable tool for whistleblowers, activists, journalists, or anyone concerned about their digital privacy.

### Why Use i2pMail?

i2pMail takes advantage of I2P's architecture to provide secure and anonymous email services. However, it's crucial to know that it's most secure when communicating with another `@mail.i2p` address. For emails outside the I2P network, we'll discuss how to bolster security using PGP encryption.

---

With that context, let's dive into setting up your i2pMail account for Thunderbird and K9mail, so you can start enjoying the benefits of truly private and secure email communication.

---



## Requirements

1. A computer with Internet access
2. Thunderbird email client installed (for desktop users)
3. K9mail email client installed (for Android users)
4. i2p software

## Steps

### Step 1: Install i2p on Your System

Download the i2p installer suitable for your operating system from the [official i2p website](https://geti2p.net/en/download). Follow the on-screen installation instructions.

### Step 2: Start i2p Service

After completing the installation, start the i2p service. The method for doing so will depend on your specific operating system.

### Step 3: Create a New i2pMail Address

1. Open your web browser and go to `http://127.0.0.1:7657/susimail/`.
2. Follow the on-screen instructions to create your new i2pMail address.

### Step 4: Configure Email Clients

#### Thunderbird (Desktop)

1. Open Thunderbird and navigate to `Account Settings` by clicking on the hamburger menu (☰) and selecting `Options > Account Settings`.
2. Click `Add Mail Account`.
3. Enter:
   - **Email**: `mycoolname@mail.i2p`
   - **Username**: `mycoolname`
   - **Password**: `yoursecretpassword`
4. Click `Continue`, and then `Manual config`.
5. For `Incoming`, set:
   - **Server Hostname**: `127.0.0.1`
   - **Port**: `7660`
   - **SSL**: `None`
   - **Authentication**: `Password, transmitted insecurely`
6. For `Outgoing`, set:
   - **Server Hostname**: `127.0.0.1`
   - **Port**: `7659`
   - **SSL**: `None`
   - **Authentication**: `Password, transmitted insecurely`
7. Click `Done`.

#### K9mail (Android)

1. Open K9mail and tap `Add account`.
2. Input your email `mycoolname@mail.i2p` and password `yoursecretpassword`.
3. Tap `Next`.
4. Select `POP3` for account type.
5. Under `Incoming server`, set:
   - **Server**: `127.0.0.1`
   - **Port**: `7660`
   - **Security**: `None`
   - **Username**: `mycoolname`
   - **Password**: `yoursecretpassword`
6. For `Outgoing server`, set:
   - **SMTP Server**: `127.0.0.1`
   - **Port**: `7659`
   - **Security**: `None`
   - **Require Sign-in**: Check
   - **Authentication Type**: `Normal password`
7. Tap `Next` and complete the remaining setup steps.

## Important Security Considerations

It's important to remember that i2pMail is secure only when communicating with another `@mail.i2p` address. For emailing non-I2P domains, your messages will be just as insecure as they would be with any regular email service.

### Enhancing Security with PGP Encryption

One way to secure your emails further is to use Pretty Good Privacy (PGP) encryption. PGP allows you to encrypt the content of your emails, making it extremely difficult for anyone other than the intended recipient to read them. Both Thunderbird and K9mail support PGP, so consider using it for an additional layer of security.



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
