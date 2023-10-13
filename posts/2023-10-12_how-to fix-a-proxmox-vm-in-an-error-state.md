---
title: How to Fix A Proxmox VM In An Error State
description: Because sometimes it no go.
categoryId: 'proxmox'
authorId: 'adam'
published: '2023-10-12'
---

It seems like the `ha-manager set vm:104 --state disabled` command was commented out (due to the `#` at the start of the line), so it wasn't executed. Additionally, it seems like the VM process is not running since the `ps -eaf | grep [q]emu-kvm | grep 104` command didn't return any output.

Here are the steps you might want to follow, ensuring each command is executed:

### 1. Disable the VM in HA Manager:

```
ha-manager set vm:104 --state disabled
```

### 2. Confirm the VM is not running:

```
ps -eaf | grep [q]emu-kvm | grep 104
```

You've already done this, and it seems like the VM isn’t running.

### 3. Check and Fix the Error:

Analyze the VM's log for any issues or errors that might have occurred:

```
cat /var/log/pve/qemu-server/104.log
```

Ensure the underlying issue is fixed before trying to start the VM again to prevent it from entering an error state once more.

### 4. Enable and Start the VM:

```
ha-manager set vm:104 --state enabled
qm start 104
```

Now, try to start the VM and verify its state by using:

```
qm list | grep 104
```

### Additional Notes:

- Ensure that there is enough resources (CPU, RAM, Disk space) available on the node to start the VM.
- Make sure the storage where the VM's disk is located is accessible and has enough space.
- Check the Proxmox cluster's state and confirm that the nodes see each other correctly and that the quorum is not lost.
- If the issue persists, it might be worth examining the VM's configuration file for any inconsistencies or issues.
- Ensure your Proxmox and its packages are updated to avoid running into known issues that might have been fixed in newer versions.

Remember to always have a good backup strategy in place to safeguard against data loss, especially when dealing with virtual machine management and troubleshooting.

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
