 export const getFormattedDate=(today,increamentor)=>{

        var dd = today.getDate()+increamentor;
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(mm===2) {
            if(yyyy%4===0 && yyyy%100!==0) {
                //leap year, 29 days
                if(dd > 29){
                    dd-=29;
                    mm++;
                }
            } else if(dd > 28){
                //leap year, 28 days
                dd-=28;
                mm++;
            }
        } else if(mm < 8 && mm%2===0){
            // till July days = 30
            if(dd>30){
                dd-=30;
                mm++;
            }
        } else if(mm < 8 && mm%2===1){
            // till July days=31
            if(dd>31){
                dd-=31;
                mm++;
            }
        } else if(mm > 7 && mm%2===0){
            //after Aug days=31
            if(dd>31){
                dd-=31;
                mm++;
            }
            if(mm>12){
                mm-=12;
                yyyy++;
            }
        }else if(mm > 7 && mm%2===1){
            //after Aug days=30
            if(dd>30){
                dd-=30;
                mm++;
            }
            if(mm>12){
                mm-=12;
                yyyy++;
            }
        }

        if(dd<10) 
        {
            dd='0'+dd;
        } 
        if(mm<10) 
        {
            mm='0'+mm;
        } 
       return dd+'-'+mm+'-'+yyyy;
    }
export const tableHeaders=["Center","address","Block name","Vaccine","Dose 1","Dose 2","Type","Fee","Age group"]
export const tablekeys=["name","address","block_name","vaccine","available_capacity_dose1","available_capacity_dose2","fee_type","fee","min_age_limit"]
const callurl=(url,calendar,i,setvaccinedata)=>{
    if(i < 7) {
        let today=getFormattedDate(new Date(),i)
            fetch(url+today)
            .then((response) => response.json())
            .then((data) => {
              calendar[i]={
                  date:today,
                  sessions:data.sessions
                }
                callurl(url,calendar,++i,setvaccinedata)
            }) 
        } else {
            setvaccinedata(calendar)
        }
    }
export const getSlotCalendar=(url,setvaccinedata)=>{
    let calendar=[null,null,null,null,null,null,null];      
        callurl(url,calendar,0,setvaccinedata)

}