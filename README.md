# ilri-pfm
ILRI poultry farming management system

## Website Setup

- ``` cd ilri_ges ```
- Activate venv
- Run Migrations
- ``` python manage.py create_permissions```

## TODO
- Calendar view for chicken feed, egg, weight, vacine

### Analysis
- Weight By Feed Type(WBFT)
    - Density

- Feed By Weight (FE)
    - Trend
    - Probability density (Density) 


Dash board chickens that doesnt belong to any flock or house

Formula /
    - grouped bar chart for showing ingredient nutrients and requirement nutrients from Rations table
    - pie chart for the above condition i.e achived ratio

## TODO

- Rename mass to batch


On Dashbaord add Total Generations in stats


## Formula Charts

- Price (per 300kg Ingredient Price) - pie
- Achivement
    - Goal Achivmeet - bar
    - Nutrient Requirement vs Nutrient rations - bar
- Contribution
    - Ingredient Contributation - pie
    - Ingredient Nutrient contribuation - stacked => Done


    Chicken summary
    - Min Weigt
    - Max Weight
    - Alive Chickens
    - Dead Chickens

check all filters on directory type (export, chicken summary)



library(lme4GS)
library(pedigreemm)
library(lme4)

data <- read.csv('/home/admin-user/Documents/jupyter/data/pre_weight_gain.csv')

data$sex[data$sex == 'M'] <- 1
data$sex[data$sex == 'F'] <- 0
data$sex[data$sex == ''] <- -1
data$wwg[is.na(data$wwg)] <- 0

p1 <- new("pedigree",
          sire = as.integer(as.list(data)$sire),
          dam  = as.integer(as.list(data)$dam),
          label = as.character(as.list(data)$calves))

AFull <- getA(p1)
row_len <- length(data$calves)
A <- matrix(AFull, row_len, row_len)
rownames(A) <- colnames(A)<-rownames(AFull)

# Animal id
AID <-as.character(data$calves)
modelData <- data.frame(y=data$wwg, sex=data$sex, ped=AID)

random <- list(ped=list(K=A))
fmGA <- lmerUvcov(y ~ sex + (1|ped), data=modelData, Uvcov=random)


summary(fmGA)