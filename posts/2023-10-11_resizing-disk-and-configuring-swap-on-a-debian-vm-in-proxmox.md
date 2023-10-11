---
title: How to Resizing Disk and Configuring Swap on a Debian VM in Proxmox
description: Because sometimes you just need more space.
categoryId: 'proxmox'
authorId: 'adam'
published: '2023-10-11'
---

#### **Step 1: Increase Disk Size in Proxmox**

1. **Shutdown the VM**: Ensure it's powered off.
2. **Adjust Disk Size**:
   - Navigate to the VM in Proxmox.
   - Go to "Hardware" -> "Hard Disk".
   - Adjust the size and confirm changes.

#### **Step 2: Resize Partition and Filesystem in Debian**

1. **Access the VM**: SSH or use the console. A like to my tutorial can be found [here](https://habitus.blog/how-to-ssh-into-a-debian-server-running-on-proxmox). 

2. **Install Parted Utility**: Use `sudo apt install parted` to install the Parted Utility. 

3. **Parted Utility**: Use `parted` to manage partitions.
   
   ```
   sudo parted
   ```
   
   - **Remove Unnecessary Partitions** (if applicable):
     
     ```
     (parted) rm [partition_number]
     ```
   
   - **Resize the Primary Partition**:
     
     ```
     (parted) resizepart 1 100%
     ```
   
   - Exit `parted` with `quit`.

4. **Resize the Filesystem**:
   
   ```
   sudo resize2fs /dev/sda1
   ```

#### **Step 3: Configure Swap File**

1. **Create a Swap File**:
   
   ```
   sudo dd if=/dev/zero of=/swapfile bs=1G count=2 status=progress
   ```
   
   (Adjust `count` to the desired swap size in GB.)
   
   If there's insufficient space:
   
   - Check space with `df -h`.
   - Investigate usage and adjust accordingly.

2. **Set Permissions and Make Swap**:
   
   ```
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   ```

3. **Persist Swap Across Reboots**:
   
   - Open `/etc/fstab` with a text editor, like `nano`:
     
     ```
     sudo nano /etc/fstab
     ```
   
   - Add the swap entry:
     
     ```
     /swapfile none swap sw 0 0
     ```
   
   - Save and exit.

#### **Step 4: Verification and Finalization**

1. **Verify Disk and Swap**:
   
   - Check disk space: `df -h`.
   - Check memory and swap: `free -m`.

2. **Reboot the VM**:
   
   ```
   sudo reboot
   ```

3. **Verify Again**:
   
   - Ensure the filesystem and swap are as expected after the reboot.

#### **Additional Notes**

- **Backups**: Ensure you backup critical data before performing disk operations.
- **Swap Size**: Adjust based on your specific use and available memory.
- **Docker**: If using Docker, manage resources and volumes to optimize disk usage.

### **Considerations for Future Work**

- **Routine Monitoring**: Regularly check disk usage, especially with applications that dynamically generate data or logs.
- **Docker Management**: Periodically prune unused Docker objects and manage image and container storage efficiently.

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
