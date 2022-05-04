const logout = $("#logout")

logout.on("click",async (event)=>{
    await fetch("/api/user/logout",{
        method:'POST',
    })
    location.replace("/")
})