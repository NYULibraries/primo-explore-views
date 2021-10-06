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
  };
};

export let setupParentCtrl = (lsr08) => {
  return {
    item: {
      pnx: {
        search: {
          "lsr08": lsr08
        }
      }
    }
  };
};

export let setupItem = (links) => {
  return {
    delivery: {
      link: links
    }
  };
};

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

export let lsr08_online = ["etc", "Z_9CSC_0A09_0NYU_0", "etc"];

export let lsr08_no_online = ["etc", "", "etc"];