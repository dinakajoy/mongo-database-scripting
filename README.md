# DATABASE SCRIPTING

This is me learning how to write scripts that can modify mongodb schema and data.  
Two types of shema are written in this application referencing one mongodb collection.   The idea is to able to change the collection data with reverse possibility.   
You can create users with option to set the visibility of their `email, phone and country` or as strings with no visibility option. The visibility options can be `Private, Everyone or Administrators`.

## Setup

Clone the repository.    
cd database-scripting       
Run `yarn install` or `npm install`    
Create a `.env` file and add your database url there (check `.env.example` for guidiance) 

### Usage

To populate data in mongodb with no option for visibility settings:
```
yarn run add-users-to-db or npm run add-users-to-db 
```

To populate data in mongodb with an option for visibility settings:
```
yarn run add-users-with-visibility-to-db or npm run add-users-with-visibility-to-db  
```

To reformat data in mongodb with no option for visibility settings:
```
yarn run execute-scripts removeVisibilitySettingsFromUserData or npm run execute-scripts removeVisibilitySettingsFromUserData 
```

To reformat data in mongodb with an option for visibility settings:
```
yarn run execute-scripts addVisibilitySettingsToUserData or npm run execute-scripts addVisibilitySettingsToUserData    
```
