---
title: How to Edit the Sources List in Debian
description: Proxmox Tricks
categoryId: 'proxmox'
authorId: 'adam'
published: '2023-09-30'
---

In Debian, the list of repositories from which you can install software is specified in the file `/etc/apt/sources.list` and in additional `.list` files in the directory `/etc/apt/sources.list.d/`. If your system is asking for a CD-ROM source, it's likely because there's a line in your `sources.list` file or in a file in `sources.list.d` that specifies a CD-ROM source.

Here's how you can remove the CD-ROM source:

1. **Backup the current sources.list file**:
   Before editing the `sources.list` file, it's a good idea to make a backup of it in case something goes wrong.
   
   ```
   sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup
   ```

2. **Edit the sources.list file**:
   Open the `sources.list` file in a text editor with root privileges, such as `nano` or `vi`.
   
   ```
   sudo nano /etc/apt/sources.list
   ```

3. **Comment or remove the CD-ROM line**:
   Look for a line that starts with `deb cdrom:`. Comment it out by placing a `#` at the beginning of the line, or remove the line entirely.
   
   ```
   # deb cdrom:[Debian GNU/Linux ...]
   ```

4. **Save and close the file**:
   If you used `nano`, you can save changes by pressing `Ctrl + O`, then press `Enter`, and exit by pressing `Ctrl + X`.

5. **Update the package database**:
   Finally, update the package database to reflect the changes to the `sources.list` file.
   
   ```
   sudo apt-get update
   ```

This should stop your system from asking for the CD-ROM when installing software or updating the package database.

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
