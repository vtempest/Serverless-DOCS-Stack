##Nodejs Starter

Sample nodejs webapp with tools you'll need:

- Nodejs [express](http://expressjs.com/4x/api.html) server with minimal files 
- [mongoose](http://mongoosejs.com/docs/guide.html) for mongodb & [mongo-express](https://github.com/andzdroid/mongo-express) for admin
- [EJS](https://github.com/mde/ejs) templating & [Jquery](https://learn.jquery.com/using-jquery-core/) & [Bootstrap](http://getbootstrap.com/components/) interface on top of [HTML CSS JS apps](https://developer.mozilla.org/en-US/docs/Web/Tutorials)
- Google & FB login with [passport](http://passportjs.org/docs/overview)


###Setup

```
git clone https://github.com/gulakov/nodejs-starter.git
cd nodejs-starter
npm install
sudo npm run setup
```
To setup db admin password and change port from localhost:8081 ```vi node_modules/mongo-express/config.js```
Register your app for [Google Developer](https://console.developers.google.com/project) or [Facebook Developer](https://developers.facebook.com/) and put the keys and callbacks in the auth.js file to make logins work.

On linux run ```sudo npm run mongo``` to start database, enter for new line or new console, then run ```sudo npm start``` to start server forever, with auto-restarts on file changes, and with auto-refresh on pages with the line of code from head.ejs. Output logs to console, but press enter to use the window for more commands (or use ```screen``` for new console screens and Ctrl+A+D to detach and ```screen -r``` # to retach.) On windows use ```npm run mongo-win``` and ```npm run start-win``` in separate consoles.

For Windows prerequisites, see below for VS2010  Python27 NodeJS MongoDB (you must add mongo to path). For linux, if it's the first time ever using this server, run this first:
```sudo apt-add-repository multiverse && sudo apt-get update && sudo apt-get dist-upgrade -y && sudo apt-get install -y nodejs npm nodejs-legacy libkrb5-dev mongodb screen openssh-server build-essential python git unzip unrar```


## .bashrc

Install useful .bashrc shortcuts: 
```u```  check updates, ```l``` detailed file list, ```..``` parent dir, ```i [appname]``` install package, ```x [file]``` uncompress file, ```own [dir]``` get access to folder, ```p [procname]``` find process by name, ```gg``` git commit and push,  ```f [string]``` find string in this folder's files, ```ff [string]``` find string in this folder's file and subfolder names, ```fr [string] [string]``` find and replace string in this folder's files

```
# color
PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
alias grep='grep --color=always'

# bash history
HISTSIZE=1000
HISTFILESIZE=2000
HISTCONTROL=ignoreboth
rm -f /home/$USER/.bash_history
export HISTFILE=/home/$USER/.config/.bash_history
shopt -s histappend
shopt -s checkwinsize
. /usr/share/bash-completion/bash_completion


# shortcuts
x(){ case $1 in *.tar.bz2) tar xjf $1;; *.tar.gz) tar xzf $1;; *.bz2) bunzip2 $1;; *.rar) rar x $1;; *.gz) gunzip $1;; *.tar) tar xf $1;; *.tbz2) tar xjf $1;; *.tgz) tar xzf $1;; *.zip) unzip $1;; *.Z) uncompress $1;; esac; }

p(){ ps aux | grep $1 | grep -v grep; }
own(){ sudo chmod 777 -R ${1:-.} && sudo chown -R ${USER} ${1:-.}; }
alias u='sudo apt-get update && sudo apt-get dist-upgrade -y && sudo apt-get autoremove -y'
alias l='ls -la --color=always'
alias ..='cd ..'
alias i='sudo apt-get install -y '
alias gg='git add . && git commit -a -m . && git push -u -f origin master'
f(){ grep -R -I "$1" -s .; }
ff(){ find "."  -readable | grep "$1"; }
fr(){ find . -type f -exec sed -i "s/$1/$2/g" \{\} \; ;}
alias r='sudo reboot'
```

when you login, if you want the default directory to always be your site then edit this with the path:
```echo "cd /path/to/site" >> ~/.bashrc```


## Git 

```
git config --global user.name "Your Name"
git config --global user.email yourname@example.com
git config --global credential.helper cache

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


### Programs
[Sublime](http://www.sublimetext.com/3)
[(Sublime Packages)](https://packagecontrol.io/installation)
[Atom](https://atom.io/)
[Node.js](https://nodejs.org/download/)
[MongoDB](https://www.mongodb.org/downloads)
[Postman (Chrome)](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm)
[SSH Shell (Chrome)](https://chrome.google.com/webstore/detail/secure-shell/pnhechapfaindjhompbnflcldabbghjo?utm_source=chrome-app-launcher-info-dialog) [NPM Tools](https://github.com/sindresorhus/awesome-nodejs)

Windows:
[WinSCP](http://winscp.net/eng/download.php#download2)
[Cygwin](https://cygwin.com/setup-x86.exe)
[Github](https://github-windows.s3.amazonaws.com/GitHubSetup.exe)
[PathEditor](https://patheditor2.codeplex.com/)
[Visual Studio](https://www.visualstudio.com/products/visual-studio-community-vs)
