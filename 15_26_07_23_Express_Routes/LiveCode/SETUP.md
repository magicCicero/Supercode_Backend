# Setup

## 1. (Optional) iTerm2

[https://iterm2.com/](https://iterm2.com/)

Alle zukünftig verwenden wir den Begriff Terminal für ggf. iTerm. Da iTerm ein ersatz ist für die `Terminal.app`

## 2. Install Homebrew

Gehe auf [brew.sh](https://brew.sh) und kopiere den Installations Command in den Terminal und drücke <key>ENTER</key>

## 3. Deinstallier Node

Kopiere den folgenden Code in den Terminal und drücke <key>Enter</key>

```shell
sudo rm -rf ~/.npm ~/.nvm ~/node_modules ~/.node-gyp ~/.npmrc ~/.node_repl_history
sudo rm -rf /usr/local/bin/npm /usr/local/bin/node-debug /usr/local/bin/node /usr/local/bin/node-gyp
sudo rm -rf /usr/local/share/man/man1/node* /usr/local/share/man/man1/npm*
sudo rm -rf /usr/local/include/node /usr/local/include/node_modules
sudo rm -rf /usr/local/lib/node /usr/local/lib/node_modules /usr/local/lib/dtrace/node.d
sudo rm -rf /opt/local/include/node /opt/local/bin/node /opt/local/lib/node
sudo rm -rf /usr/local/share/doc/node
sudo rm -rf /usr/local/share/systemtap/tapset/node.stp

brew uninstall node
brew doctor
brew cleanup --prune-prefix
```

## 4. Installiere fnm

`curl -fsSL https://fnm.vercel.app/install | zsh`

## 5. Verwende fnm um node zu installieren

`fnm install 19`
`fnm use 19`

## 6. fnm env setup

Folgendes muss in dein `~/.zshrc` Datei:

```shell
eval "$(fnm env --use-on-cd)"
```

Damit die Änderungen wirken:

```shell
source ~/.zshrc
```

## 7. (Optional) Autojump

`brew install autojump`

Jeden Ordner den du einmal (nach der installation von autojump) besucht hast kannst du zukünftig leichter mit autojump erreichen.

### Beispiel

Folgende Ordner Struktur:

```
LiveCode
├── README.md
├── SETUP.md
├── TERMINAL.md
└── node
    ├── 01.first-node-project
    │   ├── index.js
    │   └── package.json
    └── README.md
```

Ich bin im Ordner `LiveCode` und möchte in den Ordner `01.first-node-project` navigieren.

```shell
user@machine ~/dev/LiveCode $ cd node/01.first-node-project
user@machine ~/dev/node/01.first-node-project $
```

Nach dem ich einmal zu diesem Ordner "manuelle" navigiert bin (mit `cd`) kann ich diesen Ordner von überall erreichen mit:
`j 01.first-node-project`
ggf. sogar:
`j 01.frist`

## 08. The Fuck

Korregiert euren Terminal input
`brew install thefuck`

Wenn ihr jetzt euch verschreibt bei einem Command könnt ihr mit `fuck` diesen berichtigen. Mehr dazu hier: [https://github.com/nvbn/thefuck](https://github.com/nvbn/thefuck)
