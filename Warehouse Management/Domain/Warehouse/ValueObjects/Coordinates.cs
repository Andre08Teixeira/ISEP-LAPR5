namespace DDDSample1.Domain.Warehouse
{
    public class Coordinates
    {
        public float longitude{get;set;}
        public float latitude{get;set;}
        public float altitude{get;set;}

        public Coordinates(float latitude,float longitude,float altitude){

            this.latitude =latitude;
            this.longitude= longitude;
            this.altitude = altitude;

        }

    }
}