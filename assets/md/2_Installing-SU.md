# Installing Seismic Unix

This process will be the same for windows and Ubuntu/other debian based linux operating systems. First download the latest Seismic Unix release from [here](https://wiki.seismic-unix.org/doku.php). That link also contains links to the Oz Yilmaz data set that will be used for this guide in the next steps.

1. run `cd ~; echo "export CWPROOT=\$HOME" >> .bashrc; echo "export PATH=\$PATH:\$HOME/bin:./" >> .bashrc; source .bashrc` 
   - this command will set a variable called CWPROOT which is used for the SU installation
   - adds /home/bin to the path (where the SU scripts will be stored later)
   - runs the .bashrc file
2. Download the latest [Seismic Unix release](https://wiki.seismic-unix.org/doku.php) and move it to the home directory.
   - for windows you can run the following commands in the terminal:
     - `cd /mnt/c/users/*YOUR USERNAME HERE*/Downloads; mv cwp_su_all_*VERSION#*.tgz $home/cwp_su_all_*VERSION#*.tgz; cd $HOME`
   - for mac or linux:
     - `cd ~/Downloads/; mv cwp_su_all_*VERSION#*.tgz $home/cwp_su_all_*VERSION#*.tgz; cd $HOME `
3.  run `gunzip cwp_su_all_*VERSION#*.tgz; tar -xvf cwp_su_all_*VERSION#*.tar`
   - the above commands will extract the installation files from the .tgz into the current active directory
4. Use the correct installation makefile.config.
   - for most systems the Makefile.config_Linux_x86_64 will work.
   - running `cd ~/src ; rm -f Makefile.config / cp ~/configs/Makefile.config_Linux_x86_64 Makefile.config` will accomplish this in the terminal
5. Install the Required Packages
   run `sudo apt-get update; sudo apt-get upgrade; sudo apt-get install build-essential gfortran libx11-dev libxt-dev `
6.  Install optional packages:
   - OpenGL:`sudo apt-get install freeglut3-dev libxmu-dev libxi-dev libc6`
   - Motif: `sudo apt-get install libuil4 libmotif-dev`
7.  Make sure everything is updated via: `sudo apt-get update; sudo apt-get upgrade`
8. Install SU: `cd ~/src; make install; make xtinstall; make finstall`
   - Optional Installation: `make mglinstall; make utils; make xminstall; make sfinstall `
9. Test SU installation: `suplane | suximage title='test'`



I have compiled this information from these sources: [SU Wiki Install guide](https://wiki.seismic-unix.org/sudoc:su_installation); [This blog talking about SU installation on Windows](https://suwindows10.blogspot.com/2016/08/how-to-install-seismic-unix-su-on.html).