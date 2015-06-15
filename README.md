##Nodejs Starter

Sample nodejs webapp with tools you'll need:

- Nodejs [express](http://expressjs.com/4x/api.html) server with minimal files 
- [mongoose](http://mongoosejs.com/docs/guide.html) for mongodb & [mongo-express](https://github.com/andzdroid/mongo-express) for admin
- [EJS](https://github.com/mde/ejs) templating & [Jquery](https://learn.jquery.com/using-jquery-core/) & [Bootstrap](http://getbootstrap.com/components/) interface
- Google & FB login with [passport](http://passportjs.org/docs/overview)


###Setup

```
git clone https://github.com/gulakov/nodejs-starter.git
npm install
sudo npm install forever -g && mkdir db && mv node_modules/mongo-express/config.default.js node_modules/mongo-express/config.js
```
To setup db admin password and change port from localhost:8081 ```vi node_modules/mongo-express/config.js```
Register your app for [Google Developer](https://console.developers.google.com/project) and put the keys and callbacks in the auth.js file to make logins work.

On linux run ```sudo npm run mongo``` to start database, enter for new line or new console, then run ```sudo npm start``` to start server forever with auto-refresh. Log output to console, but press enter for more commands. On windows use ```npm run mongo-win``` and ```npm run start-win``` in separate consoles.

For Windows prerequisites, see below for VS2010 and Python27. For linux, if it's the first time ever using this server, run this first:
```sudo apt-get update && sudo apt-get dist-upgrade -y && sudo apt-get install -y nodejs npm nodejs-legacy mongodb screen openssh-server build-essential python git unzip rar```


## .bashrc

Install useful .bashrc shortcuts: 
```u```  check updates, ```l``` detailed file list, ```..``` parent dir, ```i [appname]``` install package, ```x [file]``` uncompress file, ```own [dir]``` get access to folder, ```p [procname]``` find process by name, ```f [string]``` find string in this folder's files, ```gg``` git commit and push 

```sed -i "$ a\#custom shortcuts \nx(){ case \$1 in *.tar.bz2) tar xjf \$1;; *.tar.gz) tar xzf \$1;; *.bz2) bunzip2 \$1;; *.rar) rar x \$1;; *.gz) gunzip \$1;; *.tar) tar xf \$1;; *.tbz2) tar xjf \$1;; *.tgz) tar xzf \$1;; *.zip) unzip \$1;; *.Z) uncompress \$1;; esac; } \nf(){ grep -R -I \"\$1\" ./*; } \np(){ ps aux | grep \$1 | grep -v grep; } \nown(){ sudo chmod 777 -R \${1:-.} && sudo chown -R \${USER} \${1:-.}; } \nalias u='sudo apt-get update && sudo apt-get dist-upgrade -y && sudo apt-get autoremove -y' \nalias l='ls -la' \nalias ..='cd ..' \nalias i='sudo apt-get install' \nalias gg='git add . && git commit -a -m "." && git push -u -f origin master'" ~/.bashrc && source ~/.bashrc```

when you login, if you want the default directory to always be your site then edit this with the path:
```echo "cd /path/to/site" >> ~/.bashrc```


## Git 

```
ssh-keygen -t rsa -C "yourname@example.com"
vi ~/.ssh/id_rsa.pub
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


### Programs
[Sublime](http://www.sublimetext.com/3)
[(Sublime Packages)](https://packagecontrol.io/installation)
[Atom](https://atom.io/)
[Node.js](https://nodejs.org/download/)
[MongoDB](https://www.mongodb.org/downloads)
[Postman (Chrome)](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm)
[SSH Shell (Chrome)](https://chrome.google.com/webstore/detail/secure-shell/pnhechapfaindjhompbnflcldabbghjo?utm_source=chrome-app-launcher-info-dialog)

Windows:
[WinSCP](http://winscp.net/eng/download.php#download2)
[Putty](http://the.earth.li/~sgtatham/putty/latest/x86/putty.exe)
[Cygwin](https://cygwin.com/setup-x86.exe)
[Github](https://github-windows.s3.amazonaws.com/GitHubSetup.exe)
[PathEditor](https://patheditor2.codeplex.com/)
[WAMPServer](http://www.wampserver.com/en/)

Windows Nodejs NPM install dependencies:
[VS2010](https://app.vssps.visualstudio.com/profile/review?download=true&family=VisualStudioCExpress&release=VisualStudio2010&type=web&slcid=0x409)
[Python2.7](https://www.python.org/downloads/)
