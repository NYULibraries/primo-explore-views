export let customLibraryCardMenuItemsConfig = {
  name: 'customLibraryCardMenuItems',
  config: [
    {
      name: "{nui.menu.librarycard}",
      description: "Go to {nui.menu.librarycard}",
      action: "https://qa.eshelf.library.nyu.edu/login?institution=NYUSH;return_url=https://qa.eshelf.library.nyu.edu/account?institution=NYUSH",
      icon: {
        set: 'social',
        icon: 'ic_person_outline_24px'
      }
    }
  ]
};
