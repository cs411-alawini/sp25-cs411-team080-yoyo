# Stage 2
---
## Assumptions for the Database Design

### Car as an Independent Entity
A car needs to be an independent entity because it has multiple attributes, such as `FuelType`, `EngineSize`, and `BodyType`. These attributes need to be stored separately rather than as properties of another entity.

### Advertisement as an Independent Entity
Based on the business logic of a used car marketplace, `Advertisement` is defined as a separate entity.

- Each `User` can post multiple advertisements, but each advertisement must be posted by a single user.
- Each `Advertisement` is associated with only one `Car`, but the same car model may be linked to multiple advertisements.

### Rating as an Independent Entity
The `Rating` entity is independent because it has multiple attributes, such as:

- `OverallRating`
- `ExteriorRating`
- `InteriorRating`
- `RideQuality`

These attributes provide a detailed evaluation of a car and need to be stored separately.

- Each `Rating` is for a specific car, but each car can have multiple ratings.
- **Users are not allowed to submit new ratings; ratings are derived solely from existing data within the database.**  
  This ensures that all ratings maintain consistency and are not subject to user manipulation.

### User as an Independent Entity
The `User` entity is independent because it contains essential personal information and authentication details.

- Each `User` has attributes such as:
  - `UserID`
  - `Name`
  - `Email`
  - `Phone`
  - `Password` (hashed for security)
  - `Birthdate`
  - `Location` (linked to the `Locations` entity)
  - `IsSeller` (boolean indicating whether the user is a seller)
  
- Each `User` can:
  - Post multiple advertisements.
  - Be either a buyer or a seller, based on the `IsSeller` attribute.

This structure ensures data privacy, security, and role differentiation.

### User and Location Relationship
- Each `User` resides in only one city.
- Each city's geographical coordinates (`Latitude`, `Longitude`) correspond to only one city.

### Locations as an Independent Entity
The `Locations` entity is independent because each city (`CityName`) has unique latitude (`Latitude`) and longitude (`Longitude`).  
This design ensures accurate geographic data and enables future enhancements such as filtering advertisements based on city locations.

### Brand as an Independent Entity
The `Brand` entity is independent because it has multiple attributes, such as:

- `Founder`
- `CompanyType`
- `Headquarters`
- `FoundedYear`

These attributes define unique characteristics of the brand and need to be stored separately.

- Each brand can have multiple car models, but each car model belongs to only one brand.
- This design allows for future expansions, such as adding brand-specific ratings or market region information.

---
### Relational Schema

User(  
    UserId: INT [PK],  
    IsSeller: BOOLEAN,  
    Email: VARCHAR(40),  
    BirthDate: DATETIME,  
    Password: VARCHAR(50),  
    Location: VARCHAR(50) [FK to Locations.CityName],  
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

Locations(  
    CityName : VARCHAR(30) [PK],  
    Longtitude : Decimal,  
    Latitude : Decimal  
)

---
### Normalization

We initialized 5 entities, and when we were ready to normalize them, we found that four of them already met the definition of BCNF, and all entities met the definition of 3NF.
Definition: A relation R is in 3rd normal form if:
Whenever there is a nontrivial dependency A1,A2,...,An→BA_1, A_2, ..., A_n \to BA1​,A2​,...,An​→B for R, then {A1,A2,...,An}\{ A_1, A_2, ..., A_n \}{A1​,A2​,...,An​} is a super-key for R, OR B is part of a key.
Definition: A relation R is in BCNF normal form if:
Whenever there is a nontrivial dependency A1,A2,...,An→BA_1, A_2, ..., A_n \to BA1​,A2​,...,An​→B for R, then {A1,A2,...,An}\{ A_1, A_2, ..., A_n \}{A1​,A2​,...,An​} is a super-key for R.



#### Entity Car

##### Minimal Basis:
Car ID → Make<br>
Car ID → Model<br>
Car ID → Car price<br>
Car ID → Car badges<br>
Car ID → Car specs<br>
Car ID → Manufacture Year<br>
Car ID → Body type<br>
Car ID → Mile<br>
Car ID → Engine volume<br>
Car ID → Engine size<br>
Car ID → Unit of engine size<br>
Car ID → Transmission type<br>
Car ID → Fuel type<br>
<br>
Car ID is a superkey, so this table is in 3NF, also in BCNF.<br>
<br>
<br>
#### Entity User<br>

#### Minimal Basis:<br>
User ID→ Car seller<br>
<br>
UserID is a superkey, so this table is in 3NF, also in BCNF.<br>
<br>
<br>
#### Entity Brand<br>

##### Minimal Basis:<br>
Founder →Maker<br>
Maker →Founder<br>
Maker →Company Type<br>
Maker →Headquarters<br>
Maker →Product TA<br>
Maker →Founded Year<br>
<br>
Both Founder and Maker are superkey, so this table is in 3NF, also in BCNF.<br>
<br>
<br>
#### Entity Rating<br>

##### Minimal Basis:<br>
Review ID→ Car_Name<br>
Review ID→ Overall Rating<br>
Review ID→ Exterior Rating<br>
Review ID→ Interior Rating<br>
Review ID→ Ride Quality<br>
<br>
Review ID is a superkey, so this table is in 3NF, also in BCNF.<br>
<br>
<br>
#### Entity Ad<br>

##### Minimal Basis:<br>
Car ID, User ID → advertisement ID<br>
advertisement ID → Car ID<br>
advertisement ID → User ID<br>
Car ID → Car title<br>
Car ID → Car sub title<br>
Car ID → Car attention grabber<br>
Car ID → Finance available<br>
Car ID → Discounted<br>
Car title，Car sub title，Car attention grabber，finance available，discounted→ advertisement ID<br>
Car title，Car sub title，Car attention grabber，finance available，discounted→ car ID<br>
Car title，Car sub title，Car attention grabber，finance available，discounted→User ID<br>
<br>
(Car ID, User ID) , advertisement ID and (Car title ，Car sub title，Car attention grabber，finance available，discounted) are superkeys. Car ID is not a superkey, but Car title，Car sub title，Car attention grabber，finance available and discounted are part of candidate key  (Car title ，Car sub title，Car attention grabber，finance available，discounted) , so this table is 3NF, but does not in BCNF.<br>
<br>
#### Entity Locations<br>

##### Minimal Basis:<br>
CityName → Longtitude<br>
CityName → Latitude<br>
Longitude,Latitude → CityName<br>
<br>
CityName and (Longitude,Latitude) are superkey, so this table is in 3NF, also in BCNF.<br>







