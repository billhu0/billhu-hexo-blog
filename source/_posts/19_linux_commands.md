---
title: Some Linux shell commands
date: 2022-02-10 18:21:19
description: Never do 'sudo rm -rf /'
categories: Linux
tags:
- Linux
---

{% note danger %}
  Some linux commands listed here are only available on Ubuntu/Debian. Other linux distributions may have differences.
{% endnote %}


# `|`  `||` `&&` symbols 

- `&&`: do the latter command only if the former command succeeds. E.g. `echo 1 && echo "success"`
- `||`: do the latter command only if the former command fails. E.g. `cat xxx || echo "fail"`
- The above two symbols can appear in one sentence, like `{do something} && {echo "success"} || {echo "fail"}`
- `|`  denotes a 'pipe' command. It lets you use 2 or more commands s.t. the output of one command serves as input to the next. 
  - `|` can only handle `stdout` from the last command. It cannot handle `stderr` directly. If you want to make `stderr` available for the pipe, redirect the data stream by using `2>&1`.
  - The latter command (followed by `|`) must be able to handle inputs from `stdin`. For example, `ls`, `cp`, `mv` does not accept datas from `stdin` and they are not pipe commands.
  - E.g. `ifconfig | grep inet`


# `$`-related symbols

### Variables

- `$xxx` or `${xxx}` fetches the value of a variable or the environment variable

### Calculate the result

- `$( )` and ` `` ` (back quote) executes the command inside the bracket or back quote, and returns the output of that command 

- `$(( ))` `$[]` calculates the formula

### Others

- `$#` indicates 'argc', the count of arguments
- `$n` is the value of the n-th argument, where n=1,2,...,9
- `$*` shows all arguments' value (can exceed 9) in a single string
- `$@` is almost the same as `$*`, except that `$@` will add quotation marks to pass multiple arguments, unlike `$*` which combines all arguments into one single argument
- `$$` is the PID (Process ID) of the shell itself
- `$?` is the return value of the last command, where `0` indicates success, and all other values means an error
- `$!` is the PID of the last background command (the last background process)



# `dpkg`

- Install `deb` type softwares on Ubuntu or Debian: `sudo dpkg -i xxx.deb`



# `scp` Commands

`scp` command can be used to copy files between local and remote, which is based on `ssh` protocal.

## Copy local files to a remote host

### Copy file(s)

- Copy local files to remote host's specified directory (the file name keeps same)

```shell
scp path/to/local/file RemoteUsrName@IP:/path/to/remote/folder/
```

- Specify the file name, and rename the file to specified filename when copying

```shell
scp path/to/local/file RemoteUsrName@IP:/path/to/remote/file
```

### Copy directory

- Copy a directory, but hidden files (such as `.git` directory) will not be copied

```shell
  scp -r /path/to/local/folder RemoteUsrName@IP:/path/to/remote/folder/
```

- Copy a directory, including all hidden directories

```shell
scp -rp /path/to/local/folder RemoteUsrName@IP:/path/to/remote/folder/
```

## Download remote files to local directory

To download files, we only need to swap the last two arguments (file or directory path) in the commands. For example:

```shell
scp -rp RemoteUsrName@IP:/path/to/remote/folder/  /path/to/local/folder`
```

{% note info %}
`scp` uses the same protocal as `ssh`, and will also use port `22` by default. 

If you want to use another port, you need to add `-P xxx` after `scp` command, for instance, `scp -P 10000 -rp /path/to/local/folder RemoteUsrName@IP:/path/to/remote/folder/`. Note that you have to use uppercase `P`

{% endnote %}

{% note success %}
Want to avoid typing password everytime you use `scp`? You need to configure public key authentication for ssh. For reference, {% post_link 14_ssh_keygen %}
{% endnote %}


# View and change hostname

- See your hostname on Ubuntu: use `hostname` command or `uname -n` command

- Change your hostname on Ubuntu: 

  - `sudo vim /etc/hostname` to change the hostname forever (Restart to take effect)

  - `hostname xxx` to change the hostname temporarily (takes effect immediately, but restart will restore the original hostname)


# Modify the prompt after a successful login

- Ubuntu： `cd /etc/update-motd.d` and modify the shell scripts inside it. 

  (You may add `exit 0` command near the beginning of the scripts, to 'cancel' executing it by letting it exit earlier)

# Cannot SSH to your machine?

If you cannot ssh to your machine remotely, check these settings:

- Check whether `openssh-server` is installed
```shell
sudo apt install openssh-server
```
- ufw

```shell
sudo ufw disable
```

- Modify your sshd configuration
  
  ```
  sudo vim /etc/ssh/sshd_config
  ```
  To allow SSH to `root` user, set the following config in the file 
  ```
  PermitRootLogin prohibit-password  # disable this
  PermitRootLogin yes   # enable this
  ```

- Restart SSH service
  ```shell
  sudo service ssh restart
  ```

# Terminal timeout with SSH?

It is sometimes annoying that, when SSHing to a remote machine, the session gets timeout after minutes of inactivity, and you have to reinitiate the connection. Well, this can be solved under a simple fix.

On the local machine, open `~/.ssh/config` and add the following line:
```
Host *
    ServerAliveInterval 60
```

The meaning is, for any remote host, send a null packet every 60 seconds to keep the connection alive.

The alternative is to configure on remote host. On the server, edit the `/etc/ssh/sshd_config` file, and find the following parameters: `ClientAliveInterval` and `ClientAliveCountMax`.

- `ClientAliveInterval` specifies the time (in seconds) that the server will wait before sending a null packet to client to keep connection alive. 

- `ClientAliveCountMax` defines the number of client alive messages which are sent without getting any msg from the client. When this limit is reached, the remote host will drop this connection to terminate this SSH session.

For instance, you can set 
```
ClientAliveInterval 1200
ClientAliveCountMax 3
```

The timeout value is given by the product of the two parameters.
(timeoutvalue = `ClientAliveInterval` * `ClientAliveCountMax`)

After that, reload OpenSSH-server service.
```shell
sudo systemctl reload sshd
```


# How to add a user?
First we need to know the difference between `adduser` and `useradd`.

Both commands are used for creating a new user, but follow different ways to execute it. 

The main difference is that, 
- `adduser` will setup the user's home folder, password and other necessary functions, asking you to fill up the information. 
- `useradd` only creates a new user, without creating the home directory, adding password and so on. 

<div class="note note-info">
<p>For beginners, it is highly recommended to use <strong><code>adduser</code></strong> command.</p>
</div>

Only `root` user is allowed to add or modify users. If you are a normal user, you need to use `sudo adduser` to add a user.

## How to add a user to sudoers

There're two ways to grant sudo privileges to a user. The recommended one is to add the user to sudo group. An alternative is to edit the sudoers file.

### Add the user to `sudo` group

The easiest way to grant sudo privileges to a user is by adding it to the 'sudo' group. Members in this group can execute any command as 'root' via `sudo`.

<div class="note note-info">
<p>A 'group' refers to a collection of users who are given a similar permissions. Note that one user may belong to multiple groups. </p>
</div>

To add a user to 'sudo' group, use the following command (replace `USERNAME` with the username you want to grant sudo access):
```shell
usermod -aG sudo USERNAME
```

To ensure you have successfully granted the user sudo privileges, use `sudo whoami` and see the output. If the output is 'root', you succeeds. 

### Add the user to `sudoers` file 

This way is not recommended compared to the above one.

The users' and groups' sudo privileges configurations are stored in `/etc/sudoers` file. You can configure the sudo access by modifying theis file, or by creating a new configuration file in `/etc/sudoers.d/` directory, since the files in this dir are included in the sudoers file.

{% note danger %}
You should **always use `visudo` command** to edit the sudoers file. This command will check for syntax errors when you save it. If an error is detected, the file is not saved to prevent unexpected disaters.
{% endnote %}

Open the file by `visudo /etc/sudoers` and add the following line at the end of the file (change 'USERNAME' with the username you want to grant access to)
```
USERNAME ALL=(ALL:ALL) NOPASSWD: ALL
```

This grants the user permission to execute all commands via sudo. If you want to give partial permissions only, consider this example:
```
USERNAME ALL=(ALL:ALL) NOPASSWD: /bin/rm, /bin/mkdir
```
This allows only `mkdir` and `rm` commands to be run as root, which is safer under some special circumstances.


# Create a service and autostart

Some tasks requires the terminal to be active all the times. When a terminal window is closed, the process inside it might stop. You can use `screen` to make something always alive in the terminal, however it cannot autostart at system startup. To configure the autostart, we need to create a 'service'.

In `/lib/systemd/system/`, create a file named `xxx.service` (you may need `sudo`), and write the following things:

```
[Unit]
Description=Write your description here

[Service]
Type=simple
User=your_username
Group=your_users_group_name
ExecStart=Enter_your_command_here

[Install]
WantedBy=multi-user.target
```

{% note info %}
Without the line `User=xxx` and `Group=xxx`, the service will run as root by default.
{% endnote %}

Then you can start this service, and it will be running in the background 
```
sudo systemctl start xxx
```

To make it start automatically at system startup, enter
```
sudo systemctl enable xxx
```

At any time, to check the service status and its output, use
```
sudo systemctl status xxx
```

# Let nginx reverse proxy 'code-server'

Suppose your code-server (VSCode on the web) is running on `localhost:12345`. Then, to proxy it, add the following to your nginx configuation
```
server {
    listen 80; 
    server_name domain.name.com;   # replace with your domain name
    location / {
        proxy_pass  http://localhost:12345;   # enter your localhost address and port here
        proxy_redirect     off;
        proxy_set_header   Host             $host;        
        proxy_set_header   X-Real-IP        $remote_addr;  
        proxy_set_header   X-Scheme         $scheme;       
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header   Accept-Encoding  gzip;
        proxy_set_header   Upgrade          $http_upgrade;
        proxy_set_header   Connection       upgrade; 
    }
}
```

# Use sudo without password

To use `sudo` without password, we need to configure `/etc/sudoers` file. 

It's recommended to use `visudo` command to edit it, instead of using normal editors like `vim`. 
```
visudo
```

and in the end of this file, add a line 
```
<your_username>  ALL=(ALL:ALL) NOPASSWD: ALL
```

After that, save the file.

{% note info %}
The default editor for `root` user might be `nano`. If you prefer `vim`, you can switch to the root user (`sudo -i`), and add a line `export EDITOR=/usr/bin/vim` in `/root/.bashrc` to let `vim` be the default editor.
{% endnote %}


# Clean up journal (log files) to save disk space

You may find that `/var/log/journal/` occpies a large amount of your disk usage. These are log files created by 'journal' service (systemd), and can be disabled or limited to save space.

To limit its storage, use 

```
sudo journalctl --disk-usage      # see the disk usage
sudo journalctl --vacuum-time=1d  # remove logs more than 1 day ago
sudo journalctl --vacuum-size=10M # limit every log's size to 10MB
```

After that, your `/var/log/journal/` space will be significantly reduced 

