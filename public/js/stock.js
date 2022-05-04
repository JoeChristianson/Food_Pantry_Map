const pantryPage = $(".pantry_page");

pantryPage.on("click", function(){
    console.log("next page");
    document.location.replace('/pantry')
} );