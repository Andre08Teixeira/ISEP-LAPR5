

namespace DDDSample1.Domain.Deliveries
{
    public class PutTruckTime{

    public int time{get;set;}

    public string mins{get;set;}

    public PutTruckTime(int time){
       this.time = time;
       this.mins = "minutes";
    }

    public PutTruckTime(){
    }
    }
}