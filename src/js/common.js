export function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
  
export function dateFormat(date){
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return "" + year + "-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2);
}
  
export function extractColor(col){
    if(typeof col === 'string'){
        return col;
    } else {
        return col.hex;
    }
}

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;
const BASE_DATE = new Date("1999-12-27");

export function weekNo(date){
    return Math.floor((date - BASE_DATE) / WEEK_MS);
}

export function weekStart(week_no){
    return addDays(BASE_DATE, week_no * 7);
}

export function makeArray2D(n, m, val=null) {
    let arr = new Array(n)
    for (let i = 0; i < n; ++i){
        arr[i] = new Array(m);
        for (let j = 0; j < m; ++j){
            arr[i][j] = val;
        }
    }
    return arr;
}


export function fieldsToText(obj){
    let text = "";
    if(obj){
        if(typeof obj === 'string'){
            return obj;
        } else if (obj instanceof Array) {
            for (let i = 0; i < obj.length; ++i) {
                if(text !== ""){
                    text += " | ";
                }
                text += obj[i];
            }
        } else {
            for (const [key, value] of Object.entries(obj)) {
                if(text !== ""){
                    text += "\n";
                }
                let val = fieldsToText(value);
                text += `[${key}] ${val}`;
            }
        }
    }
    return text;
}

export function dateFromWeekDayNo(week_no, day_no){
    let d = addDays(weekStart(week_no), day_no);
    return dateFormat(d);
}

export function buildTimeLabel(slot_no){
    return '' + (slot_no + 8) + ':00 - ' + (slot_no + 9) + ':00';
}