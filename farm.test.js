const {
    getCostForCrop,
    getRevenueForCrop,
    getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield,
    getProfitForCrop,
    getTotalProfit,
    getRevenueForCropNoFactors,
    getProfitForCropNoFactors, 
    getTotalProfitNoFactors} = require("./farm");


//  below  tests without taking weather conditions in consideration


// query #1 getCostForCrop
describe ("getCostForCrop", ()=>{
    const corn ={
        name: "corn",
        costs: 2
    }
    const input ={
        crop: corn, 
        numCrops: 5
    }
    test(" To check the crop costs", ()=>{
        expect(getCostForCrop(input)).toBe(10)
    })
})

// query #2 getRevenueForCropNoFactors
describe("getRevenueForCropNoFactors", ()=>{
    const corn = {
        name :"corn",
        costs: 2,
        yield: 10, 
        salesPrice: 2
    }
    const input = {
        crop: corn,
        numCrops: 5
    }
    test(" to check the revenue without weather factors", ()=>{
        expect(getRevenueForCropNoFactors(input)).toBe(100)
    })
})


// query #3 getProfitForCropNoFactors
describe("getProfitForCropNoFactors", ()=>{
        const corn = {
        name: "corn",
        costs: 2,
        yield: 10, 
        salesPrice: 2
    }
    const input = {
        crop: corn,
        numCrops: 5
    }
    test(" to see the profit for a crop , without weather factors ", ()=>{
        expect(getProfitForCropNoFactors(input)).toBe(90)
    })
    
})

// query #4 getTotalProfitNoFactors
describe( "getTotalProfitNoFactors", ()=>{
    const corn = {
        name: "corn",
        costs : 2,
        yield : 10,
        salesPrice: 2 
    }
    const paprika = {
        name: "paprika",
        costs : 5,
        yield : 10,
        salesPrice: 3 
    }
    const crops = [
        { crop: corn, numCrops: 5},
        { crop: paprika, numCrops: 4}
    ]

    test("check the total profit of crops", () =>{
        expect(getTotalProfitNoFactors({crops})).toBe(190)
    })
})




// below tests  with considering weather conditions

// query #5.1 getYieldForPlant, sun:"low"
describe("getYieldforPlant", ()=>{
 const corn = {
  name: "corn",
  yield: 30,
  factors: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },
  },
}
const input = {
        crop: corn,
}
 const environmentFactors = {
  sun: "low",
}
// 30*0.5 = 15
test("verify yield kilo's with weather factor, sun:low", ()=>{
    expect(getYieldForPlant(input, environmentFactors)).toBe(15)
})

})

// query #5.2 getYieldForPlant, sun:"high", wind: "medium"
describe("getYieldforPlant", ()=>{
 const corn = {
  name: "corn",
  yield: 30,
  factors: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },
    wind: {
        low : 0,
        medium: -10,
        high: -20
    }
  }
}
const input = {
        crop: corn,
}
 const environmentFactors = {
  sun: "high",
  wind: "medium"
};
// 30 * 1.5 * 0.9 = 40.5
test("verify yield kilo's with weather factor, sun:high, wind:medium ", ()=>{
    expect(getYieldForPlant(input, environmentFactors)).toBe(40.5)
})
})



// query #6 getYieldForCrop
describe ("getYieldForCrop", ()=>{
    const corn ={
        name: "corn",
        yield: 10,
        factors: {
            sun:{
                low: -40,
                medium: 0, 
                high: 40
            }, 
            wind:{
                low: -10,
                medium: 10,
                high: 10
            }
        }
    }
    const environmentFactors ={
        sun: "medium",
        wind: "medium"
        }
    const input = {
        crop: corn,
        numCrops: 20
    }
    // 10*20*1*1.1 = 220
        test("check the yield with changing weather", ()=>{
            expect(getYieldForCrop(input, environmentFactors)).toBe(220)
            
        })
})



// query #7 getTotalYield
describe ("getTotalYield" , ()=>{
    const corn = {
        name: "corn",
        yeild: 20,  
        factors:{
            sun: {
                low: -20,
                medium: 0,
                high: +20
            },
            wind:{
                low: 0,
                medium: -10,
                high:-30
            }
        }
    }
       const paprika = {
        name: "paprika",
        yeild: 10,       
        factors:{
            sun: {
                low: -20,
                medium: 0,
                high: +20
            },
            wind:{
                low: 10,
                medium: -10,
                high:-30
            }
        }
    }
    const environmentFactors ={
        sun: "high",
        wind: "low"
    }
   const input = [
       {crop:corn, numCrops:20 },
       {crop:paprika, numCrops:10}
   ]


// (corn = 20*20*1.2*1) + ( paprika = 20*10*1.2*1.1) = 744
test (" calculate yield with regard of weather conditions", ()=>{
    expect(getTotalYield (input,environmentFactors)).toBe(744)
})
})




// query #8 getRevenueForCrop
describe("getRevenueForCrop", () =>{
    const corn ={
        name: "corn",
        salesPrice: 3, 
        yield: 45,
        factors: {
            sun:{
                low: -20,
                medium: 0, 
                high: 20
            }, 
            wind:{
                low: -20,
                medium: 10,
                high: 10
            }
        }
    }
    
    const input = {
        crop: corn,
        numCrops: 30
    }

    const environmentFactors ={
        sun: "high",
        wind: "medium"
    }
    // 3 * ( 30 * 45 * 1.2 * 1.1 ) = 5346
    test (" Check revenue for corn with weather factors", ()=>{
        expect(getRevenueForCrop(input, environmentFactors)).toBe(5346)
    })
})


// query #9 getProfitForCrop

describe("getProfitForCrop", () =>{
    const  corn = {
        name: "corn",
        salesPrice: 3, 
        costs : 5,
        yield: 25,
        factors: {
            sun:{
                low: -20,
                medium: 0, 
                high: 20
            }, 
            wind:{
                low: -20,
                medium: 10,
                high: 10
            }
        }
    }
     const input = {
        crop: corn,
        numCrops: 30
    }

    const environmentFactors = {
        sun: "high",
        wind: "medium"
     }
    //  5346 - 150 = 5196
    test( "verify profit for crop with factors", ()=>{
        expect(getProfitForCrop(input, environmentFactors)).toBe()
    })
})



// query #10 getTotalProfit

describe (" getTotalProfit", ()=>{
    const corn ={
        name: "corn",
        yield: 50, 
        costs : 3,
        salesPrice : 6,
        factors: {
            sun:{
                low: -40,
                medium: 0, 
                high: 40
            }, 
            wind:{
                low: -10,
                medium: 10,
                high: 10
            }
        }
    }
    const paprika ={
        name: "paprika",
        yield: 30, 
        costs : 2,
        salesPrice : 5,
        factors: {
            sun:{
                low: -40,
                medium: 0, 
                high: 40
            }, 
            wind:{
                low: -10,
                medium: 10,
                high: 10
            }
        }
        
    }
    const crops = [{ crop: corn, numCrops: 4}, {crop: paprika, numCrops:3}]
    const environmentFactors = {
        sun: "low",
        wind:"high"
     }

    //  (corn =  792-12 =  780)    + ( paprika =  297 -6 =291)

    test( "verify total profit", ()=>{
        expect(getTotalProfit({crops}, environmentFactors)).toBe(1071)
    })
})






