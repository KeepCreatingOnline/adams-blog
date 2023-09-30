---
title: How to SSH Into a Debian Server Running on Proxmox
description: Proxmox Tricks
categoryId: 'coding'
authorId: 'adam'
published: '2023-09-30'
---

Connecting to a local network server via SSH on a Debian system is a straightforward process. Here's how you can do it:

### 1. **Install SSH Client (if not installed):**

   First, ensure that you have the SSH client installed on your Debian machine. If it's not installed, you can install it using the following command:

```
sudo apt-get install openssh-client
```

### 2. **Find the Server's IP Address:**

   Next, you need to find out the IP address of the server you want to connect to. If you have access to the server, you can usually find the IP address by running the following command on the server:

```
ip addr show
```

   Look for an "inet" line that corresponds to your local network, it should look something like "inet 192.168.x.x".

### 3. **Connect to the Server:**

   Now, use the `ssh` command followed by the username on the server and the server's IP address to connect:

```
ssh username@server_ip_address
```

   For example, if the username on the server is "john" and the server's IP address is "192.168.1.100", you would run:

```
ssh john@192.168.1.100
```

   When you connect for the first time, you'll be asked to confirm the server's identity by accepting its public key. Type "yes" and press enter. Then, you'll be prompted for the user's password on the server.

### 4. **(Optional) Set Up SSH Key Authentication:**

   For added security and convenience, you can set up SSH key authentication so you don't have to enter a password each time you connect. Here's how:

- On your client machine, generate an SSH key pair by running:

```
ssh-keygen
```

- Next, copy the public key to your server with the following command:

```
ssh-copy-id username@server_ip_address
```

- Now you should be able to SSH into your server without being prompted for a password.

Now, you should be connected to your local network server via SSH on your Debian system.



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
