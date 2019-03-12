primoExploreCustomRequestsConfigService.$inject = ['primoExploreCustomRequestsConfig', '$filter'];
export default function primoExploreCustomRequestsConfigService(config) {
  if (!config) {
    console.warn('the constant primoExploreCustomRequestsConfig is not defined');
    return;
  }

  const merge = angular.merge(
    {
      showCustomRequests: config.buttonIds.reduce((res, id) => ({ ...res, [id]: ({ items }) => items.map(() => true) }), {}),
      hideDefaultRequests: ({ items }) => items.map(() => false),
      noButtonsText: 'Request not available',
      userFailureText: 'Unable to retrieve request options',
      userLoadingText: 'Retrieving request options...',
    },
    config,
  );

  return merge;
}