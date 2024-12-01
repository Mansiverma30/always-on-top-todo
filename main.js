const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      contextIsolation: true, // Enable context isolation for security
      nodeIntegration: false, // Disable nodeIntegration for security
    },
    alwaysOnTop: true, // Keep window always on top
    frame: true, // Use default frame (adjust if needed)
    resizable: true, // Allow resizing
    backgroundColor: '#000000', // Set a solid background color
    /* icon: path.join(__dirname, 'assets', 'icon.ico'), // Path to your icon */
  });

  if (process.env.NODE_ENV === 'development') {
    // Load the React app from localhost in development mode
    const devURL = 'http://localhost:3000';
    mainWindow.loadURL(devURL);
    mainWindow.webContents.openDevTools(); // Open DevTools for debugging
  } else {
    // Load the built React app in production mode
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    mainWindow.loadFile(indexPath);
  }

  // Adjust opacity on focus and blur
  mainWindow.on('focus', () => {
    mainWindow.setOpacity(1); // Full opacity when focused
  });

  mainWindow.on('blur', () => {
    mainWindow.setOpacity(0.6); // Reduced opacity when blurred
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createMainWindow);

// Quit the app when all windows are closed (except for macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle macOS re-activation
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
