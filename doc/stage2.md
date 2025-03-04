





### RelationalSchema

### Relational Schema

User(  
    UserId: INT [PK],  
    IsSeller: BOOLEAN,  
    Email: VARCHAR(40),  
    BirthDate: DATETIME,  
    Password: VARCHAR(50),  
    Location: VARCHAR(50),  
    Name: VARCHAR(30),  
    Phone: VARCHAR(30)  
)

Car(  
    CarId: INT [PK],  
    Make: VARCHAR(30) [FK to Brand.Maker],  
    Model: VARCHAR(30),  
    CarTitle: VARCHAR(20),  
    CarPrice: INT,  
    CarBadges: VARCHAR(30),  
    ManufactureYear: INT,  
    BodyType: VARCHAR(30),  
    Mileage: INT,  
    EngineVolume: DECIMAL,  
    EngineSize: DECIMAL,  
    TransmissionType: VARCHAR(30),  
    FuelType: VARCHAR(20),  
    TotalPreviousOwners: INT,  
    FullServiceRecord: BOOLEAN  
)

Brand(  
    Maker: VARCHAR(30) [PK],  
    Founder: VARCHAR(30),  
    CompanyType: VARCHAR(30),  
    Headquarters: VARCHAR(30),  
    FoundedYear: INT  
)

Advertisement(  
    AdvertisementId: INT [PK],  
    CarId: INT [FK to Car.CarId],  
    UserId: INT [FK to User.UserId],  
    CarTitle: VARCHAR(30),  
    CarSubtitle: VARCHAR(30),  
    CarAttentionGrabber: VARCHAR(30),  
    FinanceAvailable: BOOLEAN,  
    Discounted: BOOLEAN  
)
