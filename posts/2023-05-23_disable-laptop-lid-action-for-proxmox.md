---
title: Disable Laptop Lid Action for Proxmox 
description: Disable Laptop Lid Action for Proxmox
categoryId: 'proxmox'
authorId: 'adam'
published: '2023-05-23'
---

![](https://cloud7.news/wp-content/uploads/2020/11/Proxmox-reveals-Proxmox-Backup-Server.jpg)

#### Background:
- **Server**: Proxmox server running on a ThinkPad X230 laptop.
- **Configuration**: Headless setup, with the laptop lid always closed.

#### Problem:
- Initially, closing the laptop lid sent the laptop into standby mode.

#### Solution:
- Edit the Proxmox/Debian system settings to ignore the laptop lid action.

#### Steps:
1. **Open the Configuration File**:
   - Access the terminal on your Proxmox server.
   - Open the `/etc/systemd/logind.conf` file using the `nano` text editor:
     ```
     nano /etc/systemd/logind.conf
     ```
   - This command opens the `logind.conf` file, where system behavior related to user logins and power management is defined.

2. **Modify the Configuration**:
   - In the `nano` editor, look for the following lines:
     ```
     #HandleLidSwitch=...
     #HandleLidSwitchDocked=...
     ```
   - Remove the `#` at the beginning of each line to uncomment them. 
   - Change the settings as follows to ensure the system ignores the laptop lid action:
     ```
     HandleLidSwitch=ignore
     HandleLidSwitchDocked=ignore
     ```
   - These changes tell the system to ignore the lid switch both in normal and docked modes.

3. **Save and Exit**:
   - After making these changes, save the file in `nano` by pressing `Ctrl + O`, then hit `Enter`.
   - Exit `nano` by pressing `Ctrl + X`.

4. **Restart the `systemd-logind` Service**:
   - Apply the changes by restarting the `systemd-logind` service. Execute the following command in the terminal:
     ```
     systemctl restart systemd-logind.service
     ```
   - This command restarts the login service, applying your configuration changes.

#### Result:
- Your Proxmox server should now ignore any actions related to closing the laptop lid, keeping the server active even when the lid is closed.

#### Note:
- Ensure you have administrative privileges to make these changes.
- It's always good practice to back up important configuration files before making modifications.

Feel free to follow these steps to configure your Proxmox server to ignore the laptop lid action.

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
