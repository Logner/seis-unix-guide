# Prerequisites for the Windows 10 Install

## Windows Powershell

​	![An image of Microsoft Powershell]()

There is a huge difference between the commands used to operate the windows terminal (Power Shell) terminal and Linux (BASH and others) terminals.  Since SU is Unix based technology, we will need to get access to the Ubuntu shell on our preexisting windows machine. 

The easiest way to do this, is to install the recently (in 2019) introduced Ubuntu subsystem for windows. [This guide](https://docs.microsoft.com/en-us/windows/wsl/install-win10) has an in-depth walk through. But we'll do the quick version here.

1. Open Windows Powershell an an Administrator through the Start Menu.

2.  Run this command `dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart` . Feel free to just copy and paste the code into Powershell.

   - The command is used to enable the Linux subsystem for all users on the windows computer.
   - This will take a few minutes depending on your processor. it should look like this when completed: ![Finished initialisation process on Powershell]()

   

## The Ubuntu Subsystem for Windows

​			![An image of the Ubuntu subsystem as found in the Windows app store]()

3. Install the Ubuntu subsystem for windows from the windows app store.

4. Get [Xming](https://sourceforge.net/projects/xming/). This must be running before the Ubuntu Shell is initialised for it to work.

   - This program allows the Ubuntu subsystem to create graphical windows on Windows 10. It is necessary to display SU data.

   - It is a lightweight program so it is a good idea to add it to your startup programs list. You can follow the proceeding steps to accomplish this.

     1. Run XLaunch.exe from the start menu and save the configuration as config.xlaunch under the startup folder.
        - ` C:\Users\*YOUR USERNAME HERE*\AppData\Roaming\Microsoft\Windows\"Start Menu"\Programs\Startup`
     2. Create a shortcut of XLaunch.exe under the same startup folder.

     3. Modify the target field of the shortcut to `"C:\*PATH\TO\Xming*\XLaunch.exe" -run "config.xlaunch".`
     
     ![An image of SU output using an Xming window]()
   
5. Open the Ubuntu subsystem from the Start Menu. Set the username and password once Ubuntu is fully installed.

   - Needless to say, don't forget these!

6. run `sudo apt-get update;sudo apt-get upgrade` in the Ubuntu shell.

   - In all terminals, a space indicates a separate entity or a command. Best convention is to name your folders with underscored "_" or  dashes "-". Otherwise, you will have to put quotes around your filenames for them to be considered a single variable.
   - The above commands can be broken up into 3 parts:
     - `sudo` : Grants the user root (administrator) privileges, provided the correct password is entered.
     - `apt-get` : [Advanced Package Tool](https://en.wikipedia.org/wiki/APT_(software)) is a Debian (bare bones-Linux) based free-software library
     - `update` : Asks the apt server whether the location for updates of the currently-installed packages has changed, and if yes, then it changes the URL on the local machine.
     - `;` : Acts as a new-line character, it separates the 2 commands
     - `upgrade` : Checks if new versions of the installed packages are available, and installs them.

7. run `cd; echo "export DISPLAY=:0" >> .bashrc; source .bashrc` in the Ubuntu shell.

   - `cd` : by itself changes your current working directory to `/home/*username*/`  aka  `~`

     - Read [this](https://www.howtogeek.com/117435/htg-explains-the-linux-directory-structure-explained/) for more information on the Linux directory structure. and [this](https://www.redhat.com/sysadmin/basic-linux-commands) for more information on the basic Linux command syntax.

   - `echo "export DISPLAY=:0" >> .bashrc` : this is a 3-part command. It writes "export Display=:0" into .bashrc

     - `echo` : std-out the next variable. (This means print it out to the console.)

     - `"export DISPLAY=:0"` : the line to be written into `.bashrc`. This line allows the Xming windows to function properly.

     - `>>` : capture the std-out from previous command (`echo`) and write it at the bottom of the following file

     - `.bashrc` : A file that has all the configuration information for how the BASH shell is initialised for the current Linux user.

       > the `.` in front of the `.bashrc` makes the file a hidden file. Try running `ls -A` in the `~` directory to see all the hidden files.

   - `source .bashrc`:  this command executes the code stored in .bashrc. Be careful as system-relevant variables are stored in .bashrc and **a slight syntax mistake can lead to A LOT of headaches**.

## Get a File Explorer GUI for the Ubuntu Subsystem (optional)

This part is optional, but <b>Highly Recommended.</b>

- run `sudo apt-get install nautilus`

  - Nautilus is the default file browser GUI (Graphical user interface)  on Ubuntu Installations. Since we already have Xming running, nautilus

- Save the windows folder system location to favourites in Nautilus.  

  - run `nautilus /mnt/c/users/*YOUR WINDOWS USERNAME*/`  to open nautilus at your windows users directory. 
  - Save the folder to bookmarks via the ![three horizontal bars symbol]().
  - Right click on that favourite folder (should show up at the bottom of the folders list on the left hand side) and open as a new tab.

- Running nautilus on startup, persistently keep it open.
  **Beware! This requires editing with Ubuntu system files. Worst case scenario at this point is having to reset or uninstall the Ubuntu install and repeating all the steps after step 3**

  - Doing this will keep one window of nautilus open until you have logged out of the Ubuntu. It will auto-restart on closing. We will be using [services](https://medium.com/@benmorel/creating-a-linux-service-with-systemd-611b5c8b91d6) to accomplish this. 

    - This will be useful later, since windows cant directly talk to Ubuntu system. It is very useful to have a persistent GUI open that does not constantly log out error messages in the console. Transferring files between the two OS's is much easier with a GUI.

  - run `sudo touch /etc/systemd/system/AutoNautilus.service`

    - this will create a new file called `AutoNautilus.service` under `/etc/systemd/system/`

  - run `sudo nano /etc/systemd/system/AutoNautilus.service`

    - this will open an in-terminal editor

  - copy and paste the following: 

    ```shell
    [Unit]
    Description='Starting Nautilus on startup, persistently keep it open'
    StartLimitIntervalSec=0
    
    [Service]
    Type=simple
    Restart=always
    RestartSec=1
    User=*USERNAME EDIT THIS*
    ## the part that starts nautilus at the home directory ##
    ExecStart=/bin/bash /usr/bin/nautilus ~
    
    [Install]
    WantedBy=multi-user.target
    ```

  - `Ctrl+o` to save, and `Ctrl+x` to exit out of the nano session.

  - run `systemctl start AutoNautilus; systemctl enable AutoNautilus` to start and toggle start on startup the service.

  

## You made it!

Good job! Now that our windows computer is sufficiently set up to install Seismic Unix, so lets actually install it!