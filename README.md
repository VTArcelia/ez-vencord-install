# ez-vencord-install
vencord installer with auto updating third party plugins
add your own plugins by doing the following"

1. open your cloned ez-vencord-install folder in terminal
2. git submodule add <repo_link> patches/src/userplugins/<customfoldername>

Your plugins should auto update with the UpdateandInstall.bat, which you should realistically only run when the client uninjects or your third party plugins stop working.

If I add a new third party plugin you need to run the "RunOneTime.bat" file to actually pull the files from their respective repos, it's also what you need to do for the first time you git clone.

# Pre-requisites:
* make sure to uninstall any discord client mods you previously have installed beforehand.
* If you have an outdated version of node.js, the script will not update it. If you run into issues, uninstall node.js and run the script again, it'll automatically install the latest version.

# Instructions:
1. Clone the repo (git clone https://github.com/VTArcelia/ez-vencord-install)

RunOneTime.bat is ran a single time after git cloning to grab submodules, afterwards it is not needed unless i add more submodules, which you'll know from an error appearing on the installing part of vencord, you'll see red text. 

### if cloned from repo (git clone):
2. run updateandinstall.bat
### otherwise, or if you run into issues:
2. Run install.bat.

3. If the process is successful, it will ask you to install vencord.
4. Use the arrow keys and enter to navigate. Select "Install Vencord," then choose your flavour of discord (typically stable)
5. If your discord didn't automatically restart, fully close and re-open discord.
6. In your discord user settings, you will find a bunch of plugins. Read through them and enable the ones you want, then restart discord afterwards.

The plugins I added are: MessageLoggerEnhanced, BetterMicrophone, BetterScreenshare, Timezones, and Gif Collections

## Credits
- Vencord: https://github.com/vendicated/vencord
- Third Party \ Unofficial Plugins channel in Vencord server: https://discord.com/channels/1015060230222131221/1256395889354997771 https://discord.com/channels/1015060230222131221/1032200195582197831

