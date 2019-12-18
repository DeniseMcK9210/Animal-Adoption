# Animal-Adoption
### A Look Inside Austin Animal Center
Approximately 6.5 million animals enter U.S. animal shelters nationwide every year. Of those, only half are adopted and less than one sixth are returned to their owners. In 2011, it was estimated that 2.6 million animals were euthanized. This number has decreased to 1.5 million in recent years, partially due to the number of animals being adopted or being returned to their owners. By finding the probability of an animal being adopted, we could then help improve those animals' chances of finding their fur-ever homes! In order to do this we took a look inside Austin Animal Center's intake and outcome data to develop a model to predict the outcomes of pets based on age, sex, physical characteristics and duration of stay.

### The Site
[Inside AAC](https://insideaac.herokuapp.com/)

## The Questions
1. What is the probability of a dog being adopted based on it's intake and outcome features?
2. What are the most important characteristics to determine probability of dog adoption?
3. Why do owners surrender their pets?
4. In what areas are dogs most likely found?

### The Data
Intake, Outcome and Found Pets Map data were sourced from the official [City of Austin open data portal](https://data.austintexas.gov/browse?q=austin%20animal%20center&sortBy=relevance) from 2013-2019. Variables included the following for each documented dog:

 -  Gender (M/F)
 -  Intake Sex (Intact, Spayed, Neutered)
 -  Outcome Sex (Intact, Spayed, Neutered)
 -  Color
 -  Breed
 -  Location Found
 -  Intake Date
 -  Outcome Date
 -  Intake Type
 -  Outcome Type
 -  Intake Condition
 -  Age Upon Intake
 -  Age Upon Outcome
 -  Duration of Stay
    
### The Models
4 models were created to find the probability of outcomes. They included:
  1. Binary Random Forest on Adoption
  2. Binary Gradient Boosting on Adoption
  3. Random Forest on All Outcomes
  4. Gradient Boosting on All Outcomes

### Analysis Summary (by question)
1. Comparing the binary models, same accuracy, though gradient boosting model was better at correctly predicting positives and random forest model was better at correctly predicting negatives. The gradient boosting model also resulted in lower RMSE. The spread of importance also followed similar trends. The models for all outcomes were similarly related in accuracy and RMSE, but show unfavorable results compared to the same model type in the binary version.

2. Both binary models agree that duration, outcome age in months and main breed are the most important features for predicting outcome (adoption or no adoption).

3. Owners mostly to surrender normal, healthy dogs. This dataset does not provide the necessary information for further analysis of this issue.

4. Dogs were most likely found near parks and major highways and near the central/Downtown Austin area.
