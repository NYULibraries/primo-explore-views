primoExploreCustomRequestsConfigService.$inject = ['primoExploreCustomRequestsConfig', '$filter'];
export default function primoExploreCustomRequestsConfigService(config, $filter) {
  if (!config) {
    console.warn('the constant primoExploreCustomRequestsConfig is not defined');
    return;
  }

  const merge = angular.merge(
    {
      showCustomRequests: config.buttonIds.reduce((res, id) => ({ ...res, [id]: ({ items }) => items.map(() => true) }), {}),
      hideDefaultRequests: ({ items }) => items.map(() => false),
    },
    config,
    {
      buttonIds: config.buttonIds,
      noButtonsText: config.noButtonsText === undefined ? 'Request not available' : config.noButtonsText,
      userFailureText: config.userFailureText === undefined ? 'Unable to retrieve request options' : config.userFailureText,
      userLoadingText: config.userLoadingText === undefined ? 'Retrieving request options...' : config.userLoadingText,
    }
  );

  return merge;
}