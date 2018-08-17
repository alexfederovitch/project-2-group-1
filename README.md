# project-2-group-1

* Project Manager: Andrew Duong
* Git Master: Alex Federovitch
* Team Member: Raquel Azcue
* Team Member: Eleda Johnson
* Team Member: Luis Luna
* Deployed Project: 
* Code on GitHub: https://github.com/alexfederovitch/project-2-group-1

3. A sketch of the application layout (wireframe)
4. Name any APIs or libraries you're considering.

Include a rough breakdown of tasks and who has been assigned to complete them.

# PROJECT PROPOSAL : <Name of App>
## Introduction
Setting diet goals can be as simple as ‘I want to lose 10 pounds’ or ‘I need to eat more protein’ but are far more difficult to plan for and achieve. This site provides the extra assistance to plan your meals around daily nutritional intake and to monitor your progress towards your specific goal. Knowing what you are eating can help to achieve your goals in a way that is faster, smarter, and healthier.
 
## User Experience Mockups

**User story: Late-20s woman looking to lose weight** visits the site. She currently works out semi-regularly but is looking to improve her diet. She visits the general information page, and looks at the nutritional facts for a few items. She thinks the information is what she needs, especially the car and protein stats so signs-up on the site. She now attempts to plan her next week of meals and realizes she might have to cut back on the cookies at work (high fat, low protein, and put her total over for Thursdays)

**User story: Early 50’s man looking to bulk up/ increase muscle mass before a big beach vacation** trip with his family in a few months. He has already googled suggestions for how diet can help him out and has a basic plan of what he needs to increase and reduce in his diet. He ends up looking at the general information page for very specific meal breakdowns. He is very interested in the daily totals the site can provide so decides to sign-up. He plays with a few different meal combinations for a day and decides that he needs to include ‘protein shake’ as one of his meals but cannot find it on the recommended list or search option. He adds it in based on the information on the supplement packaging and sets it as his lunch for the next 5 days.   


## Goals/Objectives of MVP
### **Generic Home page** 
* Access to general information for newcomers that provides the information about the app, and macro nutrients and does not require log-in
* Sign out button is needed as well *email verification would be nice*
* Account/Profile signup (New page || Modal on Homepage) 
    * Username
    * name (First and Last)
    * password
    * weight
    * goal. 



### **Generic profile page** 
* that will display the macronutrients required for the day
* progress of reaching that goal 
* navigation bar for:
    * meal planning, 
    * account settings 
    * *and potentially workout planner*

### **Meal Planning page**
* There will be a list of days of the week for the user to meal plan Sunday through Saturday. 
* API generated list of recommended meals (default list) 
* That will be organized by:
    * breakfast,
    * Lunch
    * Dinner
    * Snacks

* that will display:
•	name, 
•	nutritional values such as fat, protein, carbs, and calories 
•	with picture
* will also have a totals section below:
    * total number of Calories, Protein, Carbs, and Fat for the meal(s) that day
* includes search bar to look up specific meals/foods. 
* Includes custom meal/ food option to add to their meal planner, 
* they will be able to by clicking on a button and inputting:
    *  name of meal/food, 
    * amount of fats, calories, carbs, and protein.
* The user will be able to pick from the list of meals or food to:
    * **Create:** add new meal to profile for the day selected (default will be current day of the week)
    * **Delete:** button will delete the meal from the meal plan
    * **Update:** (1) Modify will allow the user to change the serving size or meal type (EX. Dinner for example) and (2) update status of the food as eaten (this will update the progress on the profile page). 
* There will be a list of days of the week for the user to meal plan Sunday through Saturday. 
* *More info is basically just a bonus this is where we can go to another page that will provide more info and a picture of the meal*

### **Account settings page**
* will allow the user to modify:
    * username, 
    * name, 
    * password, 
    * weight,
    * goal (bulk or cut fat)
    * Delete account option.

### ** *Workout planning page– API generated list of workouts* **
* The user will be able to select which body part to work out from list
* and the list will generate work outs for that body part. 
* The user will also have the ability to:
    * Create: 
        * Select from list of workout for specific body part:
        * User prompted to defines reps and sets for that workout
        * input his own workout with:
            * Body part
            * Work out name
            * Reps
            * sets
    * Delete, 
    * Modify sets/reps, and re-order the workouts in the order the user wants. 
* There will be a option list of the days of the week to plan workouts for a specific day. 
* *giving the user the ability to view tips/tutorials for the workouts would be a good addition*
     
### Timetable/Gantt
The project is to be executed using the Agile development framework:

Phase | Description | Start and End Dates
------|-------------|--------------------
Planning | Proposal Definition and approval | 8/14/2018-8/19/2018
Framing/Scrum | Kickoff, Idea wire framing , GIT management procedures, Solution Design, MVP & Sprint planning | 8/16/2018-8/19/2018
SDevelopment | Develop, Test, Deploy | 8/19/2018-8/26/2018
Project Presentation | Development of presentation materials | 8/25/2018
    

### Macros Information:

* https://www.popsugar.com/fitness/How-Calculate-Macros-44890781 
**Macros Calculation Here**
* https://blog.fitbit.com/counting-macros-can-help-reach-health-goals/

