---
title: Install OpenCart on Raspberry Pi 4 (8gb) 
description: Host your own online shop with free and open-source software and a tiny computer
categoryId: ['coding', 'open-source']
authorId: 'adam'
published: '2023-05-15'
---

![](http://www.m2coders.com/wp-content/uploads/2021/04/Opencart_banner.png)

### **Step 1: Update your system** Before installing any new software, update your system packages. Open a terminal on your Raspberry Pi and execute the following commands:

```
sudo apt update
sudo apt upgrade
```

This will update the package list and upgrade the installed packages to their latest versions. Proceed to the next step when ready.

### **Step 2: Install Apache, PHP, and MariaDB**

To run OpenCart on your Raspberry Pi, you'll need to install a web server, a database server, and PHP. Use Apache, MariaDB, and PHP for this purpose. Run the following commands to install them:

Add the PHP repository and update your package list:

```
sudo apt-get install -y apt-transport-https lsb-release ca-certificates wget
wget -qO - https://packages.sury.org/php/apt.gpg | sudo gpg --dearmor -o /usr/share/keyrings/php-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/php-archive-keyring.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php.list
sudo apt update
```

```
sudo apt install apache2 -y
sudo apt install mariadb-server -y
sudo apt install php8.1 php8.1-mysql php8.1-gd php8.1-curl php8.1-xml php8.1-mbstring php8.1-zip libapache2-mod-php8.1 -y
```

Verify that PHP 8.1 is installed by checking its version:

```
php -v
```

Restart the Apache service to apply the changes:

```
sudo systemctl restart apache2
```

### **Step 3: Configure MariaDB**

Secure and configure MariaDB after installation. Run the following command to secure your MariaDB installation:

```
sudo mysql_secure_installation
```

You'll be prompted to set a root password and answer a series of questions. Follow the recommendations to improve security. For the questions, answer as follows:

- Switch to unix_socket authentication? [Y/n] n
- Change the password for root? [Y/n] n
- Remove anonymous users? \[Y/n\] y
- Disallow root login remotely? \[Y/n\] y
- Remove test database and access to it? \[Y/n\] y
- Reload privilege tables now? \[Y/n\] y

Next, create a database and user for OpenCart. Log in to the MariaDB console by running:

```
sudo mysql -u root -p
```

Enter the root password you set earlier. Then execute the following commands to create a database and user for OpenCart:

```
CREATE DATABASE opencart;
CREATE USER 'opencartuser'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON opencart.* TO 'opencartuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Replace 'your\_password' with a strong password of your choice. Remember this database name, username, and password, as you'll need them during the OpenCart installation.

### **Step 4: Download and Set Up OpenCart**

First, navigate to the `/var/www` directory and download the latest OpenCart release from their GitHub repository:

```
cd /var/www
sudo wget https://github.com/opencart/opencart/releases/download/4.0.2.1/opencart-4.0.2.1.zip
```

\*Note that the version number in the URL might change as new versions are released. Make sure to check the OpenCart GitHub repository for the latest release.

Now, unzip the downloaded file and move the contents of the 'upload' directory to a new directory named 'opencart':

```
sudo apt install unzip -y
sudo unzip opencart-4.0.2.1.zip
cd opencart-4.0.2.1
sudo mv upload opencart
```

Change the ownership of the 'opencart' directory to the Apache user:

```
sudo chown -R www-data:www-data opencart
```

### **Step 5: Configure Apache**

Configure Apache Create an Apache virtual host configuration for your OpenCart installation. First, create a new configuration file:

Install PHP-FPM:

```
sudo apt install php8.1-fpm -y
```

Enable the proxy\_fcgi and setenvif modules in Apache:

```
sudo a2enmod proxy_fcgi setenvif
sudo nano /etc/apache2/sites-available/opencart.conf
```

Paste the following configuration into the file, replacing 'your\_domain' with your domain name or your Raspberry Pi's local IP address:

```
<VirtualHost *:80>
    ServerName localhost
    DocumentRoot /var/www/opencart-4.0.2.1/opencart

    <Directory /var/www/opencart-4.0.2.1/opencart>
        Options FollowSymlinks
        AllowOverride All
        Require all granted

        <FilesMatch \.php$>
            SetHandler "proxy:unix:/var/run/php/php8.1-fpm.sock|fcgi://localhost/"
        </FilesMatch>
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/opencart_error.log
    CustomLog ${APACHE_LOG_DIR}/opencart_access.log combined
</VirtualHost>
```

Save and close the file. Then, disable the default Apache site and enable the OpenCart site:

```
sudo a2dissite 000-default
sudo a2ensite opencart
sudo systemctl restart apache2
sudo systemctl restart php8.1-fpm
```

Enable the Apache rewrite module, which is required by OpenCart:

```
sudo a2enmod rewrite
```

Finally, restart the Apache service to apply the changes:

```
sudo systemctl restart apache2
```

Create and set the correct permissions for the config.php files:

```
sudo touch /var/www/opencart-4.0.2.1/opencart/config.php
sudo touch /var/www/opencart-4.0.2.1/opencart/admin/config.php
sudo chown www-data:www-data /var/www/opencart-4.0.2.1/opencart/config.php
sudo chown www-data:www-data /var/www/opencart-4.0.2.1/opencart/admin/config.php
sudo find /var/www/opencart-4.0.2.1/opencart -type d -exec chmod 755 {} \;
sudo find /var/www/opencart-4.0.2.1/opencart -type f -exec chmod 644 {} \;
```

### **Step 6: Complete OpenCart Installation via Web Interface**

Open a web browser and navigate to your domain or Raspberry Pi's local IP address. You should see the OpenCart installation page. Follow the on-screen instructions and accept the license agreement. The installer will check your server for compatibility. If everything is set up correctly, you should see green checkmarks for all the requirements. Click "Continue" to proceed.

Enter the database connection details you created earlier:

- Database Driver: MySQLi
- Hostname: localhost
- Username: opencartuser
- Password: your\_password (the one you set earlier)
- Database: opencart
- Port: 3306
- Prefix: oc\_

Fill out the administrative account details to create your OpenCart admin user. Click "Continue" to complete the installation process. After the installation is complete, you'll be prompted to delete the "install" directory. To do this, run the following command:

```
sudo rm -rf /var/www/opencart/install
```

Now, you should be able to access the OpenCart admin panel using the admin account you created during the installation process. That's it! You have successfully installed OpenCart on your Raspberry Pi running Raspberry Pi OS Lite (64bit).
