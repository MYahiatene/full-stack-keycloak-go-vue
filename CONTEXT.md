# Pet Feeding Tracker

A shared tracker where the people of a household record and coordinate feeding, health and care for their pets.

## Language

**User**:
A person with a Keycloak identity, known to the app by their Keycloak subject. Created on their first authenticated request.
_Avoid_: Account, profile

**Household**:
A group of Users who share a set of Pets. All data is scoped to a Household.
_Avoid_: Family, team, group

**Member**:
A User's participation in a Household. A User can be a Member of several Households.
_Avoid_: Participant

**Owner**:
A Member role. A Household has one or more Owners and always at least one; the last Owner cannot leave without transferring ownership or deleting the Household.
_Avoid_: Admin, creator

**Active Household**:
The Household a User is currently working in. Chosen by the client; every request is scoped to one.
_Avoid_: Current group

**Invite**:
An emailed, token-based offer to join a Household, claimed after login by a User whose verified email matches.
_Avoid_: Invitation link

**Pet**:
An animal belonging to a Household.
_Avoid_: Animal

**Food Product**:
A food, treat or supplement a Household keeps for its Pets, with its own Food Stock.
_Avoid_: Item, ration

**Food Stock**:
The grams of a Food Product currently on hand. Reduced automatically by Feedings and directly correctable by any Member.
_Avoid_: Inventory

**Feeding**:
A record of what a Pet was actually fed, how much, when, and by whom. Any Member may correct it; the original feeder is kept.
_Avoid_: Meal, feed log

**Schedule**:
A planned recurring meal for a Pet (label, time of day, amount, weekdays). Evaluated in the Household's timezone.
_Avoid_: Plan, routine

**Done (Schedule slot)**:
A slot for a day is done when a Feeding is linked to it. Missed slots are not recorded.
_Avoid_: Skipped, completed

**Household Timezone**:
The single timezone in which a Household's Schedules are evaluated; a User's own timezone only affects display.
_Avoid_: Local time

**Health Note**:
A categorised note about a Pet (allergy, medication, vaccination, other), kept separate from Vet Appointments.
_Avoid_: Medical record

**Vet Appointment**:
A scheduled visit to a vet for a Pet, marked completed afterwards.
_Avoid_: Checkup

**Notification**:
A message to a single User about feeding due, low stock, a vet reminder or an Invite. Sent to every Member whose own setting is on; a feeding-due one is cancelled once a linked Feeding exists.
_Avoid_: Alert, reminder

**Removed Member**:
A User whose Member relationship to a Household ended. They lose access and Notifications, but their past records stay attributed to them.
_Avoid_: Deleted user

**Inactive Pet**:
A Pet that is deceased or given away, with an optional reason. Its history stays readable.
_Avoid_: Deleted pet, archived pet
