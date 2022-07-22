export default {
  name: "nyuEshelfConfig",
  config: {
    adding: "Adding to Saved Items...",
    addToEshelf: "Add to Saved Items",
    ariaLabel: "Toggle in Saved Items",
    "bobcat.library.nyu.edu": {
      institution: "NYUSH",
    },
    inEshelf: "In Saved Items",
    // ATTENTION: inGuestEshelf text is referenced in browbeat tests:
    // https://github.com/NYULibraries/browbeat/blob/master/features/eshelf/add_record.feature
    inGuestEshelf: "In guest Saved Items",
    defaultUrls: {
      institution: "NYUSH",
      eshelfBaseUrl: "https://eshelf-dev.library.nyu.edu",
    },
    deleting: "Removing from Saved Items...",
    myEshelfButtonClasses: "button-over-dark search-bookmark-filter-item",
    toolbar: "Saved Items",
  },
};
