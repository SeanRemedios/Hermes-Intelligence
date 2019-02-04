# Hermes Intelligence

An offline traffic and road conditions GPS systematic reminder application.

## Developed By

Sean Remedios, Wallis Pom, Tahmid Kazi & Monica Rao

### Inspiration

Our inspiration stems from our common issue with the Google Home’s requirement for internet access and frequent instability. In addition, our team have struggled with finding dependable internet access when in remote locations, such as on vacation with no data, often with unpredictable Wi-Fi access points. As a team we aimed to develop an application to allow users to access valuable information that would only be accessible with a reliable internet service. 

### What it does

Hermes Intelligence allows users to access GPS navigation, road conditions, traffic conditions and general reminders all via SMS notifications. Often times when individuals make their commute to work, they do not check their favourite maps application to check for potential hazards. Hermes Intelligence acts as a personal assistant that will send you a reminder text at your selected time (e.g. 8:15AM every weekday morning), relieving you from the duty of searching your route manually, and avoiding unexpected delays that would otherwise result in the user being late. Another useful application of our system is to provide directions when internet access is limited, for example, the user would like to visit a certain restaurant for lunch, Hermes Intelligence would provide map directions without the user having to obtain internet access. 

1. Offine timed traffic reminders and directions
2. Offine text only reminders
3. Users often do not check traffic in the morning when going to work, could run into unexpected traffic delays
4. Valuable for remote locations or variations abroad
5. Cheaper than Google Home

### How we built it 

1. Front end was developed by using Android Studio and Java. Mobile app is completely offline, only using SMS messaging to communicate. 
2. Back End was deployed using Standard Library API in Javascript.
3. Additional APIs that were used with Standard Library: Custom Tasks Wrapper, Here Maps API
4. Messaging service used: Twilio
5. Database: MongoDB

### What's next for Hermes Intelligence

- Road conditions based on weather
- Weather conditions
- General web search
- News updates
- Travel information
- Business and restaurant recommendations

### Devpost
https://devpost.com/software/hermes-intelligence

### Twitter Posts
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Hermes intelligence is an entirely offline (!) reminder system that makes sure you&#39;re on time! Using a <a href="https://twitter.com/twilio?ref_src=twsrc%5Etfw">@twilio</a> SMS, it sets a <a href="https://twitter.com/StdLibHQ?ref_src=twsrc%5Etfw">@StdLibHQ</a> task that triggers before your commute to check traffic with the <a href="https://twitter.com/here?ref_src=twsrc%5Etfw">@here</a> maps API! Ingenious. <a href="https://twitter.com/QHacks19?ref_src=twsrc%5Etfw">@QHacks19</a> <a href="https://t.co/oKC6oGNmk4">pic.twitter.com/oKC6oGNmk4</a></p>&mdash; Jacob Lee (@Hacubu) <a href="https://twitter.com/Hacubu/status/1092091870228987905?ref_src=twsrc%5Etfw">February 3, 2019</a></blockquote>
