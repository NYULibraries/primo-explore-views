export let searchBarSubMenuItemsConfig = {
  name: 'searchBarSubMenuItems',
  config: [
    {
      name: "Back to BobCat Classic",
      description: "Back to BobCat Classic",
      action: "http://bobcat.library.nyu.edu/primo_library/libweb/action/search.do?vid=" + "NYUAD",
      icon: {
        set: 'navigation',
        icon: 'ic_arrow_back_24px'
      },
      show_xs: true
    },
    {
      name: "Provide Feedback",
      description: "Provide Feedback",
      action: "https://nyu.qualtrics.com/jfe/form/SV_blQ3OFOew9vl6Pb?Source=NYUAD",
      icon: {
        set: 'communication',
        icon: 'ic_forum_24px'
      }
    }
  ]
};
