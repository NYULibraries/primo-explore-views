export default function () {
  const svc = this;
  svc.state = {};
  return ({
    setState: newState => {
      svc.state = angular.merge({}, svc.state, newState);
      return svc.state;
    },
    getState: () => svc.state,
  });
}