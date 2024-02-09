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
   
   In Minetest, the initial granting of administrative privileges needs to be done from the server's command line or configuration file, not from within the game client. Here's how you can grant yourself all privileges:
   
   1. **Via Configuration File**:
      
      - Open the Minetest configuration file (`minetest.conf`) located in `/etc/minetest/` or in your Minetest server's main directory.
        
        ```
        sudo nano /etc/minetest/minetest.conf
        ```
      
      - Add or modify the following line, replacing `<your-username>` with your username:
        
        ```
        name = <your-username>
        ```
      
      - Add the following line to grant all privileges to your username:
        
        ```
        initial_privs = all
        ```
      
      - Save and close the file (in nano, press `Ctrl + X` to close, press `Y` to confirm changes, and press `Enter` to save).
      
      - Restart your Minetest server to apply the changes:
        
        ```
        sudo systemctl restart minetest-server
        ```
   
   2. **Via Server Command Line**:
      
      - If your server has a command line interface (CLI), you can grant privileges directly from there.
      
      - Access the server CLI, and type the following command, replacing `<your-username>` with your username:
        
        ```
        /grant <your-username> all
        ```
   
   3. 
   
   After following one of the above methods, you should have all privileges on your Minetest server. Connect to your server again and check your privileges using the `/privs` command in the game's chat/command interface.

5. **Install MineClone2**:
   
   - First, find the version of MineClone2 compatible with your Minetest version. You can see the installed version of Minetest by running:
     
     ```
     /usr/lib/minetest/minetestserver --version
     ```
   
   - Refer to the [MineClone2 forum post](https://forum.minetest.net/viewtopic.php?t=16407) for finding your compatible version.
   
   Right-click on the appropriate link and select "copy link".

Download the compatible version of MineClone2 using `wget`:

- ```
  wget [compatible_version_link]
  ```

- Use the `ls` command to see the name of the zip you have downloaded.
  
  ```
  unzip [file-name].zip
  ```
  
  If you get an error like `-bash: unzip: command not found` you can use the following command to install unzip:
  
  ```
  sudo apt-get install unzip
  ```
  
  Unzip the downloaded file and move the folder to the game's directory:
  
  ```
  sudo mv ~/mineclone2 /var/games/minetest-server/.minetest/games/
  ```

- If the directory doesn't exist, create it and run the move command again.

        You can use this command to create the directory:

```
sudo mkdir /var/games/minetest-server/.minetest/games
```

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

---

### Regenerating a New World and Using a Specific Seed

If you're not satisfied with the auto-generated world in your Minetest server, you can regenerate a new world or use a specific seed to generate a world with certain characteristics. Here's how to do it:

1. **Stop Your Minetest Server**:
   Before making changes to your world, ensure that your Minetest server is stopped to prevent any data corruption.
   
   ```
   sudo systemctl stop minetest-server
   ```

2. **Backup Your Current World** (Optional):
   If you have any data in your current world that you want to keep, it's a good idea to create a backup before proceeding.
   
   ```
   sudo cp -r /var/games/minetest-server/.minetest/worlds/world /path/to/backup/directory
   ```

3. **Delete Your Current World**:
   Delete the current world directory to make way for the new world.
   
   ```
   sudo rm -rf /var/games/minetest-server/.minetest/worlds/world
   ```

4. **Edit Your Minetest Configuration**:
   Open the Minetest configuration file to specify a seed or leave it blank for a random new world.
   
   ```
   sudo nano /etc/minetest/minetest.conf
   ```
   
   - To use a specific seed, add or modify the following line:
     
     ```
     fixed_map_seed = your_desired_seed
     ```
     
     Replace `your_desired_seed` with the seed you want to use.
   
   - To generate a random new world, either omit the `fixed_map_seed` line or leave it blank.

5. **Start Your Minetest Server**:
   Start your Minetest server again to generate the new world.
   
   ```
   sudo systemctl start minetest-server
   ```

6. **Verify Your New World**:
   Connect to your Minetest server and explore the new world to ensure it meets your expectations.

7. **Adjusting World Settings** (Optional):
   
   - If the new world isn't to your liking, you can repeat the above steps to try a different seed or generate another random world.
   - Additionally, you can explore other world generation settings in the Minetest configuration file to further customize your world.

By following these steps, you can regenerate a new world or use a specific seed to create a world that better suits your preferences in Minetest with Mineclone2.

--- 

This section provides a step-by-step guide on how to regenerate a new world and how to use a specific seed for world generation in your Minetest server running Mineclone2.

# Make Your New Mineclone2 Server Play More Like Vanilla Minecraft

To make your Mineclone2 server as much like Minecraft as possible, you may need to adjust several settings within the Minetest configuration file (`minetest.conf`). Mineclone2 is designed to mimic Minecraft's gameplay and mechanics, but there might be some settings you can tweak to get a closer experience. Here are some suggestions:

1. **Enable Damage**:
   
   - Ensure that the `enable_damage` setting is true to have a survival gameplay experience similar to Minecraft.
     
     ```
     enable_damage = true
     ```

2. **Set Default Privileges**:
   
   - Set the default privileges for new players to mimic Minecraft's default permissions.
     
     ```
     default_privs = interact, shout
     ```

3. **Adjusting Map Generation Settings**:
   
   - You can tweak map generation settings to get a world generation closer to Minecraft's. Some of these settings include:
     
     ```
     mg_name = v7
     water_level = 1
     ```

4. **Enable PvP**:
   
   - If you want to allow player versus player combat, ensure that PvP is enabled.
     
     ```
     enable_pvp = true
     ```

5. **Adjusting Player Settings**:
   
   - Adjust player settings to match Minecraft's player mechanics.
     
     ```
     player_backend = sqlite3
     player_transfer_distance = 0
     ```

6. **Enable Mods**:
   
   - Enable or install additional mods that bring Minecraft features to Mineclone2. There are many mods available that can enhance the gameplay experience to be more like Minecraft.

7. **Texture Packs**:
   
   - Consider using a Minecraft-like texture pack to give Mineclone2 a more Minecraft-like appearance.

8. **Server Description and Name**:
   
   - Set a server description and name that reflects the Minecraft-like experience you are providing.
     
     ```
     server_description = Minecraft-like Mineclone2 Server
     server_name = Mineclone2 Server
     ```

9. **Creative Mode**:
   
   - If you prefer a creative gameplay experience, you can enable creative mode.
     
     ```
     creative_mode = false
     ```

10. **Static Spawnpoint**:
    
    - Set a static spawn point similar to Minecraft's spawn behavior.
      
      ```
      static_spawnpoint = (0,0,0)
      ```

11. **Other Gameplay Settings**:
    
    - Explore other gameplay settings in the `minetest.conf` file or in the in-game settings menu to fine-tune the gameplay experience.

These adjustments can help make your Mineclone2 server feel more like a traditional Minecraft server. Remember to restart your Minetest server after making changes to the configuration file to apply the new settings:

```
sudo systemctl restart minetest-server
```

Keep in mind that while Mineclone2 aims to replicate Minecraft's gameplay within the Minetest engine, there may be some differences or features that are not exactly like Minecraft due to the limitations or differences in the engine or the Mineclone2 implementation.



# Admin Commands



Having a grasp of the admin commands in Minetest (especially when running MineClone 2) can be very beneficial for managing a server effectively. Here's a list of commonly used admin commands:

1. **Granting and Revoking Privileges:**
   
   - `/grant <playername> <privilege>`: Grants a specified privilege to a player.
   - `/revoke <playername> <privilege>`: Revokes a specified privilege from a player.

2. **Teleportation:**
   
   - `/teleport <X,Y,Z>`: Teleports you to the specified coordinates.
   - `/teleport <playername> <X,Y,Z>`: Teleports the specified player to the specified coordinates.
   - `/teleport <playername1> <playername2>`: Teleports player1 to player2's position.

3. **Giving Items:**
   
   - `/give <playername> <itemstring> [<count>]`: Gives the specified item to a player. You can also specify the quantity.

4. **Time and Weather:**
   
   - `/time <time>`: Sets the time of day. (e.g., `/time 6000` for midday)
   - `/weather <weather>`: Sets the weather (e.g., `/weather rain` to set the weather to rain).

5. **Server Management:**
   
   - `/kick <playername>`: Kicks a player from the server.
   - `/ban <playername>`: Bans a player from the server.
   - `/unban <playername>`: Unbans a player from the server.

6. **Clearing Objects:**
   
   - `/clearobjects`: Clears all objects in the world. Be cautious as this can't be undone.

7. **Purging and Removing Players:**
   
   - `/clearinv <playername>`: Clears a player's inventory.
   - `/remove_player <playername>`: Removes a player's data from the server.

8. **Information Commands:**
   
   - `/status`: Displays server status information.
   - `/privs <playername>`: Displays the privileges of a specified player.

9. **World Management:**
   
   - `/set <name> <value>`: Sets a server configuration setting.
   - `/deleteblocks <X1,Y1,Z1> <X2,Y2,Z2>`: Deletes all blocks in the specified area.

10. **Chat and Communication:**
    
    - `/me <action>`: Sends an action message to the chat. (e.g., `/me jumps` will display "*<playername> jumps")
    - `/msg <playername> <message>`: Sends a private message to a specified player.

These commands should give you a good degree of control over your server and help in managing players and game settings. Make sure to replace placeholders like `<playername>`, `<X,Y,Z>`, `<itemstring>`, `<count>`, `<time>`, `<weather>`, `<name>`, and `<value>` with actual values or player names when using these commands.



# Admin Fly



In Minetest and MineClone 2, the `fly` privilege allows players to fly around the world, which can be extremely useful for admins and moderators for overseeing and managing the server. Here's how you can use and manage the `fly` privilege:

### Enabling Fly Mode:

1. **Granting Fly Privilege:**
   
   - If you're an admin, you can grant the `fly` privilege to yourself or other players using the following command:
     
     ```
     /grant <playername> fly
     ```
     
     Replace `<playername>` with the username of the player you want to grant the privilege to.

2. **Activating Fly Mode:**
   
   - Once the `fly` privilege has been granted, the player can toggle fly mode on and off by pressing the `K` key (by default). This can be changed in the settings under "Change Keys".

### Disabling Fly Mode:

1. **Revoking Fly Privilege:**
   - If you need to revoke the `fly` privilege from a player, you can use the following command:
     
     ```
     /revoke <playername> fly
     ```

### Checking Fly Privilege:

1. **Checking Privileges:**
   - You can check the privileges of a player using the following command:
     
     ```
     /privs <playername>
     ```

### Tips:

- The `fly` privilege is very powerful and can potentially be abused, so it's typically reserved for trusted players, admins, and moderators.
- While in fly mode, players can move up by pressing the jump key (space by default) and move down by pressing the sneak key (shift by default).

These commands and tips should help you manage the `fly` privilege on your server effectively.



> *Adam Malin*
> 
> [adammalin.com](https://adammalin.com)
> 
> You can find me on [Twitter](https://twitter.com/thePR0M3TH3AN) or on Nostr at
> 
> `npub15jnttpymeytm80hatjqcvhhqhzrhx6gxp8pq0wn93rhnu8s9h9dsha32lx`
>
> You can view and write comments on this or any other post by using the [Satcom](https://github.com/jinglescode/web-content-conversation) browser extention.
>
> **value4value**
> Did you find any value from this article? [Click here to send me a tip!](https://adammalin.com/tip)
