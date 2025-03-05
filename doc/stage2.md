# Stage 2

## Entity Descriptions and Assumptions

### **Car**
**Attributes include:**
- CarId
- Make (Brand Name)
- Model
- CarTitle (Make + Model)
- CarPrice
- CarBadges
- ManufactureYear
- BodyType
- Miles
- EngineVolume
- EngineSize
- TransmissionType
- FuelType
- TotalPreviousOwners
- FullServiceRecord

**Assumptions:**
- A car is an independent entity because it has multiple attributes that need to be stored separately.
- Each car is uniquely identified by `CarId`.
- A car’s make is associated with a brand.

**Cardinality and Relationship:**
- Each `Car` belongs to one `Brand`, but a brand can have multiple cars.
- A car can have multiple `Ratings`, but each rating is assigned to only one car.
- A car is listed in one `Advertisement`, but multiple advertisements can feature different instances of the same car model.

---

### **User**
**Attributes include:**
- UserId
- IsSeller
- Name
- Phone
- Email
- Birthdate
- Password
- Location (seller location)

**Assumptions:**
- The `User` entity contains essential personal and authentication details.
- A user can act as a seller or a buyer, determined by the `IsSeller` attribute.
- User data is securely stored, including hashed passwords.

**Cardinality and Relationship:**
- Each `User` can post multiple `Advertisements`, but each advertisement belongs to one user.
- Each `User` resides in a single `Location`, but a location can have multiple users.

---

### **Brand**
**Attributes include:**
- Maker (Brand Name)
- Founder
- CompanyType
- Headquarters
- FoundedYear

**Assumptions:**
- `Brand` is an independent entity because it holds unique details about manufacturers.
- Each `Brand` can have multiple car models, but each car model belongs to only one brand.

**Cardinality and Relationship:**
- Each `Brand` can have multiple `Cars`, but each car belongs to only one brand.

---

### **Rating**
**Attributes include:**
- ReviewId
- CarName
- OverallRating
- ExteriorRating
- InteriorRating
- RideQuality

**Assumptions:**
- The `Rating` entity stores detailed evaluations of cars.
- Users cannot directly submit ratings; all ratings are derived from existing data.

**Cardinality and Relationship:**
- Each `Rating` is associated with only one `Car`, but a car can have multiple ratings.

---

### **Advertisement**
**Attributes include:**
- CarId
- UserId
- AdvertisementId
- CarTitle (Make + Model)
- CarSubtitle
- CarAttentionGrabber
- FinanceAvailable
- Discounted

**Assumptions:**
- `Advertisement` is an independent entity representing a listing in the marketplace.
- Each advertisement links a user to a car.

**Cardinality and Relationship:**
- Each `Advertisement` is posted by one `User`, but a user can post multiple advertisements.
- Each `Advertisement` is for one `Car`, but the same car model may be listed multiple times in different advertisements.

---

### **Locations**
**Attributes include:**
- CityName
- Longitude
- Latitude

**Assumptions:**
- `Locations` is an independent entity that stores city-level geographic data.
- Each city has unique latitude and longitude values.

**Cardinality and Relationship:**
- Each `User` is associated with one `Location`, but a location can have multiple users.
- Locations enable geographic filtering of advertisements.

---

## Relational Schema

```
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
    CityName: VARCHAR(30) [PK],
    Longitude: DECIMAL,
    Latitude: DECIMAL
)
```

---

## Normalization

We initialized 6 entities, and when we were ready to normalize them, we found that five of them already met the definition of BCNF, and all entities met the definition of 3NF.  

**Definition: A relation R is in 3rd normal form if:**  
Whenever there is a nontrivial dependency A1, A2, ..., An → B for R, then {A1, A2, ..., An} is a super-key for R, OR B is part of a key.  

**Definition: A relation R is in BCNF normal form if:**  
Whenever there is a nontrivial dependency A1, A2, ..., An → B for R, then {A1, A2, ..., An} is a super-key for R.

---

## Entity Car

### Minimal Basis:
- `CarId → Make`
- `CarId → Model`
- `CarId → CarPrice`
- `CarId → CarBadges`
- `CarId → ManufactureYear`
- `CarId → BodyType`
- `CarId → Miles`
- `CarId → EngineVolume`
- `CarId → EngineSize`
- `CarId → TransmissionType`
- `CarId → FuelType`

CarId is a superkey, so this table is in **3NF**, also in **BCNF**.

---

## Entity User

### Minimal Basis:
- `UserId → IsSeller`

UserId is a superkey, so this table is in **3NF**, also in **BCNF**.

---

## Entity Brand

### Minimal Basis:
- `Founder → Maker`
- `Maker → Founder`
- `Maker → CompanyType`
- `Maker → Headquarters`
- `Maker → FoundedYear`

Both Founder and Maker are superkeys, so this table is in **3NF**, also in **BCNF**.

---

## Entity Rating

### Minimal Basis:
- `ReviewId → CarTitle`
- `ReviewId → OverallRating`
- `ReviewId → ExteriorRating`
- `ReviewId → InteriorRating`
- `ReviewId → RideQuality`

ReviewId is a superkey, so this table is in **3NF**, also in **BCNF**.

---

## Entity Advertisement

### Minimal Basis:
- `(CarId, UserId) → AdvertisementId`
- `AdvertisementId → CarId`
- `AdvertisementId → UserId`
- `CarId → CarTitle`
- `CarId → CarSubtitle`
- `CarId → CarAttentionGrabber`
- `CarId → FinanceAvailable`
- `CarId → Discounted`
- `(CarTitle, CarSubtitle, CarAttentionGrabber, FinanceAvailable, Discounted) → AdvertisementId`
- `(CarTitle, CarSubtitle, CarAttentionGrabber, FinanceAvailable, Discounted) → CarId`
- `(CarTitle, CarSubtitle, CarAttentionGrabber, FinanceAvailable, Discounted) → UserId`

(CarId, UserId), AdvertisementId, and (CarTitle, CarSubtitle, CarAttentionGrabber, FinanceAvailable, Discounted) are superkeys.  
CarId is **not** a superkey, but CarTitle, CarSubtitle, CarAttentionGrabber, FinanceAvailable, and Discounted are part of candidate key  
(CarTitle, CarSubtitle, CarAttentionGrabber, FinanceAvailable, Discounted), so this table is **3NF**, but **not in BCNF**.

---

## Entity Locations

### Minimal Basis:
- `CityName → Longitude`
- `CityName → Latitude`
- `(Longitude, Latitude) → CityName`

CityName and (Longitude, Latitude) are superkeys, so this table is in **3NF**, also in **BCNF**.

---

