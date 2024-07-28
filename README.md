# Templater
Templater is a program with which you can create word files using data from an excel file

[Readme на русском](./docs/ru/readme.md)

# The state of the cuts
**Windows**: Not tested
**Mac**:
*Intel*: Tested - Works
*Arm*: Not tested
**Linux**: Not tested


# Features
- templating 
- ability to match table headers and variable names from a template

# Restrictions
## Requirements for the Word file
Variables must be in the {var_name } format
Available characters for variable names: A-Z, a-z, 0-9, _
## Excel File Requirements
The first row is always perceived as the headings of the table
## Output files
The output files will be called output_N.docx , where N is the row number of the data from the table

# Installation
## Self-installation
### For windows
``$npm run build:win``
### For macOS
``$npm run build:mac``
### For Linux
```$ npm run build:linux```

# User's Guide
1. Select the word template file
2. Select the excel file with the data
3. Click Go to config
4. Add variable names and table headers
5. Click Template it!
6. Select the folder where you want to save the result
7. Done


# Development plans
## Pretty Update
Improve the overall UX and interaction with the software. To make it more accessible to users

Planned features:
- Feature: localization into UN languages
- Show the selected file in explorer / finder
- Dragging and dropping template and data files
- Support for other formats for templates and for data

## Feedback Update
To give users faster and more reliable feedback

Planned features:
- send a bug report (in issues on github)
- indicate an incorrect translation

## Control Update
Give more customization options

Planned features:
- The ability to specify file names using a template string
- The ability to mark the data that you want to make from the table 
- The ability to change the variable capture pattern
- Ability to save settings
- The ability to select the depth of the headers (if there is not one line, but for example there is)

# Transaltion
Did you find a mistake in the translation? Create an issue indicating the error, I would appreciate it