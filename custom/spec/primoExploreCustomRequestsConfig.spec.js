import customRequestsConfigFunction from '../common/js/customRequestsConfig';

const customRequestsConfig = Object.freeze(customRequestsConfigFunction.config('NYU'));

const title = 'The Catcher in the Rye';
const author = 'J. D. Salinger';
const phrase_title = 'Catcher in the Rye';
const phrase_author = 'JD Salinger';

const item = {
  pnx: {
    addata: {
      lad05: [phrase_title, title],
      lad06: [phrase_author, author],
      btitle: [title],
      au: [author],
      ristype: ['BOOK']
    },
  },
  delivery: {
    link: [
      {
        displayLabel: 'abc',
        linkURL: 'http://example.com',
      },
      {
        displayLabel: '123',
        linkURL: 'http://example2.com',
      },
      {
        displayLabel: 'lln10',
        linkURL: 'http://getit.nyu.edu/resolve?did=this-work&i=hope-so'
      },
      {
        displayLabel: 'lln40',
        linkURL: 'http://getit.nyu.edu/resolve?did=this-work&i=hope-so'
      },
    ]
  }
};

const uniqueItems = [
  {
    _additionalData: {
      itemdescription: 'a',
      mainlocationname: 'Avery Fisher',
    },
    itemFields: ["09/11/19 10:30 PM", "Main Collection HD6054.3 .S265 2013", "Regular loan", ""]
  },
  {
    _additionalData: {
      itemdescription: 'b',
      mainlocationname: 'Spec Coll',
    },
    itemFields: ["On Shelf", "Main Collection HD6054.3 .S265 2013", "Regular loan", ""],
  },
];

const nyushItems = [
  {
    _additionalData: {
      itemdescription: 'a',
      mainlocationname:  "NYU Shanghai Library (China)",
    },
    itemFields: ["09/11/19 10:30 PM", "Main Collection HD6054.3 .S265 2013", "Regular loan", ""],
  },
  {
    _additionalData: {
      itemdescription: 'b',
      mainlocationname:  "NYU Shanghai Library (China)",
    },
    itemFields: ["On Shelf", "Main Collection HD6054.3 .S265 2013", "Regular loan", ""],
  }
];

const nonUniqueItems = [
  {
    _additionalData: {
      itemdescription: 'a',
      mainlocationname: 'ISAW',
    },
    itemFields: ["09/11/19 10:30 PM", "Main Collection HD6054.3 .S265 2013", "Regular loan", ""]
  },
  {
    _additionalData: {
      itemdescription: 'a',
      mainlocationname: 'IFA',
    },
    itemFields: ["On Shelf", "Main Collection HD6054.3 .S265 2013", "Regular loan", ""],
  },
];

const itemAvailableOnline = [
  {
    delivery: {
      availabilityLinksUrl: [
        "",
        "http://digital-link.to.item",
      ]
    }
  },
];

const availableItems = [
  {
    _additionalData: {
      itemdescription: 'a',
      mainlocationname: 'ISAW',
    },
    itemFields: ["Available", "Main Collection HD6054.3 .S265 2013", "Regular Loan", ""]
  },
];

const unavailableItems = [
  {
    _additionalData: {
      itemdescription: 'a',
      mainlocationname: 'ISAW',
    },
    itemFields: ["09/11/19 10:30 PM", "Main Collection HD6054.3 .S265 2013", "In Processing", ""]
  },
];



const nyushUser = {
  'bor-status': "20",
};

const ezBorrowUser = {
  'bor-status': "55",
};

const illExclusiveUser = {
  'bor-status': "89",
};

let nonEzBorrowUser;
const nonIllUser = nonEzBorrowUser = {
  'bor-status': "999",
};

describe('primo-explore-custom-request config object', () => {
  describe('buttonIds', () => {
    const buttonIds = customRequestsConfig.buttonIds;

    it('is an array', () => {
      expect(Array.isArray(buttonIds)).toBe(true);
    });
  });

  describe('buttonGenerators', () => {
    const buttonGenerators = customRequestsConfig.buttonGenerators;

    it('is an object where all values are functions', () => {
      Object.values(buttonGenerators).forEach(fxn => {
        expect(typeof fxn).toBe('function');
      });
    });

    it('has a key for every buttonId', () => {
      const buttonIds = customRequestsConfig.buttonIds;
      const keys = new Set(Object.keys(buttonGenerators));
      buttonIds.forEach((id) => {
        keys.has(id);
      });
    });

    describe('ezborrow', () => {
      const ezborrow = buttonGenerators.ezborrow;

      it('constructs an appropriate button config', () => {
        const result = ezborrow({ item, config: customRequestsConfig });
        expect(result).toEqual({
          href: 'https://dev.login.library.nyu.edu/ezborrow/nyu?query=ti=Catcher%20in%20the%20Rye+and+au=JD%20Salinger',
          label: 'Request E-ZBorrow',
          prmIconAfter: {
            icon: "ic_open_in_new_24px",
            set: "action",
            attributes: { 'custom-requests': '' },
          },
        });
      });

      it('handles when there is no author or title data', () => {
        const result = ezborrow({
          item: {...item, pnx: { addata: {} }, },
          config: customRequestsConfig
        });

        expect(result).toEqual({
          href: 'https://dev.login.library.nyu.edu/ezborrow/nyu',
          label: 'Request E-ZBorrow',
          prmIconAfter: {
            icon: "ic_open_in_new_24px",
            set: "action",
            attributes: { 'custom-requests': '' },
          },
        });
      });
    });

    describe('ill', () => {
      let ill = buttonGenerators.ill;

      it('constructs an appropriate button config', () => {
        const result = ill({ item, config: customRequestsConfig });

        expect(result).toEqual({
          href: 'http://proxydev.library.nyu.edu/login?url=https://dev.ill.library.nyu.edu/illiad/illiad.dll/OpenURL?did=this-work&i=hope-so',
          label: 'Request ILL',
          prmIconAfter: {
            icon: "ic_open_in_new_24px",
            set: "action",
            attributes: {
              'custom-requests': ''
            },
          },
        });
      });

      it('handles when there is no valid getit link', () => {
        const result = ill({
          item: {...item, delivery: { link: [{}, {}] } },
          config: customRequestsConfig
        });

        expect(result).toEqual({
          href: 'http://proxydev.library.nyu.edu/login?url=https://dev.ill.library.nyu.edu/illiad/illiad.dll/OpenURL',
          label: 'Request ILL',
          prmIconAfter: {
            icon: "ic_open_in_new_24px",
            set: "action",
            attributes: { 'custom-requests': '' },
          },
        });
      });
    });

    describe('login', () => {
      let login = buttonGenerators.login;

      it('has proper attributes', () => {
        const result = login({ item, config: customRequestsConfig });

        const expected = {
          prmIconBefore: {
            set: "primo-ui",
            icon: "sign-in",
            attributes: {
              'custom-requests': ''
            },
          },
          label: 'Login to see request options',
        };

        Object.keys(expected).forEach(prop => {
          expect(result[prop]).toEqual(expected[prop]);
        });

        expect(typeof result.action).toBe('function');
      });
    });

  });

  describe('noButtonsText', () => {
    it('has text', () => {
      expect(typeof customRequestsConfig.noButtonsText).toBe('string');
    });
  });

  describe('showCustomRequests', () => {
    xdescribe('ezborrow', () => {
      const ezborrow = customRequestsConfig.showCustomRequests.ezborrow;

      it('shows under correct conditions with non-unique items', () => {
        const items = nonUniqueItems;
        const result = ezborrow({
          items,
          item,
          config: customRequestsConfig,
          user: ezBorrowUser
        });

        expect(result).toEqual([false, false]);
      });

      it('shows under correct conditions with unique items', () => {
        const items = uniqueItems;
        const result = ezborrow({
          items,
          item,
          config: customRequestsConfig,
          user: ezBorrowUser
        });

        expect(result).toEqual([true, false]);
      });

      it('shows under correct conditions with non-ezborrow user', () => {
        const items = uniqueItems;
        const result = ezborrow({
          items,
          item,
          config: customRequestsConfig,
          user: nonEzBorrowUser
        });

        expect(result).toEqual([false, false]);
      });
    });

    describe('ill', () => {
      const ill = customRequestsConfig.showCustomRequests.ill;

      it('shows when the item is an unavailable status and not available online', () => {
        const items = unavailableItems;
        const result = ill({
          items,
          item,
          config: customRequestsConfig,
          user: illExclusiveUser,
        });

        expect(result).toEqual([true]);
      });

      it('does not show when the item is available', () => {
        const items = availableItems;
        const result = ill({
          items,
          item,
          config: customRequestsConfig,
          user: illExclusiveUser,
        });

        expect(result).toEqual([false]);
      });

      it('does not show when the item is available online', () => {
        const items = availableItems;
        const result = ill({
          items,
          itemAvailableOnline,
          config: customRequestsConfig,
          user: illExclusiveUser,
        });

        expect(result).toEqual([false]);
      });

    });

    xdescribe('ill', () => {
      const ill = customRequestsConfig.showCustomRequests.ill;

      it('does not show when ezborrow shows', () => {
        const items = uniqueItems;
        const result = ill({
          items,
          item,
          config: customRequestsConfig,
          user: ezBorrowUser,
        });

        expect(result).toEqual([false, false]);
      });

      it('shows under correct conditions with non-unique items', () => {
        const items = nonUniqueItems;
        const result = ill({
          items,
          item,
          config: customRequestsConfig,
          user: illExclusiveUser,
        });

        expect(result).toEqual([false, false]);
      });

      it('shows under correct conditions with unique items', () => {
        const items = uniqueItems;
        const result = ill({
          items,
          item,
          config: customRequestsConfig,
          user: illExclusiveUser,
        });

        expect(result).toEqual([true, false]);
      });

      it('does not show when non ILL eligible user', () => {
        const items = uniqueItems;
        const result = ill({
          items,
          item,
          config: customRequestsConfig,
          user: nonIllUser,
        });

        expect(result).toEqual([false, false]);
      });

      it('does not show when NYUSH user and an unavailable NYUSH item', () => {
        const result = ill({
          items: nyushItems,
          item,
          config: customRequestsConfig,
          user: nyushUser,
        });

        expect(result).toEqual([false, false]);
      });
    });

    describe('login', () => {
      const login = customRequestsConfig.showCustomRequests.login;

      it('does not show when logged in', () => {
        const result = login({ items: nonUniqueItems, user: { 'bor-status': '999' } });
        expect(result).toEqual([false, false]);
      });

      it('does show when not logged in', () => {
        const result = login({ items: nonUniqueItems, user: undefined });
        expect(result).toEqual([true, true]);
      });
    });

  });

  describe('hideDefaultRequests', () => {
    const hideDefaultRequests = customRequestsConfig.hideDefaultRequests;

    xit('hides for unavailable holdings', () => {
      const result = hideDefaultRequests({
        item,
        items: uniqueItems,
        config: customRequestsConfig,
        user: {
          'bor-status': '999'
        }
      });
      expect(result).toEqual([true, false]);
    });

    it('hides when no user', () => {
      const result = hideDefaultRequests({
        item,
        items: uniqueItems,
        config: customRequestsConfig,
        user: undefined
      });

      expect(result).toEqual([true, true]);
    });

    xit('hides when unavailable, regardless of uniqueness', () => {
      const result = hideDefaultRequests({
        item,
        items: nonUniqueItems,
        config: customRequestsConfig,
        user: nonEzBorrowUser,
      });

      expect(result).toEqual([true, false]);

      const result2 = hideDefaultRequests({
        item,
        items: uniqueItems,
        config: customRequestsConfig,
        user: nonEzBorrowUser,
      });

      expect(result2).toEqual([true, false]);
    });

    xit('does not hide when NYUSH item', () => {
      const result = hideDefaultRequests({
        items: nyushItems,
        item,
        config: customRequestsConfig,
        user: nyushUser,
      });

      expect(result).toEqual([false, false]);
    });
  });
});
