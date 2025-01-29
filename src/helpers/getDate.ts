const getDate=(date:string)=>{
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
}

export {getDate}