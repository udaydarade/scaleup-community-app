ScaleUp Community App

A React Native + Expo prototype for a student/community platform with gamified engagement.
Users can join communities, post, comment, earn badges, and track their growth.

✨ Features
🏘️ Communities

Browse available communities.

Create communities (To create parent communities , you must have a minimum of 10 karma points)

Search for communities

Join or leave communities.

Auto-join child communities (e.g., “Institute” → auto-joins “Hostel 8”).

📰 Community Feed

View posts within a community.

Create new posts.

Upvote/downvote posts.

Comment on posts, with nested voting.

🔔 Notifications

Get updates when:

You join a community.

New posts appear in your communities.

Someone comments on your post.

Someone upvotes/downvotes your post.

All notifications are stored in your feed.

👤 Profile

View your impact points (karma).

See badges you’ve unlocked:

⭐ Rising Star (10+ impact)

🏛️ Community Pillar (25+ impact)

🔥 Campus Legend (50+ impact)

Tabs for:

Posts you’ve created

Comments you’ve made

Activity feed of your contributions

🏅 Gamification System

Earn impact points for:

+3 → Creating a post

+2 → Adding a comment

+1 → Getting an upvote

Unlock badges at milestones

🛠️ Tech Stack

React Native (Expo) → UI + navigation

React Navigation → Stack + Tab navigators

React Context API → global store (store.js)

Mock Backend → in-memory database (mockDB.js)

📂 Project Structure
scaleup-community-app
│
├── App.js                  # Root setup: navigation + store
├── store.js                # Global state (communities, notifications, user)
├── mockDB.js               # Fake backend API + gamification logic
├── screens/
│   ├── ProfileScreen.js    # User profile (posts, comments, activity, badges)
│   ├── CommunitiesScreen.js# Browse & join communities
│   ├── CommunityFeedScreen.js # Posts feed per community
│   ├── NotificationsScreen.js # User notifications
│   └── ...                 # Other screens
└── README.md               # Project documentation

🚀 Getting Started
1️⃣ Clone repo
git clone https://github.com/udaydarade/scaleup-community-app.git
cd scaleup-community-app

2️⃣ Install dependencies
npm install

3️⃣ Run app
expo start


Open on your phone via Expo Go or in an emulator.

📸 Screenshots (Optional)

You can capture and add your own screenshots here:

Communities Screen

Community Feed

Notifications

Profile

🎯 Vision

This project is a prototype of a campus/community platform:

Connect students through interest or location-based communities

Encourage contributions with impact points + badges

Keep everyone engaged with notifications + activity feeds