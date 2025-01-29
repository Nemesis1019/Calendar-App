const getTime=(date:string)=>{
    const newDate = new Date(date);
    return newDate.toLocaleTimeString()
}

export{getTime}