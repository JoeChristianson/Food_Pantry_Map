const openBtn = $("#open-list");
const closeBtn = $("#close-list")
const sidebar = $("#sidebar")
const homepageContents = $("#homepage-contents");
const map = $("#map")
const info = $(".info")


openBtn.on("click",()=>{
    openSidebar()
})

closeBtn.on("click",()=>{
    closeSidebar()
})

function openSidebar() {
    sidebar.css({width:"350px",padding:"20px"})
    sidebar.addClass('full')
    openBtn.css({display:"none"});
    homepageContents.css({marginRight:"350px"})
    map.css({marginRight:"370px"});
    info.css({marginRight:"350px"})
  }

function closeSidebar() {
    sidebar.css({width:"0px",padding:"0px"});
    sidebar.removeClass('full')
    openBtn.css({display:"inline"});
    homepageContents.css({marginRight:"0px"})
    map.css({marginRight:"20px"});
    info.css({marginRight:"0px"})
}
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */


