const getPantryData = async ()=>{
    const response = await fetch('api/pantry');
    console.log(response)
    const data = await JSON.parse(response)
    console.log(data)
}

getPantryData()