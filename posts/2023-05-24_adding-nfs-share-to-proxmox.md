---
title: Step-by-Step Guide | Adding an NFS Share from Synology NAS to Proxmox 
description: Dive into our comprehensive guide where we explore how to effectively configure and add an NFS Share from a Synology NAS to your Proxmox virtualization platform. Whether you're new to Proxmox or looking to expand your storage options, we'll walk you through each step with clear instructions and crucial considerations, ensuring your setup process is smooth and successful.
categoryId: 'coding'
authorId: 'adam'
published: '2023-05-24'
---

![](https://www.linuxboxen.dk/wp-content/uploads/2020/01/nfs-logo.jpg)

In the world of virtualization, storage plays a crucial role. That's why Proxmox, an open-source virtualization management platform, allows users to add different types of storage like NFS, iSCSI, and more. Today, we'll focus on how you can add an NFS share from a Synology NAS to your Proxmox server.

## Step 1: Log into Proxmox

To begin, make sure you have administrative access to your Proxmox server. You'll need this to add new storage. Connect to your Proxmox web interface to get started.

## Step 2: Navigate to the Storage View

Once you're logged in, look to the left-hand side and click on "Datacenter". Then, in the right-hand side pane, click on "Storage". This is where you can manage and add all your storage resources.

## Step 3: Begin Adding NFS Storage

Now that you're in the Storage view, look for the "Add" button. Click on this, then choose "NFS". This will open up a new window where you can configure the details of your NFS storage.

## Step 4: Configure Your NFS Storage

At this point, you'll be prompted to input a number of details about your NFS storage.

- **ID**: This will be the name of your NFS storage in Proxmox. Try to make it descriptive of the storage you're adding.
- **Server**: Enter the IP address or hostname of your Synology NAS here.
- **Export**: This is the path to your NFS share on the Synology NAS. This should begin with a forward slash (e.g., "/volume1/myshare").
- **Content**: Here, you'll specify what kind of data you're planning to store on this NFS share. You have a few options to choose from, including Disk image, ISO image, VZDump backup file, and Container template.
- **Nodes**: In this field, select which Proxmox nodes should have access to this NFS share.
- **Max Backups**: This indicates the maximum number of backup files per VM. Set to 1 for the last backup only or higher for more backups.
- **Enable**: Make sure this box is checked so your NFS share is ready to use as soon as it's added.

## Step 5: Save Your Changes

After you've filled in all the details, click "Add". This will save your NFS storage configuration and add the storage to Proxmox.

## Step 6: Check Your Work

Your new NFS storage should now appear in the list of available storage on your Proxmox web interface. You can verify everything is working by creating a VM and choosing your new NFS storage as the disk image destination.

Keep in mind, for this to work, your Synology NAS must have NFS services enabled and the appropriate permissions set for the Proxmox server to access it. Happy virtualizing!
