---
title: Setting Up and Managing a Minetest Mineclone2 Server on Debian-based Systems
description: Because Minetest is awesome!
categoryId: 'gaming'
authorId: 'adam'
published: '2023-09-30'
---

# Setting Up and Managing a Minetest Mineclone2 Server on Debian-based Systems

In this comprehensive tutorial, we will walk you through the process of setting up a Minetest server with Mineclone2 on a Debian-based system. Minetest is an open-source voxel game engine and game, which is highly modifiable, allowing you to create your own games and experiences. One such modification is Mineclone2, which aims to offer gameplay very similar to Minecraft. We'll cover the installation, configuration, and management of both Minetest and Mineclone2, ensuring you have a robust setup for hosting your voxel game world. Additionally, we'll delve into essential maintenance tasks such as backing up your game world and updating your server software to ensure a smooth, enjoyable gaming experience for you and your players. Whether you're new to server management or an experienced administrator, this guide aims to provide clear, step-by-step instructions to get your Minetest Mineclone2 server up and running.

Here's a step-by-step guide on how to install and run a Minetest Mineclone2 server on a Debian-based system:

1. **Update System Packages**:
   
   - Before starting, ensure your system packages are up to date by running the following commands:
     
     ```
     sudo apt update
     sudo apt upgrade
     ```

2. **Install Minetest Server**:
   
   - Install the Minetest server package using the following command:
     
     ```
     sudo apt install minetest-server
     ```
   
   - The server should start by default. To confirm, run:
     
     ```
     sudo systemctl status minetest-server
     ```

3. **Configure Minetest Server**:
   
   - To change server settings, edit the configuration file using the following command:
     
     ```
     sudo nano /etc/minetest/minetest.conf
     ```
   
   - In this file, you can change your server's name, port, description, message of the day, max users, default privileges, etc. 
   
   - To set an admin username, uncomment the admin line and enter your username:
     
     ```
     name = admin_username
     ```
   
   - Save and exit the file (in nano, press `Ctrl + X` to close, press `Y` to confirm changes, and press `Enter` to save).

4. **Grant Admin Privileges**:
   
   - Connect to your server using the admin's username and grant all privileges to yourself.

5. **Install MineClone2**:
   
   - First, find the version of MineClone2 compatible with your Minetest version. You can see the installed version of Minetest by running:
     
     ```
     minetest-server --version
     ```
   
   - Refer to the [MineClone2 forum post](https://forum.minetest.net/viewtopic.php?t=16407) for finding your compatible version.
     
   
   [Here]([https://git.minetest.land/MineClone2/MineClone2) is the GitTea code repository.
   
   [Here](https://github.com/MineClone2/MineClone2) is the mirror GitHub repository. 
   
   
   - Download the compatible version of MineClone2 using `wget`:
     
     ```
     wget [compatible_version_link]
     ```
   
   - Unzip the downloaded file and move the folder to the game's directory:
     
     ```
     unzip mineclone2.zip
     sudo mv mineclone2 /var/games/minetest-server/.minetest/games
     ```
   
   - If the directory doesn't exist, create it and run the move command again.

6. **Update Configuration for MineClone2**:
   
   - Edit the Minetest configuration file again:
     
     ```
     sudo nano /etc/minetest/minetest.conf
     ```
   
   - Find the `default_game` setting and change it to `mineclone2`:
     
     ```
     default_game = mineclone2
     ```
   
   - Save and exit the file.

7. **Delete Pre-existing World**:
   
   - The current world is not compatible with MineClone2, so delete it:
     
     ```
     sudo rm -r /var/games/minetest-server/.minetest/worlds/world
     ```

8. **Restart Minetest Server**:
   
   - Apply your changes by restarting the Minetest server:
     
     ```
     sudo systemctl restart minetest-server
     ```

9. **Connect to Your Server**:
   
   - After restarting, connect to your server again. Now your server should be running MineClone2.

10. **(Optional) Latest Version**:
    
    - If you want the latest version of Minetest, you may need to build Minetest from source or set up the backports repositories. Check out the [Minetest Wiki](https://wiki.minetest.net/Setting_up_a_server) for more information on configuring and optimizing your server.

This guide is tailored to meet the requirements of a Debian-based system as per the instructions in the video tutorial.

### Backup the Server's Game World

Here are additional sections on how to backup the server's game world and how to update both Minetest and Mineclone2 while keeping the same world intact:

1. **Locate the World Directory**:
   
   - The world data is typically stored in the `/var/games/minetest-server/.minetest/worlds/` directory. Inside this directory, you'll find a folder named `world` or something similar which contains the world data.

2. **Create a Backup**:
   
   - Use the `tar` command to create a compressed backup of the world directory. Run the following command:
     
     ```
     sudo tar -cvzf world_backup.tar.gz /var/games/minetest-server/.minetest/worlds/world
     ```
   
   - This command will create a file named `world_backup.tar.gz` containing a backup of your game world.

3. **Move/Copy Backup to a Safe Location**:
   
   - It's a good practice to move or copy the backup file to a different location or even to a different machine for safekeeping.
     
     ```
     sudo mv world_backup.tar.gz /path/to/safe/location/
     ```

### Update Minetest and Mineclone2:

1. **Backup Your World**:
   
   - Before updating, ensure you have a backup of your world as described in the previous section.

2. **Update Minetest**:
   
   - If there's a newer version of Minetest available in the repositories, you can update it using the following commands:
     
     ```
     sudo apt update
     sudo apt upgrade minetest-server
     ```

3. **Update Mineclone2**:
   
   - Download the latest version of Mineclone2 from the [Mineclone2 forum page](https://forum.minetest.net/viewtopic.php?t=16407) or other official sources.
   
   - Remove the old Mineclone2 directory:
     
     ```
     sudo rm -r /var/games/minetest-server/.minetest/games/mineclone2
     ```
   
   - Unzip and move the new version of Mineclone2 to the games directory:
     
     ```
     unzip mineclone2_new_version.zip
     sudo mv mineclone2 /var/games/minetest-server/.minetest/games
     ```

4. **Verify Configuration**:
   
   - Ensure that the `default_game` setting in the Minetest configuration file (`/etc/minetest/minetest.conf`) is still set to `mineclone2`.

5. **Restart Minetest Server**:
   
   - Restart the Minetest server to apply the updates:
     
     ```
     sudo systemctl restart minetest-server
     ```

6. **Test Your Server**:
   
   - Connect to your server and ensure that everything is working as expected, and your world is intact.

These steps should help you in safely backing up your game world and updating Minetest and Mineclone2 to newer versions while keeping your world intact.

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
