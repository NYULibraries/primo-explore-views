export let nyuEshelfConfig = {
  name: "nyuEshelfConfig",
  config: {
    adding: "Adding to Saved Items...",
    addToEshelf: "Add to Saved Items",
    ariaLabel: "Toggle in Saved Items",
    "bobcat.library.nyu.edu": {
      institution: "NYSID",
    },
    deleting: "Removing from Saved Items...",
    defaultUrls: {
      institution: "NYSID",
      eshelfBaseUrl: "https://eshelf-dev.library.nyu.edu",
    },
    inEshelf: "In Saved Items",
    // ATTENTION: inGuestEshelf text is referenced in browbeat tests:
    // https://github.com/NYULibraries/browbeat/blob/master/features/eshelf/add_record.feature
    inGuestEshelf: "In guest Saved Items",
    myEshelfButtonClasses: "search-bookmark-filter-item",
  },
};
