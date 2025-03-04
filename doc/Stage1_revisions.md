### *Based on feedback from TA, we did some revision of our Stage 1 project proposal*

# Realness
## Global Car Company Dataset

### Source
The dataset is obtained from Kaggle, provided by Shiivvvaam: [Car Companies in the World](https://www.kaggle.com/datasets/shiivvvaam/car-companies-in-the-world). It contains a list of global car manufacturers.

### Format
- **CSV format**, suitable for cross-referencing with other datasets.

### Data Size
- **Cardinality & Degree**: The dataset includes various car brands with essential details about their origins and operations.

### Information Captured
| Attribute        | Description |
|-----------------|-------------|
| **Maker (Brand Name)** | The name of the automobile company (e.g., Toyota, Ford, BMW). |
| **Founded Year** | The year the company was established. |
| **Headquarters** | The city/country where the brand's main office is located. |
| **Company Type** | The nature of the business (e.g., Public, Private, Subsidiary). |
| **Founder** | Name(s) of the company’s founder(s). |

---

## Car Rating Dataset

### Source
The dataset is obtained from Kaggle, provided by Juhi Bhojani: **Car Rating Dataset**. It contains customer reviews and ratings for different car models.

### Format
- **CSV format**, structured for easy data analysis and visualization.

### Data Size
- **Cardinality**: The dataset contains multiple reviews, with each row representing a car review.  
- **Degree**: Comprises six main attributes, detailing various aspects of car ratings.

### Information Captured
| Attribute        | Description |
|-----------------|-------------|
| **Review ID**   | A unique identifier for each customer review. |
| **Car Name**    | The name of the car model being reviewed. |
| **Overall Rating** | The general rating given by the user (aggregated score). |
| **Exterior Rating** | The customer’s rating of the car’s external design and features. |
| **Interior Rating** | The rating of the car’s interior, including comfort and aesthetics. |
| **Ride Quality** | Evaluation of driving experience, handling, and performance. |

---

## Location Dataset

### Source
Dataset obtained from Kaggle: [Geolocation Dataset](https://www.kaggle.com/datasets/liewyousheng/geolocation/data). It contains geographical details of various cities, including coordinates for mapping and analysis.

### Format
- **CSV format**, making it easy to integrate with other datasets for location-based insights.

### Data Size
- **Cardinality**: Contains multiple records, with each row representing a city.  
- **Degree**: Comprises key attributes related to city location.

### Information Captured
| Attribute  | Description |
|-----------|-------------|
| **City Name** | The name of the city. |
| **Longitude** | The geographic coordinate representing the city’s east-west position. |
| **Latitude** | The geographic coordinate representing the city’s north-south position. |


# Functionality

## Customer Rating & Reviews
### Create
- Users can submit reviews and rate used cars based on:
  - Overall experience
  - Exterior design and features
  - Interior comfort and aesthetics
  - Ride quality and performance
### Read
- View **aggregated ratings** and **customer reviews** for different car models.
- Access **interactive charts** comparing satisfaction scores.
### Update
- Edit or update reviews based on new experiences.
- Adjust rating criteria to include additional aspects like:
  - **Fuel efficiency**
  - **Maintenance costs**
### Delete
- Remove outdated or irrelevant reviews.
- Filter out spam or low-quality reviews for accuracy.
