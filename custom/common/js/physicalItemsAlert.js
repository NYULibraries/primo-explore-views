// utilize with prmRequestServicesAfter
export default {
  template: /*html*/ `
    <primo-explore-physical-items-alert>  
    <div role="alert">
      <div class="bar large-bar layout-fill layout-padding layout-align-center-center layout-row error-bar">
        <span class="bar-text">
          <div>
          <p>Physical materials are available via scan, contact-less pick-up, or home delivery. See the explanation of request options below. There is no in-person access to NYU Libraries collections.

          <p>For the latest information about using the libraries, visit our NYU Returns 
          <a href="https://library.nyu.edu/nyu-returns/collections-access/" target="_blank">Library Collections Access
            <span class="sr-only">(opens in a new window)</span>
            <prm-icon external-link icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new">
            </prm-icon>
          </a> page.
          </div>
        </span>
      </div>
    </div>
    </primo-explore-physical-items-alert>`
};
