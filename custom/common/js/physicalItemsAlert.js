// utilize with prmRequestServicesAfter
export default {
  template: /*html*/ `
    <primo-explore-physical-items-alert>  
    <div role="alert">
      <div class="bar large-bar layout-fill layout-padding layout-align-center-center layout-row error-bar">
        <span class="bar-text">
          <div>
          Due to COVID-19, all NYU Libraries locations are closed. For more information visit our <a href="https://nyulibraries.statuspage.io/" target="_blank">Status Page.
            <span class="sr-only">(opens in a new window)</span>
            <prm-icon external-link icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new">
            </prm-icon>
          </a>
          </div>
          <div>
          Access to physical materials will resume when our locations reopen. At present requests can only be filled digitally. We are exploring 
          <a href="https://library.nyu.edu/services/remote/" target="_blank">all sourcing options
            <span class="sr-only">(opens in a new window)</span>
            <prm-icon external-link icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new">
            </prm-icon>
          </a> as they become available in a rapidly changing landscape. 
          </div>
        </span>
      </div>
    </div>
    </primo-explore-physical-items-alert>`
};
