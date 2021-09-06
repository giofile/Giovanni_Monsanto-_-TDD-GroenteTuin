// "NoFactors" at the end of the variable name means a calculation without "environment factors" !!!
// without the keyword "NoFactors" is taking the "environment factors" in the calculations !

// query #1 getCostForCrop
const getCostForCrop = function(input){
    return input.crop.costs * input.numCrops
}

// query #2 getRevenueForCropNoFactors
const getRevenueForCropNoFactors = function(input){
    return  input.crop.salesPrice * input.numCrops * input.crop.yield
}
 
// query #3 getProfitForCropNoFactors
const getProfitForCropNoFactors = function(input){
return getRevenueForCropNoFactors(input)  -  getCostForCrop(input)
}

// query #4 getTotalProfitNoFactors
const getTotalProfitNoFactors = function({crops}){
    const calcProfitSingle = crops.map((crop)=> getProfitForCropNoFactors(crop))
    return calcProfitSingle.reduce((acc, curr)=> acc + curr)
}


// ----- below with taking "environment factors" into considerations


// query #5 getYieldForPlant
const getYieldForPlant = function(input, environmentFactors){
    let highSun = input.crop.factors.sun.high
    let mediumSun = input.crop.factors.sun.medium 
    let lowSun = input.crop.factors.sun.low

    let highWind = input.crop.factors.wind.high
    let mediumWind = input.crop.factors.wind.medium
    let lowWind = input.crop.factors.wind.low

    let highSunFormula = highSun + 100 /100
    let mediumSunFormula = mediumSun + 100 /100
    let lowSunFormula =  lowSun + 100 /100
    
    let highWindFormula = highWind +100 /100
    let mediumWindFormula = mediumWind +100 /100
    let lowWindFormula =  lowWind + 100 /100

    let yieldResultSun;
    if (environmentFactors.sun === "high"){
        yieldResultSun = highSunFormula
    }else if(environmentFactors.sun === "low") {
        yieldResultSun = lowSunFormula
    } else if(environmentFactors.sun === "medium"){
        yieldResultSun = mediumSunFormula
    }

    let yieldResultWind
    if (environmentFactors.wind === "high"){
        yieldResultWind = highWindFormula
    }else if (environmentFactors.wind === "low"){
        yieldResultWind = lowWindFormula
    } else if(environmentFactors.wind === "medium") {
        yieldResultWind = mediumWindFormula
    }

    return input.crop.yield * yieldResultSun * yieldResultWind
}


// query #6 getYieldForCrop
const getYieldForCrop = function (input,  environmentFactors){
return input.numCrops * getYieldForPlant(input, environmentFactors)
}

// query #7 getTotalYield
const getTotalYield = function(input, environmentFactors){
    return input.crops.reduce((acc, input) => {
        return getYieldForCrop(input, environmentFactors) + acc
    })
}


// query #8 getRevenueForCrop
const getRevenueForCrop = function(input, environmentFactors){
    let revenueCalc = input.crop.salesPrice * getYieldForCrop(input, environmentFactors)
   return revenueCalc
}

// query #9 getProfitForCrop
const getProfitForCrop = function (input, environmentFactors){
    return getRevenueForCrop(input, environmentFactors) - getCostForCrop(input)
}


// query #10 getTotalProfit
const getTotalProfit = function({crops}, environmentFactors){
    const calcProfitTotal = crops.map( (crop)=> getProfitForCrop(crop, environmentFactors))
    return calcProfitTotal.reduce((acc, curr) => acc + curr)
}





module.exports = {
    getCostForCrop,
    getRevenueForCrop,
    getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield,
    getProfitForCrop,
    getTotalProfit,
    getRevenueForCropNoFactors,
    getProfitForCropNoFactors, 
    getTotalProfitNoFactors
 }