const { invoke } = window.__TAURI__.core;
const { getCurrentWindow } = window.__TAURI__.window;

let greetInputEl;
let greetMsgEl;

async function greet() {
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

function setupWindowControls() {
  const appWindow = getCurrentWindow();

  const minBtn = document.getElementById('titlebar-minimize');
  const maxBtn = document.getElementById('titlebar-maximize');
  const closeBtn = document.getElementById('titlebar-close');

  console.log('Setting up window controls:', { minBtn, maxBtn, closeBtn });

  minBtn?.addEventListener('click', (e) => {
    console.log('Minimize clicked', e);
    appWindow.minimize();
  });

  maxBtn?.addEventListener('click', async (e) => {
    console.log('Maximize clicked', e);
    const isMaximized = await appWindow.isMaximized();
    if (isMaximized) {
      appWindow.unmaximize();
    } else {
      appWindow.maximize();
    }
  });

  closeBtn?.addEventListener('click', (e) => {
    console.log('Close clicked', e);
    appWindow.close();
  });
}

function setupPanels() {
  const appWindow = getCurrentWindow();
  const settingsPanel = document.getElementById('settings-panel');
  const settingsToggle = document.getElementById('settings-toggle');
  const settingsClose = document.getElementById('settings-close');

  console.log('Setting up panels:', { settingsPanel, settingsToggle, settingsClose });

  const baseWidth = 800;
  const panelWidth = 250;

  async function toggleSettingsPanel() {
    console.log('Toggle settings panel clicked');
    const isOpen = settingsPanel?.classList.contains('open');
    const size = await appWindow.innerSize();
    const height = size.height / window.devicePixelRatio;
    console.log('Panel state:', { isOpen, size, height });

    if (isOpen) {
      // Closing: animate panel first, then resize after animation completes
      console.log('Closing panel');
      settingsPanel?.classList.remove('open');
      setTimeout(async () => {
        await appWindow.setSize(new window.__TAURI__.dpi.LogicalSize(baseWidth, height));
      }, 300);
    } else {
      // Opening
      console.log('Opening panel');
      await appWindow.setSize(new window.__TAURI__.dpi.LogicalSize(baseWidth + panelWidth, height));
      settingsPanel?.classList.add('open');
    }
  }

  settingsToggle?.addEventListener('click', (e) => {
    console.log('Settings toggle clicked', e);
    toggleSettingsPanel();
  });
  settingsClose?.addEventListener('click', (e) => {
    console.log('Settings close clicked', e);
    toggleSettingsPanel();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");

  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });

  setupWindowControls();
  setupPanels();
});
