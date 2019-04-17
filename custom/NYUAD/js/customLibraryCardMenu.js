export default {
  name: 'customLibraryCardMenuItems',
  config: [
    {
      name: "{nui.menu.librarycard}",
      description: "Go to {nui.menu.librarycard}",
      action: "{urls.eshelf}/account?institution=NYUAD",
      icon: {
        set: 'social',
        icon: 'ic_person_outline_24px'
      }
    }
  ]
};
