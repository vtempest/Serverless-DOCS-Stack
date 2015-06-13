##Nodejs Starter

Minimalist nodejs webapp with tools you'll need in your projects:

- express server
- mongoose for mongodb
- mongo-express for db admin
- ejs templating
- Jquery & Bootstrap interface
- Google user authentication with passport


###Setup

```
npm install
sudo npm install forever -g && mkdir db && mv node_modules/mongo-express/config.default.js node_modules/mongo-express/config.js
```
To setup db admin password and change port from localhost:8081 ```vi node_modules/mongo-express/config.js```


Run to start server forever with auto-refresh. Log output to console, but press enter for more commands
```
npm run mongo
npm start
```


If it's the first time ever using this server, run this first:
```sudo apt-get update && sudo apt-get dist-upgrade -y && sudo apt-get install -y nodejs npm mongodb screen openssh build-essential python git```


## .bashrc

Install useful .bashrc shortcuts: ```u``` to check updates, ```l``` detailed file list, ```..``` parent dir, ```i <appname>``` install package
```echo "alias u='sudo apt-get update && sudo apt-get dist-upgrade -y && sudo apt-get autoremove -y'" >> ~/.bashrc &&  echo "alias l='ls -la'" >> ~/.bashrc && echo "alias ..='cd ..'" >> ~/.bashrc && echo "alias i='sudo apt-get install'" >> ~/.bashrc && source ~/.bashrc```

when you login, if you want the default directory to always be your site then edit this with the path:
```echo "cd /path/to/site" >> ~/.bashrc```


## Git setup

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


### AWS SSH Setup

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

```sudo service ssh restart```` 
Now you can login as ssh alex@##.##.##.##.##

### Open ports
In the AWS EC2 Instance console, make sure the security group assigned to your instance has under the inbound tab port 80 HTTP enabled. Only port 22 is open by default. Find out your security group name listed when you click on your instance, then go to the Security Groups link on the sidebar of ec2 and modify that security group by clicking on it, inbound tab, edit, add rule, select http. Now when you click on your ec2 instance it shows a public URL like this ec2-54-85-204-200.compute-1.amazonaws.com


### Register a domain
Go to your ec2 manager and click elastic IPs on the sidebar, Allocate a new address, then associate address and select your running instance to be associated with that address. Test it out by typing that ip address into your url box, index.html should show up.
Now go to Route 53 under the aws console dropdown and click Create Hosted Zone, name it your site's name .com, then go to record sets, create record set Type: A with the Value of the Elastic IP you got before.
Now copy the Name Server values, which look like ns-1877.awsdns-42.co.uk. ns-1149.awsdns-15.org. ns-923.awsdns-51.net. ns-216.awsdns-27.com.


### Programs
[Sublime](http://www.sublimetext.com/3)
[(Sublime Packages)](https://packagecontrol.io/installation)
[Atom](https://atom.io/)
[Node.js](https://nodejs.org/download/)
[MongoDB](https://www.mongodb.org/downloads)

Windows:
[WinSCP](http://winscp.net/eng/download.php#download2)
[Putty](http://the.earth.li/~sgtatham/putty/latest/x86/putty.exe)
[Cygwin](https://cygwin.com/setup-x86.exe)
[Github](https://github-windows.s3.amazonaws.com/GitHubSetup.exe)
[EnvEditor](http://www.rapidee.com/download/RapidEE_setup.exe)
[WAMPServer](http://www.wampserver.com/en/)

Windows Nodejs NPM install dependencies:
[VS2010](https://app.vssps.visualstudio.com/profile/review?download=true&family=VisualStudioCExpress&release=VisualStudio2010&type=web&slcid=0x409)
[Python2.7](https://www.python.org/downloads/)
