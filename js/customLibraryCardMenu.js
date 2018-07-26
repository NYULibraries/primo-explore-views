export let customLibraryCardMenuItemsConfig = {
  name: 'customLibraryCardMenuItems',
  config: [
    {
      name: "{nui.menu.librarycard}",
      description: "Go to {nui.menu.librarycard}",
      action: "{urls.eshelf}/login?institution=NYUSH;return_url={urls.eshelf}/account?institution=NYUSH",
      icon: {
        set: 'social',
        icon: 'ic_person_outline_24px'
      }
    }
  ]
};
