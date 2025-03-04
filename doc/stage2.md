





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

### Normalization

We initialized 5 entities, and when we were ready to normalize them, we found that four of them already met the definition of BCNF, and all entities met the definition of 3NF.
Definition: A relation R is in 3rd normal form if:
Whenever there is a nontrivial dependency A1,A2,...,An→BA_1, A_2, ..., A_n \to BA1​,A2​,...,An​→B for R, then {A1,A2,...,An}\{ A_1, A_2, ..., A_n \}{A1​,A2​,...,An​} is a super-key for R, OR B is part of a key.
Definition: A relation R is in BCNF normal form if:
Whenever there is a nontrivial dependency A1,A2,...,An→BA_1, A_2, ..., A_n \to BA1​,A2​,...,An​→B for R, then {A1,A2,...,An}\{ A_1, A_2, ..., A_n \}{A1​,A2​,...,An​} is a super-key for R.



Entity Car

Minimal basis:
Car ID → Make
Car ID → Model
Car ID → Car price
Car ID → Car badges
Car ID → Car specs
Car ID → Manufacture Year
Car ID → Body type
Car ID → Mile
Car ID → Engine volume
Car ID → Engine size
Car ID → Unit of engine size
Car ID → Transmission type
Car ID → Fuel type

Car ID is a superkey, so this table is in 3NF, also in BCNF.


Entity User
Minimal basis:
User ID→ Car seller

UserID is a superkey, so this table is in 3NF, also in BCNF.


Entity Brand

Minimal basis:
Founder →Maker
Maker →Founder
Maker →Company Type
Maker →Headquarters
Maker →Product TA
Maker →Founded Year

Both Founder and Maker are superkey, so this table is in 3NF, also in BCNF.


Entity Rating

Minimal basis:
Review ID→ Car_Name
Review ID→ Overall Rating
Review ID→ Exterior Rating
Review ID→ Interior Rating
Review ID→ Ride Quality

Review ID is a superkey, so this table is in 3NF, also in BCNF.


Entity Ad

minimal basis:
Car ID, User ID → advertisement ID
advertisement ID → Car ID
advertisement ID → User ID
Car ID → Car title
Car ID → Car sub title
Car ID → Car attention grabber
Car ID → Finance available
Car ID → Discounted
Car title，Car sub title，Car attention grabber，finance available，discounted→ advertisement ID
Car title，Car sub title，Car attention grabber，finance available，discounted→ car ID
Car title，Car sub title，Car attention grabber，finance available，discounted→User ID

(Car ID, User ID) , advertisement ID and (Car title ，Car sub title，Car attention grabber，finance available，discounted) are superkeys. Car ID is not a superkey, but Car title，Car sub title，Car attention grabber，finance available and discounted are part of candidate key  (Car title ，Car sub title，Car attention grabber，finance available，discounted) , so this table is 3NF, but does not in BCNF.




