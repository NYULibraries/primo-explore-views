// utilize with prmRequestServicesAfter
export default {
  template: /*html*/ `
    <primo-explore-physical-items-alert>  
    <div role="alert">
      <div class="bar large-bar layout-fill layout-padding layout-align-center-center layout-row error-bar">
        <span class="bar-text">
          Due to COVID-19, all NYU Libraries locations are closed for more information visit our Status Page URL: 
          <a href="https://nyulibraries.statuspage.io/" target="_blank">https://nyulibraries.statuspage.io/ 
            <prm-icon external-link icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>
            <span class="sr-only">(opens in a new window)</span>
          </a>
          Access to physical materials will resume when our locations reopen. At present requests can only be filled digitally. We are exploring 
          <a href="https://library.nyu.edu/services/remote/" target="_blank">all sourcing options <prm-icon external-link icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>
          <span class="sr-only">(opens in a new window)</span></a> as they become available in a rapidly changing landscape. 
        </span>
      </div>
    </div>
    </primo-explore-physical-items-alert>`
};
