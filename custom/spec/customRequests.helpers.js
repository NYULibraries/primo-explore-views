export let setupScope = (links, vid='NYU') => {
  return {
    $parent: {
      $ctrl: {
        parentCtl: {
          configurationUtil: {
            vid: vid
          },
          item: {
            delivery: {
              link: links
            }
          }
        }
      }
    }
  }
}

export const lln32 = {
  linkType: "doesnt.matter.what.starts.with/lln32",
  linkURL: "https://library.nyu.edu/lln32",
};

export const lln31 = {
  linkType: "doesnt.matter.what.starts.with/lln31",
  linkURL: "https://library.nyu.edu/lln31",
};

export const lln30 = {
  linkType: "doesnt.matter.what.starts.with/lln30",
  linkURL: "https://library.nyu.edu/lln30",
};