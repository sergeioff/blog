echo "Enter your name:"
read NAME
echo "Enter your email:"
read EMAIL

# Install xcode console developer tools
xcode-select --install

# Git configuration
git config --global user.name $NAME
git config --global user.email $EMAIL
git config --global credential.helper osxkeychain

# Homebrew installation
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Check if Homebrew installed correctly
brew doctor

# Disable Homebrew analytics
brew analytics off

brew install zsh autojump httpie tree gradle p7zip

# Quick look plugins
brew cask install qlcolorcode qlstephen qlmarkdown quicklook-json quicklook-csv suspicious-package

# Development software
brew cask install java intellij-idea-ce visual-studio-code postman docker pycharm-ce dash

# Software
brew cask install android-file-transfer appcleaner dropbox google-backup-and-sync google-chrome transmission vlc calibre spotify

# Install zsh-syntax-higlighting plugin
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# install oh my zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
