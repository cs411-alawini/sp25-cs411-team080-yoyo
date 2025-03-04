# Stage 2

## Assumptions for the Database Design

### Car as an Independent Entity
A car is treated as an independent entity because it has multiple attributes, such as `FuelType`, `EngineSize`, and `BodyType`, which must be stored separately rather than as properties of another entity.

### Advertisement as an Independent Entity
In the context of a used car marketplace, `Advertisement` is an independent entity.

- Each `User` can post multiple advertisements, but each advertisement must be posted by a single user.
- Each `Advertisement` is associated with only one `Car`, although multiple advertisements may feature the same car model.

### Rating as an Independent Entity
The `Rating` entity is independent because it has multiple attributes such as:

- `OverallRating`
- `ExteriorRating`
- `InteriorRating`
- `RideQuality`

These attributes provide a comprehensive evaluation of a car and must be stored separately.

- Each `Rating` is assigned to a specific car, but each car can have multiple ratings.
- Users cannot submit new ratings; all ratings are derived from existing database records to ensure consistency and prevent manipulation.

### User as an Independent Entity
The `User` entity is independent as it holds essential personal information and authentication details.

- Attributes include:
  - `UserID`
  - `Name`
  - `Email`
  - `Phone`
  - `Password` (hashed for security)
  - `Birthdate`
  - `Location` (linked to the `Locations` entity)
  - `IsSeller` (boolean indicating seller status)
  
- Users can:
  - Post multiple advertisements.
  - Function as either buyers or sellers, based on the `IsSeller` attribute.

This structure ensures data privacy, security, and role differentiation.

### User and Location Relationship
- Each `User` resides in a single city.
- Each city's geographical coordinates (`Latitude`, `Longitude`) are unique.

### Locations as an Independent Entity
The `Locations` entity is independent because each city (`CityName`) has unique latitude (`Latitude`) and longitude (`Longitude`). This design ensures accurate geographic data and allows for future enhancements such as filtering advertisements by location.

### Brand as an Independent Entity
The `Brand` entity is independent and includes attributes such as:

- `Founder`
- `CompanyType`
- `Headquarters`
- `FoundedYear`

Each brand can have multiple car models, but each car model belongs to only one brand. This structure supports future expansions like brand-specific ratings or market region information.

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

