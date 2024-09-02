

namespace DDDSample1.Domain.Deliveries
{
    public class RemoveTruckTime{

    public int time{get;set;}

    public string mins{get;set;}

    public RemoveTruckTime(int time){
       this.time = time;
       this.mins = "minutes";
    }

    public RemoveTruckTime(){
    }
    }
    
}