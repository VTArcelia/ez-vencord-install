# ez-vencord-install
vencord installer with auto updating third party plugins

# Pre-requisites:
* make sure to uninstall any discord client mods you previously have installed beforehand.
* If you have an outdated version of node.js, the script will not update it. If you run into issues, uninstall node.js and run the script again, it'll automatically install the latest version.

# Instructions:
1. Clone the repo (git clone https://github.com/VTArcelia/ez-vencord-install)

2. From the same terminal enter the directory (cd ez-vencord-install)
3. Finally grab submodules (git submodule update --init --recursive)

### Installing the actual client
4. run updateandinstall.bat this will update everything from submodules to vencord itself

5. If the process is successful, it will ask you to install vencord.
6. Use the arrow keys and enter to navigate. Select "Install Vencord," then choose your flavour of discord (typically stable)
7. If your discord didn't automatically restart, fully close and re-open discord.
8. In your discord user settings, you will find a bunch of plugins. Read through them and enable the ones you want, then restart discord afterwards.


### Custom Plugins can be added, or removed with the following bat files

AddYourOwn.bat & RemoveAnyPlugin.bat


If you use AddYourOwn.bat your plugins will integrate with UpdateandInstall.bat, if you use RemoveAnyPlugin, they will be removed.



### revert to just before the actual client section (this file auto does 2 & 3 from instructions)
run hard-reset.bat this should fix any errors you had with your client even after you installed custom plugins


## Credits
- Vencord: https://github.com/vendicated/vencord
- Third Party \ Unofficial Plugins channel in Vencord server: https://discord.com/channels/1015060230222131221/1256395889354997771 https://discord.com/channels/1015060230222131221/1032200195582197831

