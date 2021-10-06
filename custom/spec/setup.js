import { angular } from 'angular';

global.console = {
  ...console,
  warn: jest.fn(),
};

