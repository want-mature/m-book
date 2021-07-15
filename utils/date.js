// export default只能先定义后导出，
export default class delTime{
    constructor(){

    }
    conversionTime(startTime,endTime){
        const now = new Date()
        const time = startTime - endTime
        return time
    }
}