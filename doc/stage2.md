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
- A car is listed in at most one `Advertisement`, but multiple advertisements can feature different instances of the same car model.

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

### **Location**
**Attributes include:**
- CityName
- Longitude
- Latitude

**Assumptions:**
- `Location` is an independent entity that stores city-level geographic data.
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

We identified five core entities and ensured that our schema adheres to the principles of normalization.

### Definitions:
- **3rd Normal Form (3NF):** A relation is in 3NF if every non-trivial functional dependency has a superkey as its determinant or if the dependent attribute is part of the key.
- **Boyce-Codd Normal Form (BCNF):** A relation is in BCNF if every non-trivial functional dependency has a superkey as its determinant.

### Entity Normalization Details:

#### **Car**
- **Minimal Basis:**
  - `CarId → Make, Model, CarPrice, CarBadges, ManufactureYear, BodyType, Mileage, EngineVolume, EngineSize, TransmissionType, FuelType, TotalPreviousOwners, FullServiceRecord`
- `CarId` is a superkey, ensuring 3NF and BCNF compliance.

#### **User**
- **Minimal Basis:**
  - `UserId → IsSeller`
- `UserId` is a superkey, ensuring 3NF and BCNF compliance.

#### **Brand**
- **Minimal Basis:**
  - `Maker → Founder, CompanyType, Headquarters, FoundedYear`
- `Maker` is a superkey, ensuring 3NF and BCNF compliance.

#### **Rating**
- **Minimal Basis:**
  - `ReviewId → Car_Name, OverallRating, ExteriorRating, InteriorRating, RideQuality`
- `ReviewId` is a superkey, ensuring 3NF and BCNF compliance.

#### **Advertisement**
- **Minimal Basis:**
  - `(CarId, UserId) → AdvertisementId`
  - `AdvertisementId → CarId, UserId, CarTitle, CarSubtitle, CarAttentionGrabber, FinanceAvailable, Discounted`
  - `(CarTitle, CarSubtitle, CarAttentionGrabber, FinanceAvailable, Discounted) → AdvertisementId, CarId, UserId`
- `(CarId, UserId)`, `AdvertisementId`, and `(CarTitle, CarSubtitle, CarAttentionGrabber, FinanceAvailable, Discounted)` are superkeys.
- The table is in 3NF but not BCNF since `CarId` is not a superkey.

#### **Locations**
- **Minimal Basis:**
  - `CityName → Longitude, Latitude`
  - `(Longitude, Latitude) → CityName`
- `CityName` and `(Longitude, Latitude)` are superkeys, ensuring 3NF and BCNF compliance.

---

