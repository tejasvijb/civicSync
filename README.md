CivicSync – Citizen-Issue Reporting & Voting Platform

CivicSync – Citizen-Issue Reporting & Voting Platform
Scenario
Across cities, towns, and local neighborhoods, people face daily issues like potholes, broken streetlights, uncollected garbage, and unsafe areas. These problems are rarely logged, tracked, or resolved transparently.

CivicSync is a web-based platform designed to simulate a modern civic reporting system. It empowers authenticated citizens to report civic issues, browse public issues submitted by others, vote on what's important, and visualize resolution trends over time.

Your task is to build a secure, scalable MVP that enables smooth issue lifecycle management and community participation.

🎯 Objective
Design and implement a fullstack application with proper authentication and authorization, enabling users to:

Report location-specific civic issues with supporting context
View a real-time, paginated feed of all public issues
Vote once on any issue to surface priority for resolution
Track their personal reports and editing privileges
Visualize status/category-wise issue breakdowns and voting trends
Interact with both list-based and map-based representations of issues
👥 User Role: user
There is a single role in this application: a citizen user. However, the actions available to a user are based on ownership and issue status.

🔐 Authentication & Authorization
Users must be able to register and log in securely using email and password
Auth tokens or sessions should persist across refresh
Access to all core routes and actions must be gated by auth
Users can:
Only edit/delete their own issues
Only edit/delete issues that are still in Pending state
Vote only once per issue
📝 Core Features

1. Report an Issue
   Users can create a civic issue report by submitting a form with:

Title (short summary of the issue)
Description (detailed explanation)
Category (dropdown: Road, Water, Sanitation, Electricity, Other)
Location (can be text-based, e.g., “Sector 15, Chandigarh”)
Image Upload (optional but functional)
Status is auto-set to Pending on creation
Created At timestamp auto-generated 2. My Issues
Each user has access to a "My Issues" dashboard:

Shows list of their submitted issues
Allows editing or deleting if issue status is still Pending
Displays current vote count and status
Clickable to open issue details 3. Public Issue Feed
A globally visible, paginated list showing all reported issues:

Each card shows:
Title
Category
Location
Status (Pending, In Progress, Resolved)
Vote count
Time since reported
Feed supports:
Search by title
Filter by category or status
Sort by newest or most-voted
Clicking a card takes user to full Issue Detail View with:
Full description
Uploaded image
Location text
Total votes
Option to cast a vote (disabled if already voted) 4. Voting System
Each user can vote once on any issue (stored with userID + issueID)
Vote count updates in real time or on reload
Vote button changes state post-vote (Voted ✔) 5. Dashboard & Analytics View
A separate view accessible post-login, showing:

Donut/Bar chart of issue count per category
Line chart showing daily issue submissions in past 7 days
Bar graph or table showing most-voted issues by category
All visualizations should update dynamically with data 6. Map View (Mandatory Feature)
Visualize reported issues on a map view
Each issue is represented as a marker
Clicking a marker shows:
Title
Status
Number of votes
Locations can be static coordinates or mocked geolocation derived from text input
🧪 Additional Notes
Status of issue (Pending, In Progress, Resolved) can be manually updated in the database or through a button (optional for candidate to simulate resolution flow)
All images should be stored and retrievable — don't mock the upload flow
UI should prioritize clarity, responsiveness, and visual feedback
