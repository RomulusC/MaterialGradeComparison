# How to quck run website locally
1. Click the "<> Code" button above -> Download ZIP
2. Extract in a folder (use 7zip or winrar)
3. Open a command line in the extracted directory
4. Run the below commands:
```
npm install
npm run dev
```
5. Copy the localhost URL presented into your browser

# How to clone repository and run website locally for development
1. Install VS Code (text code editor with some special tools)
2. Install GitHub client (click the "<> Code" button above, open with Github desktop)
3. In the GitHub client, clone repository -> URL -> (enter URL of this website)
4. In the GitHub client, click "Open in Visual Studio Code"
5. In VS Code, open an Intergrated Terminal: click terminal in the top left or shortcut (ctrl+shift+'), and type in:
```
npm install
npm run dev
```
6. Click the localhost URL presented in the integrated terminal to open with default browser

# How to get debugger working
Everything "should" be set up
1. Have "npm run dev" entered in the integrated terminal
2. Press "F5"
MS-Edge should open and present the webpage


# How to get intellisense to make sense!
1. Have any .tsx file open
2. Press (ctrl+shift+P), enter Typescript: Select Typescript Version...
3. Select "Use Workspace Version"

# How to get Android Emulation working for development
1. Download & install https://developer.android.com/studio
2. In Android Studio, ensure you are running a phone emulation
3. 
```
npm run build
npx cap add android
npx cap open android
```
4. In Android Studio, select "Build Module" (top centre)
5. In Android Studio, select "Run App" (top right)

# Useful links
1. https://www.typescriptlang.org/docs/
2. https://www.youtube.com/watch?v=TiSGujM22OI&list=PLC3y8-rFHvwi1AXijGTKM0BKtHzVC-LSK
3. https://www.youtube.com/watch?v=hzzCveeczSQ&list=PLC3y8-rFHvwhiQJD1di4eRVN30WWCXkg1
4. https://capacitorjs.com/docs/basics/workflow

# Windblows Only!
