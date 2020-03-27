const externalLinkIcon = {
  icon: "ic_open_in_new_24px",
  set: "action",
  attributes: { 'custom-requests': '' },
};

const loginIcon = {
  set: "primo-ui",
  icon: "sign-in",
  attributes: { 'custom-requests': '' },
};

const checkAreItemsUnique = items => items.some(item => item._additionalData.itemdescription !== items[0]._additionalData.itemdescription);
const checkIsAvailable = item => {
  const unavailablePatterns = [
    /Requested/g,
    /\d{2}\/\d{2}\/\d{2}/g, // dd/dd/dd appears anywhere in the string
    'Requested',
    'Billed as Lost',
    'Claimed Returned',
    'In Processing',
    'In Transit',
    'On Hold',
    'Request ILL',
    'On Order',
  ];

  const hasPattern = (patterns, target) => patterns.some(str => target.match(new RegExp(str)));
  const circulationStatus = item.itemFields[0];
  return !hasPattern(unavailablePatterns, circulationStatus);
};

const availabilityArray = ({ items }) => {
  return items.map(checkIsAvailable);
};

const requestableArray = ({ items }) => {
  const availabilityStatuses = availabilityArray({ items });
  const itemsAreUnique = checkAreItemsUnique(items);
  const allUnavailable = availabilityStatuses.every(status => status === false);

  return availabilityStatuses.map(isAvailable => allUnavailable || (itemsAreUnique && !isAvailable));
};

const getitLink = (item, institutionVid) => {
  const getitLinkFields = {
    // NYU: ['lln10'],
    NYU: ['lln42'],
    // NYUAD: ['lln11'],
    NYUAD: ['lln42'],
    // NYUSH: ['lln40', 'lln12'],
    NYUSH: ['lln42'],
    CU: ['lln13'],
  };
  const validGetitLinkFields = getitLinkFields[institutionVid];

  try {
    const urls = validGetitLinkFields.reduce((res, target) => {
      const link = item.delivery.link.filter(({
        displayLabel
      }) => displayLabel === target)[0];
      return link ? [...res, link.linkURL] : res;
    }, []);

    return urls[0];
  } catch (e) {
    return '';
  }
};

const baseUrls = {
  ezborrow: `https://${process.env.NODE_ENV !== 'production' ? 'dev.' : ''}login.library.nyu.edu/ezborrow/nyu`,
  ill: `https://ill-proxy${process.env.NODE_ENV !== 'production' ? '-dev' : ''}.library.nyu.edu/illiad/illiad.dll/OpenURL`,
};

const authorizedStatuses = {
  ezborrow: ["50", "51", "52", "53", "54", "55", "56", "57", "58", "60", "61", "62", "63", "65", "66", "80", "81", "82", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41"],
  ill: ["20", "21", "22", "23", "30", "31", "32", "34", "35", "37", "50", "51", "52", "53", "54", "55", "56", "57", "58", "60", "61", "62", "63", "65", "66", "80", "81", "82", "89"],
  afc: ["03", "05", "10", "12", "20", "30", "32", "50", "52", "53", "54", "61", "62", "70", "80", "89", "90"],
  nyush: ["20", "21", "22", "23"],
};

export default {
  name: 'primoExploreCustomRequestsConfig',
  config: (institutionVid) => ({
    // Remove ezborrow and regular ILL during COVID-19 telework scenario
    // buttonIds: ['login', 'ezborrow', 'ill', 'afc'],
    // Add a temp ill request instead, where every physical item regardless of status
    // gets requested through ILL, except Offsite items
    buttonIds: ['login', 'temp_ill_request', 'afc'],
    buttonGenerators: {
      ezborrow: ({ item }) => {
        const title = item.pnx.addata.lad05 ? item.pnx.addata.lad05[0] : '';
        const author = item.pnx.addata.lad06 ? item.pnx.addata.lad06[0] : '';
        const ti = title ? `ti=${encodeURIComponent(title)}` : '';
        const au = author ? `au=${encodeURIComponent(author)}` : '';
        const and = title && author ? '+and+' : '';
        const queryString = ti || au ? `query=${ti}${and}${au}` : '';

        return {
          href: `${baseUrls.ezborrow}${ti || au ? '?' : ''}${queryString}`,
          label: 'Request E-ZBorrow',
          prmIconAfter: externalLinkIcon,
        };
      },
      ill: ({ item }) => {
        const link = getitLink(item, institutionVid);

        const baseUrl = baseUrls.ill;
        return {
          href: (/resolve?(.*)/.test(link) ? `${baseUrl}?${link.match(/resolve\?(.*)/)[1]}` : link) || baseUrl,
          label: 'Request ILL',
          prmIconAfter: externalLinkIcon,
        };
      },
      temp_ill_request: ({ item }) => {
        const link = getitLink(item, institutionVid);

        const baseUrl = baseUrls.ill;
        return {
          href: (/resolve?(.*)/.test(link) ? `${baseUrl}?${link.match(/resolve\?(.*)/)[1]}` : link) || baseUrl,
          label: 'Request',
          prmIconAfter: externalLinkIcon,
        };
      },
      login: () => ({
        prmIconBefore: loginIcon,
        label: 'Login to see request options',
        action: ($injector) => $injector.get('primoExploreCustomLoginService').login(),
      }),
      afc: () => ({
        label: "Schedule a video loan",
        href: "https://nyu.qualtrics.com/jfe/form/SV_0pIRNh3aESdBl2t",
        prmIconAfter: externalLinkIcon,
      })
    },
    showCustomRequests: {
      ezborrow: ({ item, items, user}) => {
        if (!user) return items.map(() => false);
        const isBook = ['BOOK', 'BOOKS'].some(type => item.pnx.addata.ristype.indexOf(type) > -1);
        const showEzborrow = isBook && authorizedStatuses.ezborrow.indexOf(user['bor-status']) > -1;

        const requestables = requestableArray({ items });
        return items.map((_e, idx) => requestables[idx] && showEzborrow);
      },
      ill: ({ item, items, user, config }) => {
        if (!user) return items.map(() => false);

        const isNYUSHUser = () => authorizedStatuses.nyush.indexOf(user['bor-status']) > -1;
        const inNYUSHLibrary = () => /Shanghai/.test(items[0]._additionalData.mainlocationname);
        const illEligible = () => authorizedStatuses.ill.indexOf(user['bor-status']) > -1;

        const showIll = isNYUSHUser() ? !inNYUSHLibrary() : illEligible();

        const showEzborrowArr = config.showCustomRequests.ezborrow({ user, item, items, config });
        const requestables = requestableArray({ items });
        return items.map((_e, idx) => !showEzborrowArr[idx] && requestables[idx] && showIll);
      },
      temp_ill_request: ({ item, items, user, config }) => {
        if (!user) return items.map(() => false);

        // Is in an offsite location (no sublibrary currently tells you this, hence this regex)
        const isOffsite = () => items[0].itemFields.some((field) => { return /Offsite/.test(field) });
        const isValidSublibrary = item.delivery.holding.some(({ libraryCode }) => {
          return !["NIFA", "NIFAC", "NISAW", "BARCH", "BFALE", "BTAM"].includes(libraryCode);
        });

        // Default show ILL button logic
        const showIll = !isOffsite() && isValidSublibrary;
        return items.map((_e, idx) => showIll);
      },
      login: ({ user, items }) => items.map(() => user === undefined),
      afc: ({ item, items, user}) => {
        if (!user) return items.map(() => false);
        const afcEligible = authorizedStatuses.afc.indexOf(user['bor-status']) > -1;
        const isBAFCMainCollection = item.delivery.holding.some(({ subLocation, libraryCode}) => {
          return libraryCode === "BAFC" && subLocation === "Main Collection";
        });

        return items.map(() => afcEligible && isBAFCMainCollection);
      },
    },
    hideDefaultRequests: ({ item, items, user, config }) => {
      if (user === undefined) {
        // if logged out, hide all
        return items.map(() => true);
      } else if (authorizedStatuses.nyush.indexOf(user['bor-status']) > -1) {
        // if NYUSH user, only hide if ILL shows
        // return config.showCustomRequests.ill({ item, items, user, config });
        // if NYUSH user, only hide if temp ILL shows
        return config.showCustomRequests.temp_ill_request({ item, items, user, config });
      }

      // otherwise, hide only unavailable holdings
      return availabilityArray({ items }).map(avail => !avail);
    },
    noButtonsText: '{item.request.blocked}',
  })
};