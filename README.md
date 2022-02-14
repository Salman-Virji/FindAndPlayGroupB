# FindAndPlayGroupB

Team of 18, split into 3 subgroups B1, B2, B3.

## To install

1. _ git clone ... project
2. In cmd, >cd ./[project directory]
3. In cmd, >npm install
4. Open an emulator, via Android studio
5. In cmd, expo start, then local host to open the version you want or
6. [alt], expo start --android
etc...

* npm install @react-navigation/native - in terminal 
* expo install react-native-screens react-native-safe-area-context - install in cmd -  project location if you 
are using expo
* npm install @react-navigation/native-stack - install in terminal
See docs for navgation - !(React Navigation)[https://reactnavigation.org/docs/getting-started]

## Layout of project 

* app.js used as main navigation 
* apps folder - > screens , for each "screen"/page of the app 
* apps folder - > assets -> subfolders for each asset type  

Note : Layout does not scroll up with keyboard anymore becuase of "softwareKeyboardLayoutMode": "pan" added to app.json , this solves layout breaking but could be a future issue 


TESTING THIS