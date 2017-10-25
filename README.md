## Starter Node Web App 

- Nodejs [express](http://expressjs.com/4x/api.html) server with minimal files 
- [mongoose](http://mongoosejs.com/docs/guide.html) for mongodb & [mongo-express](https://github.com/andzdroid/mongo-express) for admin
- [EJS](https://github.com/mde/ejs) templating & [Jquery](https://learn.jquery.com/using-jquery-core/) & [Bootstrap](http://getbootstrap.com/components/) interface 
- Google & FB login with [passport](http://passportjs.org/docs/overview)


## Setup

```
#one time: install yeoman & this generator
npm i -g yo
npm install -g generator-node-mongo-web-server 


#starting 
yo node-mongo-web-server
cd node-mongo-web-server
npm install
sudo npm run setup
```
To setup db admin password and change port from localhost:8081 ```vi node_modules/mongo-express/config.js```
Register your app for [Google Developer](https://console.developers.google.com/project) or [Facebook Developer](https://developers.facebook.com/) and put the keys and callbacks in the auth.js file to make logins work.

On linux run ```sudo npm run mongo``` to start database, enter for new line or new console, then run ```sudo npm start``` to start server forever, with auto-restarts on file changes, and with auto-refresh on pages with the line of code from head.ejs. Output logs to console, but press enter to use the window for more commands (or use ```screen``` for new console screens and Ctrl+A+D to detach and ```screen -r``` # to retach.) 

Ubuntu Server first time setup: ```sudo apt-add-repository multiverse && sudo apt-get update && sudo apt-get dist-upgrade -y && sudo apt-get install -y nodejs npm nodejs-legacy libkrb5-dev mongodb screen openssh-server build-essential python git unzip unrar```


Setup your server shell with useful shortcuts for updating and searching your files with [this zshrc](https://github.com/gulakov/awesome-zsh).


## Git 

```
git config --global user.name "Your Name"
git config --global user.email yourname@example.com

ssh-keygen -t rsa -C "yourname@example.com"
cat ~/.ssh/id_rsa.pub
```
copy from this console into a new key https://github.com/settings/ssh
now create a new git repo https://github.com/new
```
cd /path/to/site
git init && git add * && git commit -a -m "init"
git remote add origin git@github.com:yourname/repo.com.git
git push -u -f origin master
```


### AWS

Create a free-tier ubuntu server, download key, and login from your computer:
```ssh -i /path/to/your/Awskey.pem ubuntu@##.##.##.##``` 


```sudo adduser alex```
Set a password

```sudo visudo```
Add this line
```alex ALL=NOPASSWD:ALL```
Beneath the root ALL=(ALL):ALL line, and ctrl x to exit and enter y to save

```sudo nano /etc/ssh/sshd_config```
Find this line and modify it to say yes:  PasswordAuthentication yes 
Then exit and save with ctrl+x and press y to save

```sudo service ssh restart```
Now you can login as ssh alex@##.##.##.##.##

Open ports:
In the AWS EC2 Instance console, make sure the security group assigned to your instance has under the inbound tab port 80 HTTP enabled. Only port 22 is open by default. Find out your security group name listed when you click on your instance, then go to the Security Groups link on the sidebar of ec2 and modify that security group by clicking on it, inbound tab, edit, add rule, select http. Now when you click on your ec2 instance it shows a public URL like this ec2-54-85-204-200.compute-1.amazonaws.com


Domain:
Go to your ec2 manager and click elastic IPs on the sidebar, Allocate a new address, then associate address and select your running instance to be associated with that address. Now go to Route 53 under the aws console dropdown and click Create Hosted Zone, name it your site's name .com, then go to record sets, create record set Type: A with the Value of the Elastic IP you got before. Now copy the Name Server values, which look like ns-1877.awsdns-42.co.uk. ns-1149.awsdns-15.org. ns-923.awsdns-51.net. ns-216.awsdns-27.com. and paste those into your DNS registrar's settings for custom DNS.


### VirtualBox 
To develop on a local virtual machine server, install [VirtualBox](https://www.virtualbox.org/wiki/Downloads) and [Ubuntu Server](http://www.ubuntu.com/download/server). Settings>Storage>Add Optical Drive> Select ubuntu iso and check Live CD. System>MotherBoard and System>Processor, allocate more RAM and CPU cores for speed. 

SSH+HTTP: Settings>Network>Adapter 1> Attached to: NAT, Advanced > Port Forwarding > Host IP 127.0.0.1 : 22 to Guest IP 10.0.2.15 : 22 and so the vm can serve http pages and see in browser at localhost:[port], also add  127.0.0.1 : 80 (or other port) to Guest IP 10.0.2.15 : 80. Now you can Shift+Click "Start" ro run vm in background and ssh [vm user name]@localhost. You can also add your virtualbox to path and create a shortcut script to start vm from command line:  VBoxManage startvm "ubuntu server" --type headless

Shared Folders: so you can develop in a real IDE   first install VBox Guest Additions: Devices>Insert Guest Addition iso, then sudo mount /dev/cdrom /media/cdrom && sudo /media/cdrom/VBoxLinuxAdditions.run, next shutdown and Settings>Shared Folders>Add folder with local path and share_name and Auto-mount. Then boot the vm and shared folder is at /media/sf_[share_name] but you can change mount point: sudo mkdir [/path/new/mount/point] && sudo mount -t vboxsf [share_name] [/path/new/mount/point] 

